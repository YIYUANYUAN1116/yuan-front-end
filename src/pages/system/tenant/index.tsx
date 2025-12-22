import BatchDeleteAlert from "@/components/ProTable/BatchDeleteAlert";
import { useActionRequest } from "@/hooks/action/useActionRequest";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { sysUserRemove } from "@/services/yuan/sysUserController";
import { HIDE_COLUMN } from "@/util/ColumsUtils";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Access, useAccess } from "@umijs/max";
import { Button, Popconfirm, Space, Table } from "antd";
import { useRef } from "react";
import { TenantModalForm } from "./components/TenantModalForm";
import { sysTenantList, sysTenantRemove } from "@/services/yuan/sysTenantController";
export default () => {
  /**权限控制 */
  const access = useAccess();

  const actionRef = useRef<ActionType | null>(null);
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    sysTenantRemove,
    actionRef.current?.reload
  );

  const columns: ProColumns<API.SysTenantVo>[] = [
    {
      title: "Id",
      dataIndex: "id",
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
      title: "联系人",
      dataIndex: "contactUserName",
      hideInSearch: true,
    },
    {
      title: "联系电话",
      dataIndex: "contactPhone",
      hideInSearch: true,
    },
    {
      title: "企业名称",
      dataIndex: "companyName",
      hideInSearch: true,
    },
    {
      title: "统一社会信用代码",
      dataIndex: "licenseNumber",
      hideInSearch: true,
    },
        {
      title: "地址",
      dataIndex: "address",
      hideInSearch: true,
    },
    {
      title: "企业简介",
      dataIndex: "intro",
      hideInSearch: true,
    },
    {
      title: "域名",
      dataIndex: "domain",
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
          <Access accessible={access.canAccess("system:tenant:edit") || false}>
            <TenantModalForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <Access accessible={access.canAccess("system:tenant:remove")}>
            <Popconfirm
              title="删除"
              description={`确认删除：${record.companyName}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() =>
                deleteRun({ ids: [record.id as number] })
              }
            >
              <a style={{ color: "red" }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];
  const request = useTableRequest(sysTenantList);
  return (
    <ProTable<API.SysTenantVo>
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
      headerTitle="租户管理"
      toolBarRender={() => [
        <Access accessible={access.canAccess("system:tenant:add")}>
          <TenantModalForm
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
        <Access accessible={access.canAccess("system:tenant:remove")}>
          <BatchDeleteAlert<API.SysTenantVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) => sysUserRemove({ userIds: keys as number[] })}
          />
        </Access>
      )}
    />
  );
};
