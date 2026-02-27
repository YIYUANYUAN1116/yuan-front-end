import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProCard,
  ProFormDigit,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Space, Tag, Tree } from 'antd';
import type { DataNode } from 'antd/es/tree';
import React, { useMemo, useRef, useState } from 'react';
import {
  initialEndpoints,
  initialModels,
  now,
  prettyProviderName,
  uid,
} from '../mock';
import type { LlmEndpoint, LlmModel } from '../types';

const ModelPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [endpoints] = useState<LlmEndpoint[]>(initialEndpoints);
  const [data, setData] = useState<LlmModel[]>(initialModels);

  const [selectedEndpointId, setSelectedEndpointId] = useState<string>('ALL');

  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<LlmModel | null>(null);

  const endpointTreeData: DataNode[] = useMemo(() => {
    const byProvider = endpoints.reduce<Record<string, LlmEndpoint[]>>(
      (acc, ep) => {
        acc[ep.providerCode] = acc[ep.providerCode] ?? [];
        acc[ep.providerCode].push(ep);
        return acc;
      },
      {},
    );

    const children: DataNode[] = Object.keys(byProvider).map((pc) => ({
      key: pc,
      title: <Tag>{prettyProviderName[pc as any] ?? pc}</Tag>,
      children: byProvider[pc].map((ep) => ({
        key: ep.id,
        title: (
          <Space>
            <span>{ep.name}</span>
            {!ep.enabled ? <Tag>停用</Tag> : null}
          </Space>
        ),
      })),
    }));

    return [{ key: 'ALL', title: '全部接入点', children }];
  }, [endpoints]);

  const filtered = useMemo(() => {
    if (selectedEndpointId === 'ALL') return data;
    return data.filter((m) => m.endpointId === selectedEndpointId);
  }, [data, selectedEndpointId]);

  const endpointOptions = useMemo(
    () =>
      endpoints.map((ep) => ({
        label: `${ep.name} (${prettyProviderName[ep.providerCode]})`,
        value: ep.id,
      })),
    [endpoints],
  );

  const columns: ProColumns<LlmModel>[] = [
    { title: '显示名称', dataIndex: 'displayName', ellipsis: true },
    { title: '模型名', dataIndex: 'modelName', copyable: true, ellipsis: true },
    {
      title: '接入点',
      dataIndex: 'endpointId',
      width: 200,
      render: (_, r) => {
        const ep = endpoints.find((x) => x.id === r.endpointId);
        return ep ? <Tag>{ep.name}</Tag> : <Tag>Unknown</Tag>;
      },
    },
    {
      title: '工具',
      dataIndex: 'toolSupported',
      width: 80,
      render: (_, r) =>
        r.toolSupported ? <Tag color="blue">支持</Tag> : <Tag>否</Tag>,
    },
    {
      title: '流式',
      dataIndex: 'streamSupported',
      width: 80,
      render: (_, r) =>
        r.streamSupported ? <Tag color="green">支持</Tag> : <Tag>否</Tag>,
    },
    {
      title: '默认',
      dataIndex: 'isDefault',
      width: 80,
      render: (_, r) =>
        r.isDefault ? <Tag color="gold">默认</Tag> : <Tag>—</Tag>,
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
      width: 260,
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
            onClick={() => {
              // 同 endpoint 下只允许一个默认
              setData((prev) =>
                prev.map((x) => {
                  if (x.endpointId !== r.endpointId) return x;
                  if (x.id === r.id)
                    return { ...x, isDefault: true, updatedAt: now() };
                  return { ...x, isDefault: false, updatedAt: now() };
                }),
              );
              message.success('已设为默认模型');
            }}
          >
            设为默认
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
        <ProCard colSpan="300px" title="接入点" bodyStyle={{ padding: 12 }}>
          <Tree
            defaultExpandAll
            treeData={endpointTreeData}
            selectedKeys={[selectedEndpointId]}
            onSelect={(keys) => {
              const k = (keys?.[0] as any) ?? 'ALL';
              // provider 节点 key 是 providerCode，点击它时不做过滤（企业版可加二级过滤）
              if (k === 'ALL' || endpoints.some((e) => e.id === k))
                setSelectedEndpointId(k);
            }}
          />
        </ProCard>

        <ProCard title="模型（Model）" bodyStyle={{ padding: 0 }}>
          <ProTable<LlmModel>
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
                新增模型
              </Button>,
            ]}
          />
        </ProCard>
      </ProCard>

      <ModalForm<LlmModel>
        title={editing ? '编辑模型' : '新增模型'}
        open={open}
        modalProps={{
          destroyOnClose: true,
          onCancel: () => setOpen(false),
          width: 720,
        }}
        initialValues={
          editing ?? {
            endpointId:
              selectedEndpointId !== 'ALL'
                ? selectedEndpointId
                : endpoints[0]?.id,
            enabled: true,
            streamSupported: true,
            toolSupported: false,
            temperature: 0.7,
            maxTokens: 2048,
            isDefault: false,
          }
        }
        onFinish={async (values) => {
          const endpointId = values.endpointId!;
          const ep = endpoints.find((x) => x.id === endpointId);
          if (!ep) {
            message.error('请选择有效的接入点');
            return false;
          }

          const normalized: LlmModel = {
            id: editing?.id ?? uid('m'),
            endpointId,
            providerCode: ep.providerCode,

            modelName: values.modelName!,
            displayName: values.displayName ?? values.modelName!,
            enabled: !!values.enabled,

            streamSupported: !!values.streamSupported,
            toolSupported: !!values.toolSupported,

            temperature: Number(values.temperature ?? 0.7),
            maxTokens: Number(values.maxTokens ?? 2048),

            isDefault: !!values.isDefault,

            createdAt: editing?.createdAt ?? now(),
            updatedAt: now(),
          };

          setData((prev) => {
            let next = prev;

            // 若设为默认：同 endpoint 下其他默认清掉
            if (normalized.isDefault) {
              next = next.map((x) =>
                x.endpointId === endpointId ? { ...x, isDefault: false } : x,
              );
            }

            if (editing)
              next = next.map((x) => (x.id === editing.id ? normalized : x));
            else next = [normalized, ...next];

            return next;
          });

          message.success(editing ? '已保存' : '已新增');
          setOpen(false);
          return true;
        }}
      >
        <ProFormSelect
          name="endpointId"
          label="接入点"
          options={endpointOptions}
          rules={[{ required: true }]}
        />
        <ProFormText
          name="modelName"
          label="模型名（调用）"
          rules={[{ required: true }]}
          placeholder="gpt-4o-mini / deepseek-v3..."
        />
        <ProFormText
          name="displayName"
          label="显示名称"
          placeholder="前端展示用"
        />
        <ProFormDigit
          name="temperature"
          label="temperature"
          min={0}
          max={2}
          fieldProps={{ step: 0.1 }}
        />
        <ProFormDigit
          name="maxTokens"
          label="max_tokens"
          min={1}
          max={200000}
        />
        <ProFormSwitch name="streamSupported" label="支持流式" />
        <ProFormSwitch name="toolSupported" label="支持工具调用" />
        <ProFormSwitch name="isDefault" label="设为默认" />
        <ProFormSwitch name="enabled" label="启用" />
      </ModalForm>
    </PageContainer>
  );
};

export default ModelPage;
