import { useActionRequest } from '@/hooks/action/useActionRequest';
import { wfTaskApprove, wfTaskReject, wfTaskRollbackNodes, wfTaskRollbackTo, wfTaskTransfer, wfTaskTransferCandidates, wfTaskWithdraw } from '@/services/yuan/wfTaskController';
import { ActionType, ModalForm, ProForm, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';

import { Button, Modal, Popconfirm, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import { request } from 'express';
import { values } from 'lodash';
import React, { useMemo, useState } from 'react';

interface WorkFlowActionPanelProps {
  bizNo?: string;
  wfData?: API.WfApprovalDetailVO;
  reload: ActionType['reload'];
}

export type WfActionKey =
  | 'APPROVE'
  | 'REJECT'
  | 'ROLLBACK_PREV'
  | 'ROLLBACK_TO'
  | 'TRANSFER'
  | 'WITHDRAW'
  | 'ADD_SIGN';


const WorkFlowActionPanel = (props: WorkFlowActionPanelProps) => {
  const { bizNo, wfData, reload } = props;
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);
  const curTask = wfData?.current;
  const canOps = wfData?.ops;


  /** 简单校验：拒绝必须填意见 */
  const validateRejectComment = () => {
    const v = comment.trim();
    if (!v) {
      setCommentError('拒绝时必须填写审批意见');
      return false;
    }
    setCommentError(null);
    return true;
  };

  const onCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const v = e.target.value;
    setComment(v);
    if (commentError && v.trim()) setCommentError(null);
  };



  const { run: approve } = useActionRequest(wfTaskApprove, reload);
  const { run: reject } = useActionRequest(wfTaskReject, reload)
  const { run: withdraw } = useActionRequest(wfTaskWithdraw, reload)

  return (
    <div
      style={{
        display: 'flex',
        gap: 12,
        alignItems: 'flex-end',
        width: '100%',
      }}
    >
      {/* 左侧：审批意见 */}
      <TextArea
        placeholder="审批意见（可选，拒绝必填）"
        value={comment}
        onChange={onCommentChange}
        maxLength={300}
        showCount
        rows={1}
        status={commentError ? 'error' : undefined}
        style={{
          flex: 1,
          minWidth: 360,
          marginBottom: 20,
          marginTop: 20,
        }}
      />

      {/* 右侧：操作按钮 */}
      <Space wrap size={8}>
        {/* ===== 同意：Popconfirm ===== */}
        {canOps?.canApprove && (
          <Popconfirm
            title="确认同意？"
            description={comment ? `审批意见：${comment.slice(0, 30)}` : '未填写审批意见'}
            okText="确认"
            cancelText="取消"
            onConfirm={async () => {
              if (!curTask?.id) {
                message.error('当前无可操作任务');
                return;
              }
              approve({ taskId: curTask.id, comment });
            }}
          >
            <Button type="primary" style={{ marginBottom: 20 }}>同意</Button>
          </Popconfirm>
        )}

        {/* ===== 拒绝：Popconfirm + 必填校验 ===== */}
        {canOps?.canReject && (
          <Popconfirm
            title="确认拒绝？"
            description={comment ? comment : "拒绝操作必须填写审批意见"}
            okText="确认"
            cancelText="取消"
            onConfirm={() => {
              if (!validateRejectComment()) return;
              if (!curTask?.id) {
                message.error('当前无可操作任务');
                return;
              }
              reject({ taskId: curTask.id, comment });
            }}
          >
            <Button style={{ marginBottom: 20 }} danger>拒绝</Button>
          </Popconfirm>
        )}

        {/* ===== 退回指定节点：仍用 Modal（需要选节点） ===== */}
        {canOps?.canRollback && (
          <ModalForm<API.RollbackCmd>
            title="退回至指定节点"
            size='small'
            width={520}
            trigger={<Button type="primary" ghost> 退回至指定节点 </Button>}
            initialValues={{
              taskId: curTask?.id,
            }}
            onFinish={async (values) => {
              await wfTaskRollbackTo(values)
              return true;
            }}
          >
            <ProFormText
              name="taskId"
              hidden
            />

            <ProFormSelect
              request={async () => {
                if (curTask?.id) {
                  const res = await wfTaskRollbackNodes({ taskId: curTask?.id });
                  return res.data ? res.data : []
                }
                return [];
              }}
              name="targetActivityId"
              label="退回至："
              placeholder="请选择节点"
              rules={[
                { required: true, message: "请选择节点" }
              ]}
            />
            <ProFormTextArea
              name="comment"
              label="退回理由"
              rules={[
                { required: true, message: "请输入理由" }
              ]}
            />

          </ModalForm>
        )}

        {/* ===== 转交：仍用 Modal（需要选人） ===== */}
        {canOps?.canTransfer && (
          <ModalForm<API.TransferTaskCmd>
            title="转交"
            size='small'
            width={520}
            initialValues={{
              taskId: curTask?.id,
            }}
            trigger={<Button type="primary" ghost> 转交 </Button>}
            onFinish={async (values) => {
              await wfTaskTransfer(values)
              return true;
            }}
          >
            <ProFormText
              name="taskId"
              hidden
            />

            <ProFormSelect
              request={async () => {
                if (curTask?.id) {
                  const res = await wfTaskTransferCandidates({ taskId: curTask?.id, userDTO: {}, pageQuery: {} });
                  return res.data ? res.data : []
                }
                return [];
              }}
              name="toUserId"
              label="转交至："
              placeholder="请选择转交人"
              rules={[
                { required: true, message: "请选择转交人" }
              ]}
            />
            <ProFormTextArea
              name="comment"
              label="转交理由"
              rules={[
                { required: true, message: "请输入理由" }
              ]}
            />

          </ModalForm>

        )}

        {/* ===== 撤销：Popconfirm ===== */}
        {canOps?.canWithdraw && (
          <Popconfirm
            title="确认撤销？"
            okText="确认"
            cancelText="取消"
            onConfirm={() => {
              if (!wfData?.instance) {
                message.error('当前无可操作任务');
                return;
              }
              withdraw({ instanceId: wfData?.instance.id, comment });
            }}
          >
            <Button style={{ marginBottom: 20 }} type="primary" ghost>撤销</Button>
          </Popconfirm>
        )}

        {/* ===== 加签：仍用 Modal（需要选人） ===== */}
        {canOps?.canAddSign && (
          <Button
            onClick={() => {

            }
            }
            style={{ marginBottom: 20 }}
            type="primary" ghost
          >
            加签
          </Button>
        )}
      </Space>
    </div>
  );
};

export default WorkFlowActionPanel;
