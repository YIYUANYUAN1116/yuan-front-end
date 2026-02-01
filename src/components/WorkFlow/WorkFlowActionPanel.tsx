import { useActionRequest } from '@/hooks/action/useActionRequest';
import { wfTaskApprove, wfTaskReject, wfTaskWithdraw } from '@/services/yuan/wfTaskController';
import { ActionType } from '@ant-design/pro-components';

import { Button, Modal, Popconfirm, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
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

const ALL_ACTIONS: WfActionKey[] = [
  'APPROVE',
  'REJECT',
  'ROLLBACK_PREV',
  'ROLLBACK_TO',
  'TRANSFER',
  'WITHDRAW',
  'ADD_SIGN',
];

const WorkFlowActionPanel = (props: WorkFlowActionPanelProps) => {
  const { bizNo, wfData, reload } = props;
  const [comment, setComment] = useState('');
  const [commentError, setCommentError] = useState<string | null>(null);
  const curTask = wfData?.current;

  const allowedSet = useMemo(() => new Set(ALL_ACTIONS), []);

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

  /** Modal.confirm（用于需要额外信息的操作） */
  const confirm = (actionText: string, onOk: () => void) => {
    Modal.confirm({
      title: `确认${actionText}？`,
      content: comment ? `审批意见：${comment.slice(0, 30)}` : '未填写审批意见',
      okText: '确认',
      cancelText: '取消',
      onOk,
    });
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
        {allowedSet.has('APPROVE') && (
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
            <Button type="primary">同意</Button>
          </Popconfirm>
        )}

        {/* ===== 拒绝：Popconfirm + 必填校验 ===== */}
        {allowedSet.has('REJECT') && (
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
            <Button danger>拒绝</Button>
          </Popconfirm>
        )}

        {/* ===== 退回指定节点：仍用 Modal（需要选节点） ===== */}
        {allowedSet.has('ROLLBACK_TO') && (
          <Button
            onClick={() =>
              confirm('退回至指定节点', () => {
                console.log('rollback_to', { bizNo, comment });
              })
            }
          >
            退回至指定节点
          </Button>
        )}

        {/* ===== 转交：仍用 Modal（需要选人） ===== */}
        {allowedSet.has('TRANSFER') && (
          <Button
            onClick={() =>
              confirm('转交', () => {
                console.log('transfer', { bizNo, comment });
              })
            }
          >
            转交
          </Button>
        )}

        {/* ===== 撤销：Popconfirm ===== */}
        {allowedSet.has('WITHDRAW') && (
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
            <Button>撤销</Button>
          </Popconfirm>
        )}

        {/* ===== 加签：仍用 Modal（需要选人） ===== */}
        {allowedSet.has('ADD_SIGN') && (
          <Button
            onClick={() =>
              confirm('加签', () => {
                console.log('add_sign', { bizNo, comment });
              })
            }
          >
            加签
          </Button>
        )}
      </Space>
    </div>
  );
};

export default WorkFlowActionPanel;
