import { ActionType, DrawerForm, ProTable } from "@ant-design/pro-components";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { deptAllocatedUserList, deptSetLeader } from "@/services/yuan/sysDeptController";
import { ProColumns } from '@ant-design/pro-components';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { Button, Popconfirm, Space, Tag } from "antd";
import { Access, useAccess } from "@umijs/max";
import { useActionRequest } from "@/hooks/action/useActionRequest";
import { useRef } from "react";


type Props = {
  deptId: string;
  deptName?: string;
  leaderId?: string
  reload?: ActionType['reload'];
};

const DeptUserListDrawerForm = ({ deptId, deptName, reload, leaderId }: Props) => {
  const request = useTableRequest(deptAllocatedUserList)
  const { run: setLeaderRun, loading: setLeaderLoading } = useActionRequest(
    deptSetLeader,
    reload
  );
  const access = useAccess();
  const userBaseColumns: ProColumns<API.SysUserVo>[] = [
    {
      title: '用户Id',
      dataIndex: 'userId',
      ...HIDE_COLUMN,
    },
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户名称',
      dataIndex: 'nickName',
      ellipsis: true,
    },
    {
      title: '登录名称',
      dataIndex: 'userName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: '手机号',
      dataIndex: 'phonenumber',
      hideInSearch: true,
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      valueType: 'select',
      valueEnum: {
        '0': { text: '启用', status: 'Success' },
        '1': { text: '禁用', status: 'Error' }
      },
    },

    {
      title: '岗位',
      dataIndex: 'postName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '负责人',
      dataIndex: 'isLeader',
      hideInSearch: true,
      render: (_, record) =>
        record.userId === leaderId ? (
          <Tag color="green">负责人</Tag>
        ) : (
          '-'
        ),
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      hideInSearch: true,
      render: (_, record) => (
        <Space size="small">
          <Access accessible={access.canAccess("system:dept:edit")}>
            {record.userId !== leaderId && (
              <Popconfirm
                title="设为部门负责人"
                description={`确认设 ${record.nickName} 为该部门负责人？`}
                onConfirm={() => setLeaderRun({ deptId, userId: record.userId })}
                placement="topLeft"
              >
                <a>设为负责人</a>
              </Popconfirm>
            )}
          </Access>
        </Space>
      )
    },
  ];

  return (
    <DrawerForm
      title={deptName + ` - 已分配用户列表`}
      trigger={
        <a>已分配用户</a>
      }
      size="middle"
      width={960}
    >
      <ProTable
        params={{ deptId }}
        columns={userBaseColumns}
        request={request}
        rowKey='userId'
      />
    </DrawerForm>
  );
};

export default DeptUserListDrawerForm;
