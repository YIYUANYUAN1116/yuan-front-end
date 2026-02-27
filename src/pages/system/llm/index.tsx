import { PlusOutlined } from '@ant-design/icons';
import {
  ModalForm,
  ProCard,
  ProFormSelect,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Popconfirm, Space, Tag } from 'antd';
import { useMemo, useState } from 'react';

type LlmProvider = {
  id: string;
  code: string;
  name: string;
  status: 'enabled' | 'disabled';
  remark?: string;
};

type LlmEndpoint = {
  id: string;
  providerId: string;
  name: string;
  baseUrl: string;
  path: string;
  apiKeyMask: string;
  timeoutMs: number;
  status: 'enabled' | 'disabled';
};

type LlmModel = {
  id: string;
  endpointId: string;
  providerId: string;
  code: string;
  displayName: string;
  maxTokens: number;
  status: 'enabled' | 'disabled';
};

const statusColorMap = {
  enabled: 'success',
  disabled: 'default',
} as const;

const statusTextMap = {
  enabled: '启用',
  disabled: '停用',
} as const;

const initialProviders: LlmProvider[] = [
  {
    id: 'p-openai',
    code: 'openai',
    name: 'OpenAI',
    status: 'enabled',
    remark: '主力供应商',
  },
  {
    id: 'p-gemini',
    code: 'gemini',
    name: 'Google Gemini',
    status: 'enabled',
    remark: '多模态能力较好',
  },
  {
    id: 'p-dify',
    code: 'dify',
    name: 'Dify',
    status: 'disabled',
    remark: '自建聚合网关',
  },
];

const initialEndpoints: LlmEndpoint[] = [
  {
    id: 'e-openai-default',
    providerId: 'p-openai',
    name: 'OpenAI-生产',
    baseUrl: 'https://api.openai.com',
    path: '/v1/chat/completions',
    apiKeyMask: 'sk-***prod',
    timeoutMs: 60000,
    status: 'enabled',
  },
  {
    id: 'e-gemini-default',
    providerId: 'p-gemini',
    name: 'Gemini-生产',
    baseUrl: 'https://generativelanguage.googleapis.com',
    path: '/v1beta/models',
    apiKeyMask: 'AIza***prod',
    timeoutMs: 60000,
    status: 'enabled',
  },
];

const initialModels: LlmModel[] = [
  {
    id: 'm-gpt-4o',
    endpointId: 'e-openai-default',
    providerId: 'p-openai',
    code: 'gpt-4o',
    displayName: 'GPT-4o',
    maxTokens: 8192,
    status: 'enabled',
  },
  {
    id: 'm-gpt-4.1-mini',
    endpointId: 'e-openai-default',
    providerId: 'p-openai',
    code: 'gpt-4.1-mini',
    displayName: 'GPT-4.1 Mini',
    maxTokens: 32768,
    status: 'enabled',
  },
  {
    id: 'm-gemini-2.0-flash',
    endpointId: 'e-gemini-default',
    providerId: 'p-gemini',
    code: 'gemini-2.0-flash',
    displayName: 'Gemini 2.0 Flash',
    maxTokens: 8192,
    status: 'enabled',
  },
];

