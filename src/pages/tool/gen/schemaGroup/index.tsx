import { PlusOutlined } from '@ant-design/icons';
import {
  type ActionType,
  PageContainer,
  type ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { history } from '@umijs/max';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useRef } from 'react';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import {
  schemaGroupList,
  schemaGroupRemove,
} from '@/services/yuan/schemaGroupController';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import SchemaGroupModalForm from './components/SchemaGroupModalForm';

export default () => {
  const actionRef = useRef<ActionType | null>(null);
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    schemaGroupRemove,
    actionRef.current?.reload,
  );

  const columns: ProColumns<API.SchemaGroupVo>[] = [
    { title: 'ID', dataIndex: 'id', ...HIDE_COLUMN },
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    { title: '分组名称', dataIndex: 'name' },
    { title: '分组编码', dataIndex: 'code' },
    { title: '图标', dataIndex: 'icon', hideInSearch: true },
    { title: '备注', dataIndex: 'remark', hideInSearch: true, ellipsis: true },
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
      width: 180,
      render: (_, record) => (
        <Space size="small">
          <SchemaGroupModalForm
            mode={OperationModes.EDIT}
            trigger={<a>编辑</a>}
            record={record}
            reload={actionRef.current?.reload}
          />
          <a
            onClick={() =>
              history.push({
                pathname: '/tool/gen/schema',
                search: `?schemaGroupId=${record.id || ''}`,
              })
            }
          >
            模型
          </a>
          <Popconfirm
            title="删除模型分组"
            description={`确认删除：${record.name}`}
            okText="确认"
            cancelText="取消"
            okButtonProps={{ loading: deleteLoading }}
            onConfirm={() => deleteRun({ ids: [record.id] as any })}
          >
            <a style={{ color: 'red' }}>删除</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.SchemaGroupVo>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        request={useTableRequest(schemaGroupList)}
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 10 }}
        headerTitle="模型分组"
        columnsState={{
          persistenceKey: 'schema-group-pro-table',
          persistenceType: 'localStorage',
          defaultValue: { option: { fixed: 'right', disable: true } },
        }}
        toolBarRender={() => [
          <SchemaGroupModalForm
            key="add"
            mode={OperationModes.ADD}
            reload={actionRef.current?.reload}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增分组
              </Button>
            }
          />,
        ]}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertOptionRender={false}
        tableAlertRender={(props) => (
          <BatchDeleteAlert<API.SchemaGroupVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) => schemaGroupRemove({ ids: keys as any })}
          />
        )}
      />
    </PageContainer>
  );
};
