import { useRef } from 'react';
import type { ActionType } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Modal, Space, Table } from 'antd';
import { userBaseColumns } from './userColumns';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { allocatedUserList, unallocatedUserList } from '@/services/yuan/sysRoleController';

type RoleUserTableProps = {
  model: string;
  roleId: string;
  title: any;
  actionText: string;
  confirmText: (count: number) => string;
  onBatchAction: (keys: string[]) => Promise<API.RVoid>;
  reloadParent?: () => void;
  toolBarRender?: () => React.ReactNode[];
  actionRef?: React.RefObject<ActionType | null>;
};

const RoleUserTable = ({
  model,
  roleId,
  title,
  actionText,
  confirmText,
  onBatchAction,
  reloadParent,
  toolBarRender,
  actionRef,
}: RoleUserTableProps) => {
  const internalActionRef = useRef<ActionType | null>(null);
  const ref = actionRef || internalActionRef;
  const isAllocatedUser = model === "Y";
  const request = useTableRequest(isAllocatedUser ? allocatedUserList : unallocatedUserList);
  return (
    <ProTable<API.SysUserVo>
      actionRef={ref}
      columns={userBaseColumns}
      rowKey="userId"
      params={{ roleId }}
      request={request}
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
      headerTitle={title}
      rowSelection={{
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
      tableAlertOptionRender={false}
      tableAlertRender={({ selectedRowKeys, onCleanSelected }) => (
        <Space size={24}>
          <span>
            已选 {selectedRowKeys.length} 项
            <a style={{ marginInlineStart: 8 }} onClick={onCleanSelected}>
              取消选择
            </a>
          </span>
          <a
            onClick={() => {
              Modal.confirm({
                title: actionText,
                content: confirmText(selectedRowKeys.length),
                onOk: async () => {
                  await onBatchAction(selectedRowKeys as string[]);
                  onCleanSelected();
                  ref.current?.reload();
                  reloadParent?.();
                },
              });
            }}
          >
            {actionText}
          </a>
        </Space>
      )}
      toolBarRender={toolBarRender}
    />
  );
};

export default RoleUserTable;
