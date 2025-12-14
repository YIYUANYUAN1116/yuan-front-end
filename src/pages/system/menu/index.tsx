import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable, DrawerForm, ProFormText, ProFormSelect, ProFormDigit } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, message } from 'antd';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { sysMenuListTree, sysMenuRemove, sysMenuEdit } from '@/services/yuan/sysMenuController';
import MenuDrawer from './components/MenuDrawer';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { createFetchList, createLoadingRequest } from '@/util/DataRequestUtils';

export default () => {
  const actionRef = useRef<ActionType | null>(null);
  const { run: deleteRun, loading: deleteLoading } = createLoadingRequest(sysMenuRemove, actionRef)
  const RowActions = React.memo(({ record, reload }: any) => {
    return (
      <Space size={8}>
        <MenuDrawer
          mode="edit"
          record={record}
          reload={reload}
          trigger={<a>编辑</a>}
        />
        <Popconfirm
          title="确认删除？"
          okButtonProps={{ loading: deleteLoading }}
          onConfirm={() => deleteRun({ menuIds: [record.menuId as number] })}
          okText="确认"
          cancelText="取消"
        >
          <a style={{ color: 'red' }}>删除</a>
        </Popconfirm>
      </Space>
    );
  });

  const reload = useCallback(() => {
    actionRef.current?.reload();
  }, []);

  const columns = useMemo<ProColumns<API.SysMenuVo>[]>(() => [
    {
      dataIndex: 'menuId',
      ...HIDE_COLUMN
    },
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      ellipsis: true,
    },
    {
      title: '父菜单ID',
      dataIndex: 'parentId',
      ellipsis: true,
      ...HIDE_COLUMN
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      ellipsis: true,
      hideInSearch: true,
    },
    {
      disable: true,
      title: '菜单状态',
      dataIndex: 'status',
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
      disable: true,
      title: '菜单类型',
      dataIndex: 'menuType',
      ellipsis: true,
      valueType: 'select',
      valueEnum: {
        "M": {
          text: '目录'
        },
        "C": {
          text: '菜单'
        },
        "F": {
          text: '按钮'
        }
      },
    },
    {
      title: '子菜单数量',
      dataIndex: 'childrenLength',
      ellipsis: true,
      hideInSearch: true,
      render: (text, record) => [
        <span>{record.children?.length}</span>
      ],
    },
    {
      title: '显示顺序',
      dataIndex: 'orderNum',
      ellipsis: true,
      hideInSearch: true,
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
      width: 140,
      render: (_, record) => <RowActions record={record} reload={reload} />,
    },
  ], [reload]);


  const fetchDictData = async (params: any) => {
    const res = await sysMenuListTree({ bo: params } as API.sysMenuListTreeParams);
    return { data: res.data || [], success: true };
  }

  return (
    <ProTable
      rowKey="menuId"
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={async (params) => fetchDictData(params)}
      pagination={false}
      headerTitle="菜单管理"
      expandable={{
        rowExpandable: (record) => !!record.children?.length,
        expandRowByClick: false, // ✅ 禁用整行点击展开
      }}
      columnsState={{
        persistenceKey: undefined,
        persistenceType: undefined,
      }}
      toolBarRender={() => [
        <MenuDrawer
          key="add"
          mode="add"
          reload={reload}
          trigger={<Button type="primary" icon={<PlusOutlined />}
          >新建菜单</Button>}
        />,
      ]}
    />
  );
};
