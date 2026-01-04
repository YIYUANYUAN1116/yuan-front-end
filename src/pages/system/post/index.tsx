import BatchDeleteAlert from "@/components/ProTable/BatchDeleteAlert";
import { useActionRequest } from "@/hooks/action/useActionRequest";
import { useTableRequest } from "@/hooks/table/useTableRequest";
import { sysPostList, sysPostRemove } from "@/services/yuan/sysPostController";
import { HIDE_COLUMN } from "@/util/ColumsUtils";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { PageContainer, ProTable } from "@ant-design/pro-components";
import { Access, useAccess, history } from "@umijs/max";
import { Button, Popconfirm, Space, Table, Tag } from "antd";
import { useRef } from "react";
import { PostModalForm } from "./components/PostModalForm";
import { DictEnum } from "@/const/dict-enum";
import { useDictDataValueEnum } from "@/hooks/dict/useDictDataValueEnum";
import { PlusOutlined } from "@ant-design/icons";
import { sysDeptTreeselect } from "@/services/yuan/sysDeptController";
import { convertTree } from "@/util/TreeUtils";

export default () => {
  /**权限控制 */
  const access = useAccess();

  const actionRef = useRef<ActionType | null>(null);
  const statusEnum = useDictDataValueEnum(DictEnum.SYS_NORMAL_DISABLE)

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
      title: "岗位名称",
      dataIndex: "postName"
    },
    {
      title: "岗位编码",
      dataIndex: "postCode"
    },
    {
      title: "所属部门",
      dataIndex: "deptName",
      hideInSearch: true,
    },
    {
      title: "所属部门",
      dataIndex: "deptId",
      ...HIDE_COLUMN,
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
      title: "显示顺序",
      dataIndex: "postSort",
      hideInSearch: true,
      sorter: true,
      defaultSortOrder: 'ascend', // 默认降序
    },
    {
      title: "状态",
      dataIndex: "status",
      valueType: 'select',
      valueEnum: statusEnum
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
          <Access key="edit" accessible={access.canAccess("system:post:edit") || false}>
            <Space>
              <PostModalForm
                mode="edit"
                trigger={<a>编辑</a>}
                record={record}
                reload={actionRef.current?.reload}
              />

              <a onClick={() => {
                history.push({
                  pathname: '/system/post-assign',
                  search: `?postId=${record.postId}&postName=${record.postName}`,
                })
              }}>分配用户</a>
            </Space>

          </Access>

          <Access key="delete" accessible={access.canAccess("system:post:remove")}>
            <Popconfirm
              title="删除"
              description={`确认删除：${record.postName}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ postIds: [record.postId] })}
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
    <PageContainer>
      <ProTable<API.SysPostVo>
        columns={columns}
        actionRef={actionRef}
        request={request}
        columnsState={{
          persistenceKey: "sys-post-pro-table",
          persistenceType: "localStorage",
          defaultValue: {
            option: { fixed: "right", disable: true },
          },
        }}
        rowKey="postId"
        search={{ labelWidth: "auto" }}
        pagination={{ pageSize: 10 }}
        headerTitle="职位管理"
        toolBarRender={() => [
          <Access key="add" accessible={access.canAccess("system:post:add")}>
            <PostModalForm
              mode="add"
              trigger={<Button type="primary" icon={<PlusOutlined />}>新增岗位</Button>}
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
          <Access key="delete" accessible={access.canAccess("system:post:remove")}>
            <BatchDeleteAlert<API.SysPostVo>
              {...props}
              actionRef={actionRef}
              onDelete={(keys) => sysPostRemove({ postIds: keys as string[] })}
            />
          </Access>
        )}
      />
    </PageContainer>
  );
};
