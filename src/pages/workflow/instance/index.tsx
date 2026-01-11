
import { useActionRequest } from "@/hooks/action/useActionRequest";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { HIDE_COLUMN } from "@/util/ColumsUtils";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Access, useAccess } from "@umijs/max";
import { Button, Popconfirm, Space, Table } from "antd";
import { useRef } from "react";
import { wfDefinitionList, wfDefinitionRemove } from "@/services/yuan/wfDefinitionController";
import { wfInstanceList, wfInstanceRemove } from "@/services/yuan/wfInstanceController";
import { useDictDataValueEnum } from "@/hooks/dict/useDictDataValueEnum";
import { DictEnum } from "@/const/dict-enum";
export default () => {
  /**权限控制 */
  const access = useAccess();
  const statusEnum = useDictDataValueEnum(DictEnum.WF_INSTANCE_STATUS);
  const actionRef = useRef<ActionType | null>(null);

  const columns: ProColumns<API.WfInstanceVo>[] = [
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
      title: "业务标识",
      dataIndex: "definitionKey",
      ...HIDE_COLUMN
    },
    {
      title: "流程名称",
      dataIndex: "definitionName",
    },
    {
      title: "业务单号",
      dataIndex: "bizNo",
      render: (_, r) => r.bizNo ? <a>{r.bizNo}</a> : '-',
    },
    {
      title: "版本号",
      dataIndex: "version",
      hideInSearch: true,
    },
    {
      title: "状态",
      dataIndex: "status",
      valueEnum:statusEnum
    },
    {
      title: "发起人",
      dataIndex: "startUserId",
      ...HIDE_COLUMN
    },
    {
      title: "发起人",
      dataIndex: "startUserName",

    },
    {
      title:"发起人部门",
      dataIndex:"startDeptName"
    },
    {
      title:"发起人部门",
      dataIndex:"startDeptId",
      ...HIDE_COLUMN
    },
    {
      title: "发起时间",
      dataIndex: "startTime",
      valueType: "dateTime",
      hideInSearch: true,
    },

    {
      title: "结束时间",
      dataIndex: "endTime",
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
          <Access key="delete" accessible={access.canAccess("workflow:wfInstance:remove")}>
            <Popconfirm
              title="删除"
              description={`确认删除：${record.businessKey}？`}
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
    wfInstanceRemove,
    actionRef.current?.reload
  );

  const request = useTableRequest(wfInstanceList);

  return (
    <PageContainer>
      <ProTable<API.WfInstanceVo>
        rowKey="id"
        columns={columns}
        actionRef={actionRef}
        cardBordered
        request={request}
        pagination={false}
        headerTitle="流程实例管理"

        columnsState={{
          persistenceKey: 'wf-Instance-pro-table',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        // toolBarRender={() => [
        //   <Access accessible={access.canAccess('workflow:wfInstance:add')}>
        //     <Button>新增</Button>
        //   </Access >
        // ]}
      />
    </PageContainer>
  );
};