export default () => {
  const [providers, setProviders] = useState<LlmProvider[]>(initialProviders);
  const [endpoints, setEndpoints] = useState<LlmEndpoint[]>(initialEndpoints);
  const [models, setModels] = useState<LlmModel[]>(initialModels);
  const [selectedProviderId, setSelectedProviderId] =
    useState<string>('p-openai');
  const [selectedEndpointId, setSelectedEndpointId] =
    useState<string>('e-openai-default');

  const filteredEndpoints = useMemo(
    () =>
      endpoints.filter(
        (endpoint) => endpoint.providerId === selectedProviderId,
      ),
    [endpoints, selectedProviderId],
  );

  const endpointOptions = useMemo(
    () =>
      filteredEndpoints.map((endpoint) => ({
        label: endpoint.name,
        value: endpoint.id,
      })),
    [filteredEndpoints],
  );

  const filteredModels = useMemo(
    () =>
      models.filter(
        (model) =>
          model.providerId === selectedProviderId &&
          (!selectedEndpointId || model.endpointId === selectedEndpointId),
      ),
    [models, selectedProviderId, selectedEndpointId],
  );

  return (
    <PageContainer
      title="LLM 资源维护"
      subTitle="管理供应商、接入点与模型的 1:N:N 关系"
      extra={[
        <Tag key="p">供应商：{providers.length}</Tag>,
        <Tag key="e" color="processing">
          接入点：{filteredEndpoints.length}
        </Tag>,
        <Tag key="m" color="purple">
          模型：{filteredModels.length}
        </Tag>,
      ]}
    >
      <Space direction="vertical" size={16} style={{ width: '100%' }}>
        <ProCard title="1) LLM 供应商（llm_provider）" bordered>
          <ProTable<LlmProvider>
            rowKey="id"
            search={false}
            options={false}
            pagination={false}
            dataSource={providers}
            onRow={(record) => ({
              onClick: () => {
                setSelectedProviderId(record.id);
                const firstEndpoint = endpoints.find(
                  (endpoint) => endpoint.providerId === record.id,
                );
                setSelectedEndpointId(firstEndpoint?.id || '');
              },
            })}
            rowClassName={(record) =>
              record.id === selectedProviderId ? 'ant-table-row-selected' : ''
            }
            columns={[
              { title: '供应商编码', dataIndex: 'code' },
              { title: '供应商名称', dataIndex: 'name' },
              {
                title: '状态',
                dataIndex: 'status',
                render: (_, record) => (
                  <Tag color={statusColorMap[record.status]}>
                    {statusTextMap[record.status]}
                  </Tag>
                ),
              },
              { title: '备注', dataIndex: 'remark' },
              {
                title: '操作',
                valueType: 'option',
                render: (_, record) => [
                  <a
                    key="toggle"
                    onClick={() => {
                      setProviders((prev) =>
                        prev.map((item) =>
                          item.id === record.id
                            ? {
                                ...item,
                                status:
                                  item.status === 'enabled'
                                    ? 'disabled'
                                    : 'enabled',
                              }
                            : item,
                        ),
                      );
                    }}
                  >
                    {record.status === 'enabled' ? '停用' : '启用'}
                  </a>,
                  <Popconfirm
                    key="delete"
                    title="确认删除该供应商？"
                    onConfirm={() => {
                      setProviders((prev) =>
                        prev.filter((item) => item.id !== record.id),
                      );
                      setEndpoints((prev) =>
                        prev.filter((item) => item.providerId !== record.id),
                      );
                      setModels((prev) =>
                        prev.filter((item) => item.providerId !== record.id),
                      );
                    }}
                  >
                    <a style={{ color: 'red' }}>删除</a>
                  </Popconfirm>,
                ],
              },
            ]}
            toolBarRender={() => [
              <ModalForm<{ code: string; name: string; remark?: string }>
                key="createProvider"
                title="新增供应商"
                trigger={
                  <Button type="primary" icon={<PlusOutlined />}>
                    新增供应商
                  </Button>
                }
                onFinish={async (values) => {
                  setProviders((prev) => [
                    ...prev,
                    {
                      id: `p-${values.code}`,
                      code: values.code,
                      name: values.name,
                      remark: values.remark,
                      status: 'enabled',
                    },
                  ]);
                  return true;
                }}
              >
                <ProFormText
                  name="code"
                  label="编码"
                  rules={[{ required: true }]}
                />
                <ProFormText
                  name="name"
                  label="名称"
                  rules={[{ required: true }]}
                />
                <ProFormText name="remark" label="备注" />
              </ModalForm>,
            ]}
          />
        </ProCard>

        <ProCard title="2) 接入点（llm_endpoint）" bordered>
          <ProTable<LlmEndpoint>
            rowKey="id"
            search={false}
            options={false}
            pagination={false}
            dataSource={filteredEndpoints}
            onRow={(record) => ({
              onClick: () => setSelectedEndpointId(record.id),
            })}
            rowClassName={(record) =>
              record.id === selectedEndpointId ? 'ant-table-row-selected' : ''
            }
            columns={[
              { title: '名称', dataIndex: 'name' },
              { title: 'Base URL', dataIndex: 'baseUrl' },
              { title: 'Path', dataIndex: 'path' },
              { title: 'API Key', dataIndex: 'apiKeyMask' },
              { title: '超时(ms)', dataIndex: 'timeoutMs' },
              {
                title: '状态',
                dataIndex: 'status',
                render: (_, record) => (
                  <Tag color={statusColorMap[record.status]}>
                    {statusTextMap[record.status]}
                  </Tag>
                ),
              },
            ]}
            toolBarRender={() => [
              <ModalForm<
                Omit<LlmEndpoint, 'id' | 'providerId' | 'apiKeyMask' | 'status'>
              >
                key="createEndpoint"
                title="新增接入点"
                trigger={<Button icon={<PlusOutlined />}>新增接入点</Button>}
                onFinish={async (values) => {
                  setEndpoints((prev) => [
                    ...prev,
                    {
                      id: `e-${Date.now()}`,
                      providerId: selectedProviderId,
                      name: values.name,
                      baseUrl: values.baseUrl,
                      path: values.path,
                      timeoutMs: values.timeoutMs,
                      apiKeyMask: '******',
                      status: 'enabled',
                    },
                  ]);
                  return true;
                }}
              >
                <ProFormText
                  name="name"
                  label="接入点名称"
                  rules={[{ required: true }]}
                />
                <ProFormText
                  name="baseUrl"
                  label="Base URL"
                  rules={[{ required: true }]}
                />
                <ProFormText
                  name="path"
                  label="请求路径"
                  rules={[{ required: true }]}
                />
                <ProFormText
                  name="timeoutMs"
                  label="超时(ms)"
                  rules={[{ required: true }]}
                  initialValue="60000"
                />
              </ModalForm>,
            ]}
          />
        </ProCard>

        <ProCard title="3) 模型（llm_model）" bordered>
          <ProTable<LlmModel>
            rowKey="id"
            search={false}
            options={false}
            pagination={{ pageSize: 5 }}
            dataSource={filteredModels}
            columns={[
              { title: '模型编码', dataIndex: 'code' },
              { title: '展示名称', dataIndex: 'displayName' },
              {
                title: '归属接入点',
                dataIndex: 'endpointId',
                render: (_, record) =>
                  endpoints.find(
                    (endpoint) => endpoint.id === record.endpointId,
                  )?.name || '-',
              },
              { title: '最大上下文', dataIndex: 'maxTokens' },
              {
                title: '状态',
                dataIndex: 'status',
                render: (_, record) => (
                  <Tag color={statusColorMap[record.status]}>
                    {statusTextMap[record.status]}
                  </Tag>
                ),
              },
            ]}
            toolBarRender={() => [
              <ModalForm<{
                code: string;
                displayName: string;
                endpointId: string;
                maxTokens: string;
              }>
                key="createModel"
                title="新增模型"
                trigger={<Button icon={<PlusOutlined />}>新增模型</Button>}
                onFinish={async (values) => {
                  setModels((prev) => [
                    ...prev,
                    {
                      id: `m-${values.code}-${Date.now()}`,
                      providerId: selectedProviderId,
                      endpointId: values.endpointId,
                      code: values.code,
                      displayName: values.displayName,
                      maxTokens: Number(values.maxTokens),
                      status: 'enabled',
                    },
                  ]);
                  return true;
                }}
              >
                <ProFormText
                  name="code"
                  label="模型编码"
                  rules={[{ required: true }]}
                />
                <ProFormText
                  name="displayName"
                  label="展示名称"
                  rules={[{ required: true }]}
                />
                <ProFormSelect
                  name="endpointId"
                  label="接入点"
                  options={endpointOptions}
                  rules={[{ required: true }]}
                />
                <ProFormText
                  name="maxTokens"
                  label="最大上下文"
                  rules={[{ required: true }]}
                  initialValue="8192"
                />
              </ModalForm>,
            ]}
          />
        </ProCard>
      </Space>
    </PageContainer>
  );
};
