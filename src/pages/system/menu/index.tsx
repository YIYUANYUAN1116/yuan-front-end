import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space, Tag, message } from 'antd';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import { sysMenuListTree, sysMenuRemove, sysMenuEdit } from '@/services/yuan/sysMenuController';
import MenuDrawer from './components/MenuDrawer';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { DictEnum } from '@/const/dict-enum';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { useDictDataTagMap } from '@/hooks/dict/useDictDataTagMap';
import { Access, useAccess } from '@umijs/max';
import { useTableRequest } from '@/hooks/table/useTableRequest';

export default () => {
  const actionRef = useRef<ActionType | null>(null);
  const statusEnum = useDictDataValueEnum(DictEnum.SYS_NORMAL_DISABLE)
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(sysMenuRemove, actionRef.current?.reload)
  const showHideMap = useDictDataTagMap(DictEnum.SYS_SHOW_HIDE)
  const access = useAccess();

  const renderVisible = (value: string | number) => {
    const tag = showHideMap[String(value)];
    return tag?.render?.() ?? value;
  };

  const RowActions = React.memo(({ record, reload }: any) => {
    return (
      <Space size={8}>
        <Access accessible={access.canAccess('system:menu:edit')}>
          <MenuDrawer
            mode="edit"
            record={record}
            reload={reload}
            trigger={<a>编辑</a>}
          />
        </Access>
        <Access accessible={access.canAccess('system:menu:remove')}>
          <Popconfirm
            title="确认删除？"
            okButtonProps={{ loading: deleteLoading }}
            onConfirm={() => deleteRun({ menuIds: [record.menuId] })}
            okText="确认"
            cancelText="取消"
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>

        </Access>
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
      valueEnum: statusEnum,
      width:100
    },

    {
      disable: true,
      title: '隐藏状态',
      dataIndex: 'visible',
      ellipsis: true,
      render: (_, record) => renderVisible(record.visible || 0),
      width:100
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
      width:100
    },
    {
      title: '菜单权限',
      dataIndex: 'perms',
      ellipsis: true,
      hideInSearch: true,
      width: 240,
      render: (text, record) => <Tag>{text}</Tag>,
    },
    {
      title: '显示顺序',
      dataIndex: 'orderNum',
      ellipsis: true,
      width: 100,
      hideInSearch: true,
      sorter: true,
      defaultSortOrder: 'ascend', // 默认降序
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
  ], [reload, statusEnum]);

  const request = useTableRequest(sysMenuListTree);
  return (
    <PageContainer>
      <ProTable
        rowKey="menuId"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={request}
        pagination={false}
        headerTitle="菜单管理"
        expandable={{
          rowExpandable: (record) => !!record.children?.length,
          expandRowByClick: false, // ✅ 禁用整行点击展开
        }}
        columnsState={{
          persistenceKey: 'sys-menu-pro-table',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        toolBarRender={() => [
          <Access accessible={access.canAccess('system:menu:add')}>
            <MenuDrawer
              key="menuAdd"
              mode="add"
              reload={reload}
              trigger={<Button type="primary" icon={<PlusOutlined />}
              >新建菜单</Button>}
            />
          </Access >
        ]}
      />
    </PageContainer>
  );
};
