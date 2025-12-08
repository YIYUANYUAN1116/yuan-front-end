import { EllipsisOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Dropdown, Space, Tag } from 'antd';
import { useRef } from 'react';
import api from '@/services/yuan/index'


const columns: ProColumns<API.SysUserVo>[] = [
  {
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名称',
    dataIndex: 'nickName',
    copyable: true,
    ellipsis: true
  },
  {
    title: '登录名称',
    dataIndex: 'userName',
    copyable: true,
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
      1: {
        text: '禁用',
        status: 'Error',
      },
      0: {
        text: '启用',
        status: 'Success'
      }
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    valueType: 'date',
    sorter: true,
    hideInSearch: true,
  },

  {
    title: '操作',
    valueType: 'option',
    key: 'option',
    hideInSearch: true,
    render: (text, record, _, action) => [
      <a
        key="editable"
        onClick={() => {
          console.log("编辑")
        }}
      >
        编辑
      </a>,

    ],
  },
];

export default () => {
  const actionRef = useRef<ActionType | null>(null);
  return (
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

        const res = await api.sysUserController.list(requestParams as API.listParams);
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
      rowKey="id"
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
        <Button
          key="button"
          icon={<PlusOutlined />}
          onClick={() => {
            actionRef.current?.reload();
          }}
          type="primary"
        >
          新建
        </Button>
      ]}
    />
  );
};