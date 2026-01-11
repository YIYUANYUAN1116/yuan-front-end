// components/AssigneePicker.tsx
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { sysUserList } from '@/services/yuan/sysUserController';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Space, Table, Tag } from 'antd';
import React, { useEffect, useMemo, useState } from 'react';

export type AssigneeUser = {
  userId: string;
  nickName: string;
  deptName?: string;
  postName?: string;
};

type AssigneePickerValue = {
  userIds: string[];
  users: AssigneeUser[];
};

type AssigneePickerProps = {
  value?: AssigneePickerValue;              // ✅ 外部传入已选（用于回显勾选）
  onChange?: (v: AssigneePickerValue) => void; // ✅ 选中后回填到外面
};

const AssigneePicker: React.FC<AssigneePickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<AssigneeUser[]>([]);

  // ✅ 打开抽屉时，用外部 value 回显勾选
  useEffect(() => {
    if (!open) return;
    const ids = value?.userIds ?? [];
    setSelectedRowKeys(ids);
    setSelectedRows(value?.users ?? []);
  }, [open, value?.userIds, value?.users]);

  const columns: ProColumns[] = useMemo(
    () => [
      { title: '用户Id', dataIndex: 'userId', ...HIDE_COLUMN },
      { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
      { title: '用户名称', dataIndex: 'nickName' },
      { title: '部门', dataIndex: 'deptName' },
      { title: '岗位', dataIndex: 'postName' },
    ],
    [],
  );

  const request = useTableRequest(sysUserList);

  const handleConfirm = () => {
    const userIds = selectedRowKeys.map((k) => String(k));
    const users = selectedRows.map((r) => ({
      userId: String(r.userId),
      nickName: r.nickName,
      deptName: r.deptName,
      postName: r.postName,
    }));
    onChange?.({ userIds, users });
    setOpen(false);
  };

  return (
    <>
      <Space orientation ="vertical" style={{ width: '100%' }}>
        <Button type="primary" icon={<PlusOutlined />} onClick={() => setOpen(true)}>
          选择
        </Button>

        {/* ✅ 外部选中的人名：竖向排列 */}
        {(value?.users?.length ?? 0) > 0 && (
          <Space orientation ="vertical" style={{ width: '100%' }}>
            {value!.users.map((u) => (
              <div key={u.userId} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Tag>{u.nickName}</Tag>
                <span style={{ color: '#999' }}>
                  {u.deptName ? `/${u.deptName}` : ''}
                  {u.postName ? `/${u.postName}` : ''}
                </span>
              </div>
            ))}
          </Space>
        )}
      </Space>

      <Drawer
        title="指定审批人"
        open={open}
        onClose={() => setOpen(false)}
        destroyOnHidden 
        size={960}
      >
        <ProTable
          columns={columns}
          request={request}
          rowKey="userId"
          pagination={{ pageSize: 10 }}
          search={{ labelWidth: 'auto' }}
          rowSelection={{
            selectedRowKeys,
            onChange: (keys, rows) => {
              setSelectedRowKeys(keys);
              const map = new Map<string, AssigneeUser>();
              selectedRows.forEach((r) => map.set(String(r.userId), r));
              rows.forEach((r: any) => map.set(String(r.userId), r));
              const finalRows = keys
                .map((k) => map.get(String(k)))
                .filter(Boolean) as AssigneeUser[];
              setSelectedRows(finalRows);
            },
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
          }}
          tableAlertOptionRender={false}
          tableAlertRender={() => (
            <Button type="primary" onClick={handleConfirm}>
              确认
            </Button>
          )}
        />
      </Drawer>
    </>
  );
};

export default AssigneePicker;
