import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, message, Popconfirm, Space, Tag } from 'antd';
import { useRef, useState } from 'react';
import api from '@/services/yuan/index'
import CreateForm from './components/CreateForm';
import UpdateForm from './components/UpdateForm';



export default () => {
  const actionRef = useRef<ActionType | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const columns: ProColumns<API.SysRoleVo>[] = [
    {
      dataIndex: 'roleId',
      width: 48,
      hidden: true
    },
    {
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
      render: (text, record, _, action) => [
        <UpdateForm
          key="config"
          record={record as API.SysRoleBo}
          reload={actionRef.current?.reload}
        />,
        <Popconfirm
          title="角色删除"
          description={`确认删除角色：${record.roleName}`}
          okText="确认"
          cancelText="取消"
          okButtonProps={{ loading: confirmLoading }}
          onConfirm={() => handleDelete(record.roleId as number)}

        >
          <Button type="link" danger>删除</Button>
        </Popconfirm>

      ],
    },
  ];

  const handleDelete = async (roleId: number) => {
    try {
      setConfirmLoading(true);
      await api.sysRoleController.remove1({ roleIds: [roleId] })
      actionRef.current?.reload(); // 刷新表格
    } catch (error) {
      message.error('删除失败');
    } finally{
      setConfirmLoading(false);
    }
  };

  return (
    <div>
      <ProTable<API.SysRoleVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const requestParams = { ...params };
          if (sort && Object.keys(sort).length > 0) {
            requestParams.orderByColumn = Object.keys(sort)[0];
            requestParams.isAsc = sort[Object.keys(sort)[0]];
          }
          const res = await api.sysRoleController.list1(requestParams as API.list1Params);
          return {
            data: res.rows || [],
            total: res.total || 0,
            success: true,
          };
        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'pro-table-singe-demos',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
          onChange(value) {
            console.log('value: ', value);
          },
        }}
        rowKey="userId"
        search={{
          labelWidth: 'auto',
        }}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 由于配置了 transform，提交的参数与定义的不同这里需要转化一下
          syncToUrl: (values, type) => {
            if (type === 'get') {
              return {
                ...values,
                created_at: [values.startTime, values.endTime],
              };
            }
            return values;
          },
        }}
        pagination={{
          pageSize: 5,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="角色管理"
        toolBarRender={() => [
          <CreateForm key="create" reload={actionRef.current?.reload} />
        ]}
      />


    </div>

  );
};