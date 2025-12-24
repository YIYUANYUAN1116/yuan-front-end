import { DownOutlined, PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Dropdown, MenuProps, Popconfirm, Space, Table, Tag } from 'antd';
import { useRef } from 'react';
import RoleModalForm from './components/RoleModalForm';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { sysRoleList, sysRoleRemove } from '@/services/yuan/sysRoleController';
import { DictEnum } from '@/const/dict-enum';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import DataScopeModalForm from './components/DataScopeModalForm';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { Access, history, useAccess } from '@umijs/max';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { useActionRequest } from '@/hooks/action/useActionRequest';

export const authScopeOptions = [
  { color: 'green', label: '全部数据权限', value: '1' },
  { color: 'default', label: '自定数据权限', value: '2' },
  { color: 'orange', label: '本部门数据权限', value: '3' },
  { color: 'cyan', label: '本部门及以下数据权限', value: '4' },
  { color: 'error', label: '仅本人数据权限', value: '5' },
  { color: 'default', label: '部门及以下或本人数据权限', value: '6' },
];

export default () => {
  const actionRef = useRef<ActionType | null>(null);
  const statusEnum = useDictDataValueEnum(DictEnum.SYS_NORMAL_DISABLE)
  const access = useAccess();

  const { run: deleteRun, loading: deleteLoading } = useActionRequest(sysRoleRemove, actionRef.current?.reload)


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
      valueEnum: statusEnum,
    },
    {
      title: '数据范围',
      dataIndex: 'dataScope',
      ellipsis: true,
      hideInSearch: true,
      render: (_, record) => {
        const found = authScopeOptions.find(
          (item) => item.value === record.dataScope,
        );
        if (found) {
          return <Tag color={found.color}>{found.label}</Tag>;
        }
        return <Tag>{record.dataScope}</Tag>;
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
      render: (_, record) => {
        if (record.superAdmin) return null;

        const items: MenuProps['items'] = [
          {
            key: 'assignUser',
            label: '分配用户',
            onClick: () =>
              history.push({
                pathname: '/system/role-assign',
                search: `?roleId=${record.roleId}&roleName=${record.roleName}`,
              }),
          },
          {
            key: 'dataScope',
            label: (
              <DataScopeModalForm
                trigger={<a>数据权限</a>}
                record={record}
              />
            ),
          },
        ];

        return (
          <Space>
            <Access accessible={access.canAccess('system:role:edit')}>
              <RoleModalForm
                mode="edit"
                trigger={<a>编辑</a>}
                reload={actionRef.current?.reload}
                record={record}
              />
            </Access>
            <Access accessible={access.canAccess('system:role:remove')}>
              <Popconfirm
                title="删除"
                description={`确认删除角色：${record.roleName}`}
                okText="确认"
                cancelText="取消"
                okButtonProps={{ loading: deleteLoading }}
                onConfirm={() => deleteRun({ roleIds: [record.roleId] })}
              >
                <a style={{ color: 'red' }}>删除</a>
              </Popconfirm>
            </Access>
            <Access accessible={access.canAccess('system:role:assigne')}>
              <Dropdown menu={{ items }}>
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    更多
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </Access>

          </Space>
        );
      }
    },
  ];


  const request = useTableRequest(sysRoleList);


  return (
    <div>
      <ProTable<API.SysRoleVo>
        columns={columns}
        actionRef={actionRef}
        request={request}
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
          <Access accessible={access.canAccess('system:role:add')}>
            <RoleModalForm
              mode="add"
              trigger={
                <Button type="primary" icon={<PlusOutlined />}>
                  新建角色
                </Button>
              }
              reload={actionRef.current?.reload}
              key={'roleAdd'}
            />
          </Access>

        ]}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertOptionRender={false}
        tableAlertRender={(props) => (
          <Access accessible={access.canAccess('system:role:remove')}>
            <BatchDeleteAlert<API.SysRoleVo>
              {...props}
              actionRef={actionRef}
              onDelete={(keys) =>
                sysRoleRemove({ roleIds: keys as string[] })
              }
            />
          </Access>

        )}
      />


    </div>

  );
};