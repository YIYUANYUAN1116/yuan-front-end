import BatchDeleteAlert from "@/components/ProTable/BatchDeleteAlert";
import { useActionRequest } from "@/hooks/action/useActionRequest";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { sysPostList, sysPostRemove } from "@/services/yuan/sysPostController";
import { HIDE_COLUMN } from "@/util/ColumsUtils";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import { Access, useAccess } from "@umijs/max";
import { Button, Popconfirm, Space, Table } from "antd";
import { useRef } from "react";
import { PostModalForm } from "./components/PostModalForm";
export default () => {
  /**权限控制 */
  const access = useAccess();

  const actionRef = useRef<ActionType | null>(null);

  const columns: ProColumns<API.SysPostVo>[] = [
    {
      title: "postId",
      dataIndex: "postId",
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
      title: "岗位编码",
      dataIndex: "postCode",
      hideInSearch: true,
    },
    {
      title: "岗位名称",
      dataIndex: "postName",
      hideInSearch: true,
    },
    {
      title: "显示顺序",
      dataIndex: "postSort",
      hideInSearch: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      hideInSearch: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
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
          <Access accessible={access.canAccess("system:post:edit") || false}>
            <PostModalForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <Access accessible={access.canAccess("system:post:remove")}>
            <Popconfirm
              title="删除"
              description={`确认删除：${record.postName}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ postIds: [record.postId as number] })}
            >
              <a style={{ color: "red" }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    sysPostRemove,
    actionRef.current?.reload
  );
  const request = useTableRequest(sysPostList);

  return (
    <ProTable<API.SysPostVo>
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
      headerTitle="职位管理"
      toolBarRender={() => [
        <Access accessible={access.canAccess("system:post:add")}>
          <PostModalForm
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
        <Access accessible={access.canAccess("system:post:remove")}>
          <BatchDeleteAlert<API.SysPostVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) => sysPostRemove({ postIds: keys as number[] })}
          />
        </Access>
      )}
    />
  );
};
