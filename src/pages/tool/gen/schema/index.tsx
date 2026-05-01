import { PlusOutlined } from '@ant-design/icons';
import {
  type ActionType,
  PageContainer,
  type ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { history, useSearchParams } from '@umijs/max';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import { useRef } from 'react';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { schemaList, schemaRemove } from '@/services/yuan/schemaController';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { querySchemaGroupOptions, statusOptions } from '../utils';
import SchemaModalForm from './components/SchemaModalForm';

export default () => {
  const [searchParams] = useSearchParams();
  const schemaGroupId = searchParams.get('schemaGroupId');
  const actionRef = useRef<ActionType | null>(null);
  const tableRequest = useTableRequest(schemaList);
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    schemaRemove,
    actionRef.current?.reload,
  );

  const columns: ProColumns<API.SchemaVo>[] = [
    { title: 'ID', dataIndex: 'id', ...HIDE_COLUMN },
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    {
      title: '模型分组',
      dataIndex: 'schemaGroupId',
      valueType: 'select',
      request: querySchemaGroupOptions,
      initialValue: schemaGroupId || undefined,
      hideInTable: true,
      fieldProps: { showSearch: true, optionFilterProp: 'label' },
    },
    { title: '模型名称', dataIndex: 'name' },
    // { title: '模型编码', dataIndex: 'code', hideInSearch: true },
    { title: '表名', dataIndex: 'tableName' },
    { title: '表注释', dataIndex: 'comment', hideInSearch: true },
    { title: '字典', dataIndex: 'dictType', hideInSearch: true },
    { title: '存储引擎', dataIndex: 'engine', hideInSearch: true },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: {
        '0': { text: '启用', status: 'Success' },
        '1': { text: '停用', status: 'Default' },
      },
      fieldProps: { options: statusOptions },
      render: (_, record) =>
        record.status === '1' ? (
          <Tag>停用</Tag>
        ) : (
          <Tag color="success">启用</Tag>
        ),
    },
    // { title: '排序', dataIndex: 'sort', hideInSearch: true, sorter: true },
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
      width: 190,
      render: (_, record) => (
        <Space size="small">
          <SchemaModalForm
            mode={OperationModes.EDIT}
            trigger={<a>编辑</a>}
            record={record}
            reload={actionRef.current?.reload}
          />
          <a
            onClick={() =>
              history.push({
                pathname: '/tool/gen/schemaField',
                search: `?schemaId=${record.id || ''}`,
              })
            }
          >
            字段
          </a>
          <Popconfirm
            title="删除数据模型"
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
      <ProTable<API.SchemaVo>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        request={(params, sort) =>
          tableRequest(
            { ...params, schemaGroupId: params.schemaGroupId || schemaGroupId },
            sort,
          )
        }
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 10 }}
        headerTitle="数据模型"
        columnsState={{
          persistenceKey: 'schema-pro-table',
          persistenceType: 'localStorage',
          defaultValue: { option: { fixed: 'right', disable: true } },
        }}
        toolBarRender={() => [
          <SchemaModalForm
            key="add"
            mode={OperationModes.ADD}
            schemaGroupId={schemaGroupId}
            reload={actionRef.current?.reload}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增模型
              </Button>
            }
          />,
        ]}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertOptionRender={false}
        tableAlertRender={(props) => (
          <BatchDeleteAlert<API.SchemaVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) => schemaRemove({ ids: keys as any })}
          />
        )}
      />
    </PageContainer>
  );
};
