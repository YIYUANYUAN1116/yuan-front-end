import BatchDeleteAlert from "@/components/ProTable/BatchDeleteAlert";
import { useActionRequest } from "@/hooks/action/useActionRequest";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { HIDE_COLUMN } from "@/util/ColumsUtils";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Access, useAccess,history } from "@umijs/max";
import { Button, Popconfirm, Space, Table } from "antd";
import { useRef } from "react";
import { DeptModalForm } from "./components/DeptModalForm";
import { sysDeptList, sysDeptListTree, sysDeptRemove } from "@/services/yuan/sysDeptController";
import { PlusOutlined } from "@ant-design/icons";
export default () => {
  /**权限控制 */
  const access = useAccess();

  const actionRef = useRef<ActionType | null>(null);

  const columns: ProColumns<API.SysDeptVo>[] = [
    {
      title: "deptId",
      dataIndex: "deptId",
      ...HIDE_COLUMN,
    },
    {
      title: "部门名称",
      dataIndex: "deptName",
    },
    {
      title: "负责人",
      dataIndex: "leader",
      hideInSearch: true,
    },
    {
      title: "联系电话",
      dataIndex: "phone",
      hideInSearch: true,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      hideInSearch: true,
    },
    // {
    //   title: "父部门id",
    //   dataIndex: "parentId",
    //   hideInSearch: true,
    // },
    // {
    //   title: "祖级列表",
    //   dataIndex: "ancestors",
    //   hideInSearch: true,
    // },
    {
      title: "显示顺序",
      dataIndex: "orderNum",
      hideInSearch: true,
      sorter: true,
      defaultSortOrder: 'descend',
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      hideInSearch: true,
      render: (text, record) => (
        <Space size="small">

          <Access key="add" accessible={access.canAccess("system:dept:add")}>
            <DeptModalForm
              mode="add"
              trigger={<a>新增</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <Access key="edit" accessible={access.canAccess("system:dept:edit")}>
            <DeptModalForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <a onClick={() => {
            history.push({
              pathname: '/system/dept-assign',
              search: `?deptId=${record.deptId}&deptName=${record.deptName}`,
            })
          }}>分配用户</a>

          <Access key="delete" accessible={access.canAccess("system:dept:remove")}>
            <Popconfirm
              title="删除"
              description={`确认删除：${record.deptName}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ deptIds: [record.deptId] })}
            >
              <a style={{ color: "red" }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    sysDeptRemove,
    actionRef.current?.reload
  );

  const request = useTableRequest(sysDeptListTree);

  return (
    <PageContainer>
      <ProTable<API.SysDeptVo>
        rowKey="deptId"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={request}
        pagination={false}
        headerTitle="部门管理"
        expandable={{
          rowExpandable: (record) => !!record.children?.length,
          expandRowByClick: false, // ✅ 禁用整行点击展开
        }}

        columnsState={{
          persistenceKey: 'sys-dept-pro-table',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        toolBarRender={() => [
          <Access accessible={access.canAccess('system:dept:add')}>
            <DeptModalForm
              key="deptadd"
              mode="add"
              reload={actionRef.current?.reload}
              trigger={<Button type="primary" icon={<PlusOutlined />}
              >新建部门</Button>}
            />
          </Access >
        ]}
      />
    </PageContainer>
  );
};
