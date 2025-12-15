import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space } from 'antd';
import { useRef, useState } from 'react';
import api from '@/services/yuan/index';
import UserModalForm from './components/UserModalForm';
import UserRoleModalForm from './components/UserRoleModalForm';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { createFetchList, createLoadingRequest } from '@/util/DataRequestUtils';
import { sysUserList, sysUserRemove } from '@/services/yuan/sysUserController';


export default () => {
  const actionRef = useRef<ActionType | null>(null);
  const { run: deleteRun, loading: deleteLoading } = createLoadingRequest(sysUserRemove, actionRef.current?.reload)

  const columns: ProColumns<API.SysUserVo>[] = [
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
      hideInSearch: true,
    },
    {
      title: '登录名称',
      dataIndex: 'userName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        '1': { text: '禁用', status: 'Error' },
        '0': { text: '启用', status: 'Success' },
      },
    },
    {
      disable: true,
      title: '性别',
      dataIndex: 'sex',
      width: 100,
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        '0': { text: '男' },
        '1': { text: '女' },
        '2': { text: '未知' },
      },
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
      ellipsis: true,
    },
    {
      title: '手机号',
      dataIndex: 'phonenumber',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      hideInSearch: true,
      render: (text, record) => (
        <Space size="small">
          <UserModalForm
            mode="edit"
            trigger={<a>编辑</a>}
            record={record}
            reload={actionRef.current?.reload}
          />
          <UserRoleModalForm userId={record.userId!} reload={actionRef.current?.reload} />
          <Popconfirm
            title="用户删除"
            description={`确认删除用户：${record.nickName}`}
            okText="确认"
            cancelText="取消"
            okButtonProps={{ loading: deleteLoading }}
            onConfirm={() => deleteRun({ userIds: [record.userId as number] })}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const fetchDictData = createFetchList<
    Record<string, any>,
    API.SysUserVo
  >(sysUserList as any);

  return (
    <ProTable<API.SysUserVo>
      columns={columns}
      actionRef={actionRef}
      request={async (params, sort) => fetchDictData(params, sort)}
      columnsState={{
        persistenceKey: 'sys-user-pro-table',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
      }}
      rowKey="userId"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
      headerTitle="用户管理"
      toolBarRender={() => [
        <UserModalForm
          mode="add"
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              新建用户
            </Button>
          }
          reload={actionRef.current?.reload}
          key="add"
        />,
      ]}
    />
  );
};