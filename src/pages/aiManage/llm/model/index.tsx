import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, Popconfirm, Space, Table } from 'antd';
import { useRef } from 'react';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { DictEnum } from '@/const/dict-enum';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { llmModelList, llmModelRemove } from '@/services/yuan/llmModelController';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { LlmModelDrawerForm } from './components/LlmModelDrawerForm';
import { useDictDataTagMap } from '@/hooks/dict/useDictDataTagMap';

const LlmModelPage = () => {
  const actionRef = useRef<ActionType | null>(null);
  const access = useAccess();
  const statusEnum = useDictDataValueEnum(DictEnum.SYS_NORMAL_DISABLE);

  const modelTypetagMap = useDictDataTagMap(DictEnum.AI_MODEL_TYPE)
  const modelTypeEnum = useDictDataValueEnum(DictEnum.AI_MODEL_TYPE);
  const modelType = (value: string | number) => {
        const tag = modelTypetagMap[String(value)];
        return tag?.render?.() ?? value;
  };
    
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    llmModelRemove,
    actionRef.current?.reload,
  );

  const columns: ProColumns<API.LlmModelVo>[] = [
    {
      title: 'Id',
      dataIndex: 'id',
      ...HIDE_COLUMN,
    },
    {
      title: '序号',
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '显示名称',
      dataIndex: 'displayName',
      width: 150,
    },
    {
      title: '模型名称',
      dataIndex: 'modelName',
      copyable: true,
      width: 150,
    },
    {
      title: '模型类型',
      dataIndex: 'modelType',
      valueEnum: modelTypeEnum,
      width: 120,
      render: (_, record) => modelType(record.modelType || ''),
    },
    {
      title: '供应商',
      dataIndex: 'providerId',
      ...HIDE_COLUMN,
    },
    {
      title: '供应商',
      dataIndex: 'providerName',
      width: 150,
      hideInSearch: true,
    },
    {
      title: '接入点',
      dataIndex: 'endpointName',
      width: 150,
      hideInSearch: true,
    },
    {
      title: '接入点',
      dataIndex: 'endpointId',
      ...HIDE_COLUMN,
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      valueEnum: statusEnum,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      width: 180,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      width: 180,
      valueType: 'dateTime',
      hideInSearch: true,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      hideInSearch: true,
      render: (_, record) => (
        <Space size="small">
          <Access key="edit" accessible={access.canAccess('ai:llmModel:list') || false}>
            <LlmModelDrawerForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <Access key="remove" accessible={access.canAccess('ai:llmModel:remove')}>
            <Popconfirm
              title="模型删除"
              description={`确认删除模型：${record.modelName}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ ids: [record.id] })}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  const request = useTableRequest(llmModelList);

  return (
    <PageContainer>
      <ProTable<API.LlmModelVo>
        columns={columns}
        actionRef={actionRef}
        request={request}
        columnsState={{
          persistenceKey: 'llm-model-pro-table',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        rowKey="id"
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 10 }}
        headerTitle="模型管理"
        toolBarRender={() => [
          <Access key="add" accessible={access.canAccess('ai:llmModel:add')}>
            <LlmModelDrawerForm
              mode="add"
              trigger={
                <Button type="primary" icon={<PlusOutlined />}>
                  新增模型
                </Button>
              }
              reload={actionRef.current?.reload}
            />
          </Access>,
        ]}
        rowSelection={{
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertOptionRender={false}
        tableAlertRender={(props) => (
          <Access key="remove" accessible={access.canAccess('ai:llmModel:remove')}>
            <BatchDeleteAlert<API.LlmModelVo>
              {...props}
              actionRef={actionRef}
              onDelete={(keys) => llmModelRemove({ ids: keys as string[] })}
            />
          </Access>
        )}
      />
    </PageContainer>
  );
};

export default LlmModelPage;
