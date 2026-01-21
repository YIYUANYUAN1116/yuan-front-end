import { ActionType } from '@ant-design/pro-components';
import { Button, Modal, Popconfirm, Space, message } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import React, { useMemo, useState } from 'react';

interface WorkFlowActionPanelProps {
  bizNo?: string;
  reload?: ActionType['reload'];
  task?: API.WfTaskVo;
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
  const { bizNo } = props;
  const [comment, setComment] = useState('');

  const allowedSet = useMemo(() => new Set(ALL_ACTIONS), []);

  /** 简单校验：拒绝必须填意见 */
  const ensureRejectComment = () => {
    if (!comment.trim()) {
      message.warning('拒绝时必须填写审批意见');
      return false;
    }
    return true;
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
        onChange={(e) => setComment(e.target.value)}
        maxLength={300}
        showCount
        rows={1}
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
            onConfirm={() => {
              console.log('approve', { bizNo, comment });
            }}
          >
            <Button type="primary">同意</Button>
          </Popconfirm>
        )}

        {/* ===== 拒绝：Popconfirm + 必填校验 ===== */}
        {allowedSet.has('REJECT') && (
          <Popconfirm
            title="确认拒绝？"
            description="拒绝操作必须填写审批意见"
            okText="确认"
            cancelText="取消"
            onConfirm={() => {
              if (!ensureRejectComment()) return;
              console.log('reject', { bizNo, comment });
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
            description={comment ? `审批意见：${comment.slice(0, 30)}` : '未填写审批意见'}
            okText="确认"
            cancelText="取消"
            onConfirm={() => {
              console.log('withdraw', { bizNo, comment });
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
