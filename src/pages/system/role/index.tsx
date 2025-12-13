import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, message, Popconfirm, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import api from '@/services/yuan/index'
import RoleModalForm from './components/RoleModalForm';
import { HIDE_COLUMN } from '@/utils/colums';



export default () => {
  const actionRef = useRef<ActionType | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

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
      hideInSearch: true,
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
          okButtonProps={{ loading: confirmLoading }}
          onConfirm={() => handleDelete(record.roleId as number)}
          key={`delete-${record.roleId}`}
        >
          <a type="link" style={{ color: 'red' }}>删除</a>
        </Popconfirm>

      ],
    },
  ];

  const handleDelete = async (roleId: number) => {
    try {
      setConfirmLoading(true);
      await api.sysRoleController.sysRoleRemove({ roleIds: [roleId] })
      actionRef.current?.reload(); // 刷新表格
    } catch (error) {
      message.error('删除失败');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div>
      <ProTable<API.SysRoleVo>
        columns={columns}
        actionRef={actionRef}
        request={async (params, sort) => {
          const requestParams = { ...params };
          if (sort && Object.keys(sort).length > 0) {
            requestParams.orderByColumn = Object.keys(sort)[0];
            requestParams.isAsc = sort[Object.keys(sort)[0]];
          }
          const res = await api.sysRoleController.sysRoleList(requestParams as API.sysRoleListParams);
          return {
            data: res.rows || [],
            total: res.total || 0,
            success: true,
          };
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
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