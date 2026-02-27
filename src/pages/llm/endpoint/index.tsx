import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Alert, Button, Modal, message, Space, Tag, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { useMemo, useRef, useState } from 'react';
import {
  defaultAuthByProvider,
  defaultPathsByProvider,
  initialEndpoints,
  initialProviders,
  now,
  prettyProviderName,
  sleep,
  uid,
} from '../mock';
import type { LlmEndpoint, ProviderType } from '../types';

const EndpointPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [providers] = useState(initialProviders);
  const [data, setData] = useState<LlmEndpoint[]>(initialEndpoints);

  const [selectedProvider, setSelectedProvider] = useState<
    ProviderType | 'ALL'
  >('ALL');

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<LlmEndpoint | null>(null);

  const [testing, setTesting] = useState<{
    open: boolean;
    ep?: LlmEndpoint;
    status?: 'running' | 'ok' | 'fail';
    detail?: string;
  }>({ open: false });

  const providerTreeData: DataNode[] = useMemo(() => {
    const children = providers.map((p) => ({
      key: p.code,
      title: (
        <Space>
          <span>{p.name}</span>
          {!p.enabled ? <Tag>停用</Tag> : null}
        </Space>
      ),
    }));
    return [{ key: 'ALL', title: '全部供应商', children }];
  }, [providers]);

  const filtered = useMemo(() => {
    if (selectedProvider === 'ALL') return data;
    return data.filter((x) => x.providerCode === selectedProvider);
  }, [data, selectedProvider]);

  const providerOptions = useMemo(
    () =>
      providers.map((p) => ({ label: `${p.name} (${p.code})`, value: p.code })),
    [providers],
  );

  const columns: ProColumns<LlmEndpoint>[] = [
    { title: '名称', dataIndex: 'name', ellipsis: true },
    {
      title: '供应商',
      dataIndex: 'providerCode',
      width: 150,
      render: (_, r) => <Tag>{prettyProviderName[r.providerCode]}</Tag>,
      valueType: 'select',
      fieldProps: { options: providerOptions },
    },
    { title: 'baseUrl', dataIndex: 'baseUrl', ellipsis: true },
    {
      title: '流式',
      dataIndex: 'streamSupported',
      width: 80,
      render: (_, r) =>
        r.streamSupported ? <Tag color="green">支持</Tag> : <Tag>否</Tag>,
    },
    {
      title: '启用',
      dataIndex: 'enabled',
      width: 80,
      render: (_, r) =>
        r.enabled ? <Tag color="green">启用</Tag> : <Tag>停用</Tag>,
    },
    { title: '更新时间', dataIndex: 'updatedAt', width: 180 },
    {
      title: '操作',
      valueType: 'option',
      width: 240,
      render: (_, r) => (
        <Space>
          <a
            onClick={() => {
              setEditing(r);
              setOpen(true);
            }}
          >
            编辑
          </a>
          <a
            onClick={async () => {
              setTesting({
                open: true,
                ep: r,
                status: 'running',
                detail: '正在发送最小请求…',
              });
              await sleep(800 + Math.random() * 600);
              const ok = Math.random() > 0.25;
              setTesting({
                open: true,
                ep: r,
                status: ok ? 'ok' : 'fail',
                detail: ok
                  ? `连接成功：耗时 ${(120 + Math.random() * 260).toFixed(0)}ms`
                  : '连接失败：401 Unauthorized（mock）',
              });
            }}
          >
            测试连接
          </a>
          <a
            onClick={() => {
              setData((prev) =>
                prev.map((x) =>
                  x.id === r.id
                    ? { ...x, enabled: !x.enabled, updatedAt: now() }
                    : x,
                ),
              );
              message.success('已更新状态');
            }}
          >
            {r.enabled ? '停用' : '启用'}
          </a>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProCard split="vertical" gutter={16} style={{ minHeight: 680 }}>
        <ProCard colSpan="260px" title="供应商" bodyStyle={{ padding: 12 }}>
          <Tree
            defaultExpandAll
            treeData={providerTreeData}
            selectedKeys={[selectedProvider]}
            onSelect={(keys) => {
              const k = (keys?.[0] as any) ?? 'ALL';
              setSelectedProvider(k);
            }}
          />
        </ProCard>

        <ProCard title="接入点（Endpoint）" bodyStyle={{ padding: 0 }}>
          <ProTable<LlmEndpoint>
            rowKey="id"
            actionRef={actionRef}
            columns={columns}
            dataSource={filtered}
            pagination={{ pageSize: 10 }}
            search={{ labelWidth: 90 }}
            toolBarRender={() => [
              <Button
                key="add"
                type="primary"
                onClick={() => {
                  setEditing(null);
                  setOpen(true);
                }}
              >
                新增接入点
              </Button>,
            ]}
          />
        </ProCard>
      </ProCard>

      <ModalForm<LlmEndpoint>
        title={editing ? '编辑接入点' : '新增接入点'}
        open={open}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpen(false),
          width: 760,
        }}
        initialValues={
          editing ?? {
            enabled: true,
            streamSupported: true,
            providerCode:
              selectedProvider !== 'ALL' ? selectedProvider : 'OPENAI',
            authHeaderName: 'Authorization',
            authHeaderPrefix: 'Bearer ',
            chatCompletionsPath: '/v1/chat/completions',
            embeddingsPath: '/v1/embeddings',
            extraHeadersJson: '',
            extraParamsJson: '',
          }
        }
        onValuesChange={(changed, all) => {
          // 新增时：选择 provider 自动带默认 path/auth
          if (!editing && changed.providerCode) {
            const pc = changed.providerCode as ProviderType;
            const paths = defaultPathsByProvider[pc];
            const auth = defaultAuthByProvider[pc];
            // 这里不直接 setFieldsValue（ModalForm 内部），用 initialValues + 用户手动也可
            // 轻量处理：提示用户（企业版可用 formRef setFieldsValue）
            message.info(`已建议默认路径/鉴权：${pc}`);
          }
        }}
        onFinish={async (values) => {
          const pc = values.providerCode as ProviderType;
          const paths = defaultPathsByProvider[pc];
          const auth = defaultAuthByProvider[pc];

          const normalized: LlmEndpoint = {
            id: editing?.id ?? uid('e'),
            providerCode: pc,
            name: values.name!,
            baseUrl: values.baseUrl!,
            apiKeyMasked: values.apiKeyMasked ?? '****',
            enabled: !!values.enabled,

            chatCompletionsPath: values.chatCompletionsPath || paths.chat,
            embeddingsPath: values.embeddingsPath || paths.emb,

            authHeaderName: values.authHeaderName || auth.name,
            authHeaderPrefix: values.authHeaderPrefix || auth.prefix,

            extraHeadersJson: values.extraHeadersJson || '',
            extraParamsJson: values.extraParamsJson || '',

            streamSupported: !!values.streamSupported,
            remark: values.remark || '',

            createdAt: editing?.createdAt ?? now(),
            updatedAt: now(),
          };

          setData((prev) => {
            if (editing)
              return prev.map((x) => (x.id === editing.id ? normalized : x));
            return [normalized, ...prev];
          });

          message.success(editing ? '已保存' : '已新增');
          setOpen(false);
          return true;
        }}
      >
        <ProFormSelect
          name="providerCode"
          label="供应商"
          options={providerOptions}
          rules={[{ required: true }]}
          disabled={!!editing}
        />
        <ProFormText
          name="name"
          label="接入点名称"
          rules={[{ required: true }]}
        />
        <ProFormText
          name="baseUrl"
          label="baseUrl"
          rules={[{ required: true }]}
          placeholder="https://api.openai.com"
        />
        <ProFormText
          name="apiKeyMasked"
          label="API Key（脱敏）"
          placeholder="sk-**** / app-****（mock）"
        />

        <ProFormSwitch name="enabled" label="启用" />
        <ProFormSwitch name="streamSupported" label="支持流式" />

        <ProCard
          title="高级配置"
          bordered
          headerBordered
          collapsible
          defaultCollapsed
        >
          <Alert
            type="info"
            showIcon
            message="用于兼容不同供应商的路径/鉴权差异（如 Ark: /api/v3/chat/completions）"
            style={{ marginBottom: 12 }}
          />
          <ProFormText
            name="chatCompletionsPath"
            label="Chat Completions Path"
            placeholder="/v1/chat/completions"
          />
          <ProFormText
            name="embeddingsPath"
            label="Embeddings Path"
            placeholder="/v1/embeddings"
          />
          <ProFormText
            name="authHeaderName"
            label="Auth Header Name"
            placeholder="Authorization"
          />
          <ProFormText
            name="authHeaderPrefix"
            label="Auth Header Prefix"
            placeholder="Bearer "
          />
          <ProFormTextArea
            name="extraHeadersJson"
            label="Extra Headers (JSON)"
            fieldProps={{ rows: 3 }}
            placeholder='{"X-Project-Id":"xxx"}'
          />
          <ProFormTextArea
            name="extraParamsJson"
            label="Extra Params (JSON)"
            fieldProps={{ rows: 3 }}
            placeholder='{"api-version":"2025-01-01"}'
          />
          <ProFormTextArea
            name="remark"
            label="备注"
            fieldProps={{ rows: 2 }}
          />
        </ProCard>
      </ModalForm>

      <Modal
        open={testing.open}
        title={`测试连接：${testing.ep?.name ?? ''}`}
        onCancel={() => setTesting({ open: false })}
        footer={[
          <Button key="close" onClick={() => setTesting({ open: false })}>
            关闭
          </Button>,
        ]}
      >
        {testing.status === 'running' ? (
          <Alert
            type="info"
            showIcon
            message="测试中…"
            description={testing.detail}
          />
        ) : testing.status === 'ok' ? (
          <Alert
            type="success"
            showIcon
            message="连接成功"
            description={testing.detail}
          />
        ) : (
          <Alert
            type="error"
            showIcon
            message="连接失败"
            description={testing.detail}
          />
        )}
      </Modal>
    </PageContainer>
  );
};

export default EndpointPage;
