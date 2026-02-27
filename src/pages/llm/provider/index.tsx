import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Button, message, Space, Tag } from 'antd';
import React, { useMemo, useRef, useState } from 'react';
import { initialProviders, now, uid } from '../mock';
import type { LlmProvider, ProviderType } from '../types';

const ProviderPage: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [data, setData] = useState<LlmProvider[]>(initialProviders);
  const [editing, setEditing] = useState<LlmProvider | null>(null);
  const [open, setOpen] = useState(false);

  const providerOptions = useMemo(
    () =>
      (
        [
          'OPENAI',
          'OPENAI_COMPAT',
          'GEMINI',
          'QWEN',
          'OLLAMA',
          'DIFY',
        ] as ProviderType[]
      ).map((v) => ({
        label: v,
        value: v,
      })),
    [],
  );

  const columns: ProColumns<LlmProvider>[] = [
    {
      title: '编码',
      dataIndex: 'code',
      width: 140,
      render: (_, r) => <Tag>{r.code}</Tag>,
    },
    { title: '名称', dataIndex: 'name', ellipsis: true },
    {
      title: '类型',
      dataIndex: 'category',
      width: 160,
      valueType: 'select',
      valueEnum: {
        'OpenAI-Compatible': 'OpenAI-Compatible',
        Native: 'Native',
        Workflow: 'Workflow',
      },
    },
    {
      title: '启用',
      dataIndex: 'enabled',
      width: 90,
      render: (_, r) =>
        r.enabled ? <Tag color="green">启用</Tag> : <Tag>停用</Tag>,
      filters: true,
      onFilter: (v, r) => r.enabled === (v === 'true'),
      filterMultiple: false,
      valueEnum: { true: { text: '启用' }, false: { text: '停用' } },
    },
    { title: '备注', dataIndex: 'remark', ellipsis: true },
    { title: '创建时间', dataIndex: 'createdAt', width: 180 },
    {
      title: '操作',
      valueType: 'option',
      width: 160,
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
              setData((prev) =>
                prev.map((x) =>
                  x.id === r.id ? { ...x, enabled: !x.enabled } : x,
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
      <ProTable<LlmProvider>
        rowKey="id"
        actionRef={actionRef}
        search={{ labelWidth: 90 }}
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 10 }}
        toolBarRender={() => [
          <Button
            key="add"
            type="primary"
            onClick={() => {
              setEditing(null);
              setOpen(true);
            }}
          >
            新增供应商
          </Button>,
        ]}
      />

      <ModalForm<LlmProvider>
        title={editing ? '编辑供应商' : '新增供应商'}
        open={open}
        modalProps={{ destroyOnClose: true, onCancel: () => setOpen(false) }}
        initialValues={
          editing ?? { enabled: true, category: 'OpenAI-Compatible' }
        }
        onFinish={async (values) => {
          if (!values.code || !values.name) return false;

          if (editing) {
            setData((prev) =>
              prev.map((x) =>
                x.id === editing.id
                  ? { ...x, ...values, createdAt: x.createdAt }
                  : x,
              ),
            );
            message.success('已保存');
          } else {
            const item: LlmProvider = {
              id: uid('p'),
              code: values.code as ProviderType,
              name: values.name,
              category: values.category!,
              enabled: !!values.enabled,
              remark: values.remark,
              createdAt: now(),
            };
            setData((prev) => [item, ...prev]);
            message.success('已新增');
          }
          setOpen(false);
          return true;
        }}
      >
        <ProFormSelect
          name="code"
          label="供应商编码"
          options={providerOptions}
          rules={[{ required: true }]}
          disabled={!!editing}
        />
        <ProFormText
          name="name"
          label="供应商名称"
          rules={[{ required: true }]}
        />
        <ProFormSelect
          name="category"
          label="类型"
          rules={[{ required: true }]}
          options={[
            { label: 'OpenAI-Compatible', value: 'OpenAI-Compatible' },
            { label: 'Native', value: 'Native' },
            { label: 'Workflow', value: 'Workflow' },
          ]}
        />
        <ProFormSwitch name="enabled" label="启用" />
        <ProFormTextArea name="remark" label="备注" fieldProps={{ rows: 3 }} />
      </ModalForm>
    </PageContainer>
  );
};

export default ProviderPage;
