import BatchDeleteAlert from "@/components/ProTable/BatchDeleteAlert";
import { useActionRequest } from "@/hooks/action/useActionRequest";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { HIDE_COLUMN } from "@/util/ColumsUtils";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Access, useAccess } from "@umijs/max";
import { Button, Popconfirm, Space, Table } from "antd";
import { useRef } from "react";
import { DeptModalForm } from "./components/DeptModalForm";
import { sysDeptList, sysDeptRemove } from "@/services/yuan/sysDeptController";
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
      title: "序号",
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "租户编号",
      dataIndex: "tenantId",
      hideInSearch: true,
    },
    {
      title: "父部门id",
      dataIndex: "parentId",
      hideInSearch: true,
    },
    {
      title: "祖级列表",
      dataIndex: "ancestors",
      hideInSearch: true,
    },
    {
      title: "显示顺序",
      dataIndex: "orderNum",
      hideInSearch: true,
    },
    {
      title: "部门名称",
      dataIndex: "deptName",
      hideInSearch: true,
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
      title: "负责人",
      dataIndex: "leader",
      hideInSearch: true,
    },
    {
      title: "邮箱",
      dataIndex: "email",
      hideInSearch: true,
    },
    {
      title: "备注",
      dataIndex: "remark",
      hideInSearch: true,
    },
    {
      title: "操作",
      valueType: "option",
      key: "option",
      hideInSearch: true,
      render: (text, record) => (
        <Space size="small">
          <Access accessible={access.canAccess("system:dept:edit") || false}>
            <DeptModalForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <Access accessible={access.canAccess("system:dept:remove")}>
            <Popconfirm
              title="删除"
              description={`确认删除：${record.deptName}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ deptIds: [record.deptId as number] })}
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
  const request = useTableRequest(sysDeptList);

  return (
    <ProTable<API.SysDeptVo>
      columns={columns}
      actionRef={actionRef}
      request={request}
      columnsState={{
        persistenceKey: "sys-tenant-pro-table",
        persistenceType: "localStorage",
        defaultValue: {
          option: { fixed: "right", disable: true },
        },
      }}
      rowKey="id"
      search={{ labelWidth: "auto" }}
      pagination={{ pageSize: 10 }}
      headerTitle="部门管理"
      toolBarRender={() => [
        <Access accessible={access.canAccess("system:dept:add")}>
          <DeptModalForm
            mode="add"
            trigger={<Button type="primary">新增</Button>}
            reload={actionRef.current?.reload}
            key="add"
          />
        </Access>,
      ]}
      rowSelection={{
        // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
        // 注释该行则默认不显示下拉选项
        selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
      }}
      tableAlertOptionRender={false}
      tableAlertRender={(props) => (
        <Access accessible={access.canAccess("system:dept:remove")}>
          <BatchDeleteAlert<API.SysDeptVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) => sysDeptRemove({ deptIds: keys as number[] })}
          />
        </Access>
      )}
    />
  );
};
