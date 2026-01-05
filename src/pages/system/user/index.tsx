import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Result, Space, Table } from 'antd';
import { use, useRef } from 'react';
import UserDrawerForm from './components/UserDrawerForm';
import UserRoleModalForm from '../post/components/PostRoleModalForm';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { sysUserList, sysUserRemove } from '@/services/yuan/sysUserController';
import { DictEnum } from '@/const/dict-enum';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { Access, useAccess } from '@umijs/max';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { PlusOutlined } from '@ant-design/icons';
import { sysDeptTreeselect } from '@/services/yuan/sysDeptController';
import { convertTree } from '@/util/TreeUtils';
export default () => {

  /**权限控制 */
  const access = useAccess();

  const actionRef = useRef<ActionType | null>(null);
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(sysUserRemove, actionRef.current?.reload)
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
      dataIndex: 'nickName'
    },
    {
      title: '登录名称',
      dataIndex: 'userName',
      hideInSearch: true,
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'status',
      filters: true,
      onFilter: true,
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
      valueType: 'select',
      valueEnum: sexEnum
    },
    {
      title: '用户邮箱',
      dataIndex: 'email',
    },
    {
      title: '手机号',
      dataIndex: 'phonenumber',
      hideInSearch: true,
    },
    {
      title: '部门',
      dataIndex: 'deptId',
      valueType: 'treeSelect',
      hideInTable: true,
      fieldProps: {
        showSearch: true,
        treeDefaultExpandAll: false,
        // treeData: deptTreeData, // 页面初始化加载一次（数量不大时）
      },
      request: async () => {
        const res = await sysDeptTreeselect({
          bo: {}
        } as API.sysMenuTreeselectParams);
        return convertTree(res.data?.treeList || []) // 或者请求接口
      },
    },
    {
      title: '部门',
      dataIndex: 'deptName',
      hideInSearch: true,
    },
    {
      title: '岗位',
      dataIndex: 'postName',
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
          <Access key='edit' accessible={access.canAccess('system:user:edit') || false}>
            <UserDrawerForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <Access key='remove' accessible={access.canAccess('system:user:remove')}>
            <Popconfirm
              title="用户删除"
              description={`确认删除用户：${record.nickName}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ userIds: [record.userId] })}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];
  const request = useTableRequest(sysUserList);
  return (
    <PageContainer>
      <ProTable<API.SysUserVo>
        columns={columns}
        actionRef={actionRef}
        request={request}
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
          <Access key="add" accessible={access.canAccess('system:user:add')}>
            <UserDrawerForm
              mode="add"
              trigger={
                <Button type="primary" icon={<PlusOutlined />}>新增用户</Button>
              }
              reload={actionRef.current?.reload}
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
          <Access key="remove" accessible={access.canAccess('system:user:remove')}>
            <BatchDeleteAlert<API.SysUserVo>
              {...props}
              actionRef={actionRef}
              onDelete={(keys) =>
                sysUserRemove({ userIds: keys as string[] })
              }
            />
          </Access>
        )}
      />

    </PageContainer>

  );
};