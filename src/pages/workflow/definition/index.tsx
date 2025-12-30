
import { useActionRequest } from "@/hooks/action/useActionRequest";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { HIDE_COLUMN } from "@/util/ColumsUtils";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Access,history, useAccess } from "@umijs/max";
import { Button, Popconfirm, Space, Table } from "antd";
import { useRef } from "react";
import { wfDefinitionList, wfDefinitionRemove } from "@/services/yuan/wfDefinitionController";
import DefinitionModalForm from "./components/DefinitionModalForm";
import { PlusOutlined } from "@ant-design/icons";
export default () => {
  /**权限控制 */
  const access = useAccess();

  const actionRef = useRef<ActionType | null>(null);

  const columns: ProColumns<API.WfDefinitionVo>[] = [
    {
      title: "id",
      dataIndex: "id",
      ...HIDE_COLUMN,
    },
    {
      title: "tenantId",
      dataIndex: "tenantId",
      ...HIDE_COLUMN,
    },
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: "流程名称",
      dataIndex: "definitionName",
    },
    {
      title: "流程业务标识",
      dataIndex: "definitionKey",
      hideInSearch: true,
    },
    {
      title: "版本号",
      dataIndex: "version",
      hideInSearch: true,
    },
    {
      title: "状态",
      dataIndex: "status",
    },
    {
      title: "创建人",
      dataIndex: "createBy",
      hideInSearch: true,
    },
    {
      title: "创建时间",
      dataIndex: "createTime",
      valueType: "dateTime",
      hideInSearch: true,
    },

    {
      title: "更新时间",
      dataIndex: "updateTime",
      valueType: "dateTime",
      hideInSearch: true,
    },

    {
      title: "操作",
      valueType: "option",
      key: "option",
      hideInSearch: true,
      render: (text, record) => (
        <Space size="small">

          <Access key="edit" accessible={access.canAccess("workflow:wfDefinition:edit")}>
            <DefinitionModalForm
              mode="edit"
              trigger={<a type="primary">编辑</a>}
              reload={actionRef.current?.reload}
              record={record}
            />
          </Access>

          <Access accessible={access.canAccess("workflow:wfDefinition:edit")}>
            <a onClick={() => {
              history.push({
                pathname: '/workflow/designer',
                search: `?id=${record.id}&definitionName=${record.definitionName}`,
              })
            }}>
              设计流程
            </a>
          </Access>

          <Access key="delete" accessible={access.canAccess("workflow:wfDefinition:remove")}>
            <Popconfirm
              title="删除"
              description={`确认删除：${record.definitionName}？`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ ids: [record.id] })}
            >
              <a style={{ color: "red" }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    wfDefinitionRemove,
    actionRef.current?.reload
  );

  const request = useTableRequest(wfDefinitionList);

  return (
    <PageContainer>
      <ProTable<API.WfDefinitionVo>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={request}
        pagination={false}
        headerTitle="流程定义管理"

        columnsState={{
          persistenceKey: 'wf-definition-pro-table',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        toolBarRender={() => [
          <Access accessible={access.canAccess('workflow:wfDefinition:add')}>
            <DefinitionModalForm
              mode="add"
              trigger={<Button type="primary" icon={<PlusOutlined />}>新增流程</Button>}
              reload={actionRef.current?.reload}
            />
          </Access >
        ]}
      />
    </PageContainer>
  );
};
