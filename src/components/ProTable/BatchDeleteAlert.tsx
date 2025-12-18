import { Space, Modal } from 'antd';
import type { ActionType } from '@ant-design/pro-components';

interface BatchDeleteAlertProps<T = any> {
  selectedRowKeys: React.Key[];
  selectedRows: T[];
  onCleanSelected: () => void;
  actionRef?: React.RefObject<ActionType | undefined | null>;
  /** 删除请求方法 */
  onDelete: (keys: React.Key[], rows: T[]) => Promise<any>;
  /** 文案 */
  title?: string;
}

export default function BatchDeleteAlert<T>({
  selectedRowKeys,
  selectedRows,
  onCleanSelected,
  actionRef,
  onDelete,
  title = '确认删除',
}: BatchDeleteAlertProps<T>) {
  if (!selectedRowKeys.length) return null;

  return (
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
            title,
            content: `确认删除选中的 ${selectedRowKeys.length} 条数据吗？`,
            onOk: async () => {
              await onDelete(selectedRowKeys, selectedRows);
              onCleanSelected();
              actionRef?.current?.reload();
            },
          });
        }}
      >
        批量删除
      </a>
    </Space>
  );
}
