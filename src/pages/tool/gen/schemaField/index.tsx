import { CodeOutlined, PlusOutlined } from '@ant-design/icons';
import {
  type ActionType,
  PageContainer,
  type ProColumns,
  ProTable,
} from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import {
  schemaFieldList,
  schemaFieldRemove,
} from '@/services/yuan/schemaFieldController';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import {
  htmlTypeOptions,
  querySchemaOptions,
  queryTypeOptions,
} from '../utils';
import CodeGenerateModalForm from './components/CodeGenerateModalForm';
import SchemaFieldModalForm from './components/SchemaFieldModalForm';

const yesNoValueEnum = {
  '1': { text: '是', status: 'Success' },
  '0': { text: '否', status: 'Default' },
};

export default () => {
  const [searchParams] = useSearchParams();
  const schemaId = searchParams.get('schemaId');
  const [currentSchemaId, setCurrentSchemaId] = useState<string | undefined>(
    schemaId || undefined,
  );
  const actionRef = useRef<ActionType | null>(null);
  const tableRequest = useTableRequest(schemaFieldList);
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    schemaFieldRemove,
    actionRef.current?.reload,
  );

  const columns: ProColumns<API.SchemaFieldVo>[] = [
    { title: 'ID', dataIndex: 'id', ...HIDE_COLUMN },
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    {
      title: '数据模型',
      dataIndex: 'schemaId',
      valueType: 'select',
      request: querySchemaOptions,
      initialValue: schemaId || undefined,
      hideInTable: true,
      fieldProps: { showSearch: true, optionFilterProp: 'label' },
    },
    { title: '模型名称', dataIndex: 'schemaName', hideInSearch: true },
    { title: '字段名称', dataIndex: 'name' },
    { title: '字段编码', dataIndex: 'code' },
    { title: '字段类型', dataIndex: 'type', hideInSearch: true },
    { title: '字段注释', dataIndex: 'comment', hideInSearch: true },
    {
      title: '主键',
      dataIndex: 'isPk',
      valueType: 'select',
      valueEnum: yesNoValueEnum,
      hideInSearch: true,
    },
    {
      title: '必填',
      dataIndex: 'isRequired',
      valueType: 'select',
      valueEnum: yesNoValueEnum,
      hideInSearch: true,
    },
    {
      title: '列表',
      dataIndex: 'isList',
      valueType: 'select',
      valueEnum: yesNoValueEnum,
      hideInSearch: true,
    },
    {
      title: '查询',
      dataIndex: 'isQuery',
      valueType: 'select',
      valueEnum: yesNoValueEnum,
      hideInSearch: true,
    },
    {
      title: '查询方式',
      dataIndex: 'queryType',
      valueType: 'select',
      hideInSearch: true,
      fieldProps: { options: queryTypeOptions },
    },
    {
      title: '显示类型',
      dataIndex: 'htmlType',
      valueType: 'select',
      hideInSearch: true,
      fieldProps: { options: htmlTypeOptions },
    },
    { title: '排序', dataIndex: 'sort', sorter: true, hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 140,
      render: (_, record) => (
        <Space size="small">
          <SchemaFieldModalForm
            mode={OperationModes.EDIT}
            trigger={<a>编辑</a>}
            record={record}
            reload={actionRef.current?.reload}
          />
          <Popconfirm
            title="删除模型字段"
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
      <ProTable<API.SchemaFieldVo>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        request={(params, sort) => {
          const selectedSchemaId = params.schemaId || schemaId || undefined;
          if (selectedSchemaId !== currentSchemaId) {
            setCurrentSchemaId(selectedSchemaId);
          }
          return tableRequest({ ...params, schemaId: selectedSchemaId }, sort);
        }}
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 10 }}
        headerTitle="模型字段"
        columnsState={{
          persistenceKey: 'schema-field-pro-table',
          persistenceType: 'localStorage',
          defaultValue: { option: { fixed: 'right', disable: true } },
        }}
        toolBarRender={() => [
          <SchemaFieldModalForm
            key="add"
            mode={OperationModes.ADD}
            schemaId={currentSchemaId}
            reload={actionRef.current?.reload}
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增字段
              </Button>
            }
          />,
          <CodeGenerateModalForm
            key="gen"
            schemaId={currentSchemaId}
            trigger={<Button icon={<CodeOutlined />}>代码生成</Button>}
          />,
        ]}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertOptionRender={false}
        tableAlertRender={(props) => (
          <BatchDeleteAlert<API.SchemaFieldVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) => schemaFieldRemove({ ids: keys as any })}
          />
        )}
      />
    </PageContainer>
  );
};
