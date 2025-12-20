import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, message, Modal, Popconfirm, Result, Space, Table } from 'antd';
import { useContext, useEffect, useRef, useState } from 'react';
import api from '@/services/yuan/index';
import UserModalForm from './components/UserModalForm';
import UserRoleModalForm from './components/UserRoleModalForm';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { createFetchList, createLoadingRequest } from '@/util/DataRequestUtils';
import { sysUserList, sysUserRemove } from '@/services/yuan/sysUserController';
import { DictEnum } from '@/const/dict-enum';
import { useDictDataValueEnum } from '@/hook/DictHook';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { Access, useAccess } from '@umijs/max';
export default () => {

  /**权限控制 */
  const access = useAccess();
  if (!access.canAccess('system:user:list')) {
    return <Result status="403" title="无权限访问" />;
  }

  const actionRef = useRef<ActionType | null>(null);
  const { run: deleteRun, loading: deleteLoading } = createLoadingRequest(sysUserRemove, actionRef.current?.reload)
  const sexEnum = useDictDataValueEnum(DictEnum.SYS_USER_SEX)
  const statusEnum = useDictDataValueEnum(DictEnum.SYS_NORMAL_DISABLE)

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
      valueEnum: statusEnum
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
      valueEnum: sexEnum
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
          <Access accessible={access.canAccess('system:user:edit') || false}>
            <UserModalForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <Access accessible={access.canAccess('system:user:edit') || false}>
            <UserRoleModalForm userId={record.userId!} reload={actionRef.current?.reload} />
          </Access>

          <Access accessible={access.canAccess('system:user:remove') || false}>
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
          </Access>
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
            <Access accessible={access.canAccess('system:user:add') || false}>
              <Button type="primary">新增</Button>
            </Access>
          }
          reload={actionRef.current?.reload}
          key="add"
        />,
      ]}
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
      tableAlertOptionRender={false}
      tableAlertRender={(props) => (
        <Access accessible={access.canAccess('system:user:remove') || false}>
          <BatchDeleteAlert<API.SysUserVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) =>
              sysUserRemove({ userIds: keys as number[] })
            }
          />
        </Access>

      )}
    />
  );
};