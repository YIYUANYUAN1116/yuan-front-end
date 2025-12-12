import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Popconfirm, Space } from 'antd';
import { useRef, useState } from 'react';
import api from '@/services/yuan/index';
import UserModalForm from './components/UserModalForm';
import { min } from 'lodash';
import UserRoleModalForm from './components/UserRoleModalForm';

export default () => {
  const actionRef = useRef<ActionType | null>(null);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const columns: ProColumns<API.SysUserVo>[] = [
    {
      title: '用户Id',
      dataIndex: 'userId',
      width: 48,
      hideInTable: true,    // 表格不显示
      hideInSetting: true,  // 设置弹窗也不显示
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
      disable: true,
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        '1': {
          text: '禁用',
          status: 'Error',
        },
        '0': {
          text: '启用',
          status: 'Success',
        },
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
        '0': {
          text: '男',
        },
        '1': {
          text: '女',
        },
        '2': {
          text: '未知',
        },
      },
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
      ellipsis: true,
      hideInSearch: true,
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
      render: (text, record, _, action) => [
        <Space size="small">
          <UserModalForm
            mode="edit"
            trigger={<a type="link">编辑</a>}
            record={record}
            reload={actionRef.current?.reload}
            key={`edit-${record.userId}`}
          />
         <UserRoleModalForm userId={record.userId} reload={actionRef.current?.reload} />
          <Popconfirm
            title="用户删除"
            description={`确认删除用户：${record.nickName}`}
            okText="确认"
            cancelText="取消"
            okButtonProps={{ loading: confirmLoading }}
            onConfirm={() => handleDelete(record.userId as number)}
            key={`delete-${record.userId}`}
          >
            <a type="link" style={{color:'red'}}>
              删除
            </a>
          </Popconfirm>
        </Space>
      ],
    },
  ];

  const handleDelete = async (userId: number) => {
    try {
      setConfirmLoading(true);
      await api.sysUserController.sysUserRemove({ userIds: [userId] });
      actionRef.current?.reload(); // 刷新表格
    } catch (error) {
      message.error('删除失败');
    } finally {
      setConfirmLoading(false);
    }
  };

  return (
    <div>
      <ProTable<API.SysUserVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={async (params, sort, filter) => {
          const requestParams = { ...params };
          if (sort && Object.keys(sort).length > 0) {
            requestParams.orderByColumn = Object.keys(sort)[0];
            requestParams.isAsc = sort[Object.keys(sort)[0]];
          }

          const res = await api.sysUserController.sysUserList(
            requestParams as API.sysUserListParams,
          );
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
            key={'add'}
          />,
        ]}
      />
    </div>
  );
};
