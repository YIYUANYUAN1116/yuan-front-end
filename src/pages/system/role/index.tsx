import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import api from '@/services/yuan/index'
import RoleModalForm from './components/RoleModalForm';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { createFetchList, createLoadingRequest } from '@/util/DataRequestUtils';
import { sysRoleList, sysRoleRemove } from '@/services/yuan/sysRoleController';


export default () => {
  const actionRef = useRef<ActionType | null>(null);
  const columns: ProColumns<API.SysRoleVo>[] = [
    {
      dataIndex: 'roleId',
      width: 48,
      ...HIDE_COLUMN
    },
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      ellipsis: true
    },
    {
      title: '权限字符',
      dataIndex: 'roleKey',
      ellipsis: true,
    },
    {
      disable: true,
      title: '角色状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        0: {
          text: '启用',
          status: 'Success'
        },
        1: {
          text: '禁用',
          status: 'Error',
        }
      },
    },
    {
      title: '数据范围',
      dataIndex: 'dataScope',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => (
        <Space>
          <Tag color={'blue'} key={record.dataScope}>
            {record.dataScope}
          </Tag>
        </Space>
      ),
    },

    {
      title: '备注',
      dataIndex: 'remark',
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
      render: (text, record) => [
        <RoleModalForm
          mode="edit"
          trigger={<a type="link">编辑</a>}
          reload={actionRef.current?.reload}
          record={record}
          key={`edit-${record.roleId}`}
        />,
        <Popconfirm
          title="删除"
          description={`确认删除角色：${record.roleName}`}
          okText="确认"
          cancelText="取消"
          okButtonProps={{ loading: deleteLoading }}
          onConfirm={() => deleteRun(record.roleId as number)}
          key={`delete-${record.roleId}`}
        >
          <a type="link" style={{ color: 'red' }}>删除</a>
        </Popconfirm>

      ],
    },
  ];

  const { run: deleteRun, loading: deleteLoading } = createLoadingRequest(sysRoleRemove, actionRef.current?.reload)
  const fetchDictData = createFetchList<
    Record<string, any>,
    API.SysRoleVo
  >(sysRoleList as any);

  return (
    <div>
      <ProTable<API.SysRoleVo>
        columns={columns}
        actionRef={actionRef}
        request={async (params, sort) => fetchDictData(params, sort)}
       columnsState={{
        persistenceKey: 'sys-role-pro-table',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
      }}
        rowKey="roleId"
        pagination={{ pageSize: 10 }}
        search={{ labelWidth: 'auto' }}
        headerTitle="角色管理"
        toolBarRender={() => [
          <RoleModalForm
            mode="add"
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新建角色
              </Button>
            }
            reload={actionRef.current?.reload}
            key={'roleAdd'}
          />,
        ]}
      />


    </div>

  );
};