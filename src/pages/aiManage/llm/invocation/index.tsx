import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Descriptions, message, Modal, Popconfirm, Space, Typography } from 'antd';
import { useRef, useState } from 'react';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import {
  llmInvocationGetInfo,
  llmInvocationList,
  llmInvocationRemove,
} from '@/services/yuan/llmInvocationController';
import { HIDE_COLUMN } from '@/util/ColumsUtils';

const invocationStatusValueEnum = {
  SUCCESS: { text: '成功', status: 'Success' },
  FAILED: { text: '失败', status: 'Error' },
};

const columnsState = {
  persistenceKey: 'ai-llm-invocation-pro-table',
  persistenceType: 'localStorage' as const,
  defaultValue: {
    option: { fixed: 'right' as const, disable: true },
  },
};

const getStatusText = (status?: string) =>
  invocationStatusValueEnum[status as keyof typeof invocationStatusValueEnum]?.text || status || '-';

const formatJson = (value?: string) => {
  if (!value) {
    return '-';
  }

  try {
    return JSON.stringify(JSON.parse(value), null, 2);
  } catch (_error) {
    return value;
  }
};

interface LlmInvocationDetailProps {
  record: API.LlmInvocationVo;
}

const LlmInvocationDetail = ({ record }: LlmInvocationDetailProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<API.LlmInvocationVo>();

  const handleOpen = async () => {
    if (!record.id) {
      return;
    }

    setOpen(true);
    setLoading(true);
    try {
      const res = await llmInvocationGetInfo({ id: record.id });
      setDetail(res.data || record);
    } catch (_error) {
      message.error('模型调用审计日志详情加载失败');
      setDetail(record);
    } finally {
      setLoading(false);
    }
  };

  const data = detail || record;

  return (
    <>
      <a onClick={() => void handleOpen()}>查看</a>
      <Modal
        title="模型调用审计日志详情"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1100}
        destroyOnClose
        confirmLoading={loading}
      >
        <Descriptions bordered size="small" column={2}>
          <Descriptions.Item label="ID">{data.id || '-'}</Descriptions.Item>
          <Descriptions.Item label="状态">{getStatusText(data.status)}</Descriptions.Item>
          <Descriptions.Item label="Trace ID">{data.traceId || '-'}</Descriptions.Item>
          <Descriptions.Item label="租户ID">{data.tenantId || '-'}</Descriptions.Item>
          <Descriptions.Item label="模型名称">{data.modelName || '-'}</Descriptions.Item>
          <Descriptions.Item label="接入点ID">{data.endpointId || '-'}</Descriptions.Item>
          <Descriptions.Item label="供应商ID">{data.providerId || '-'}</Descriptions.Item>
          <Descriptions.Item label="对话ID">{data.conversationId || '-'}</Descriptions.Item>
          <Descriptions.Item label="消息ID">{data.messageId || '-'}</Descriptions.Item>
          <Descriptions.Item label="Token In">{data.tokenIn ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="Token Out">{data.tokenOut ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="成本">{data.costAmount ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="耗时(ms)">{data.latencyMs ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data.createTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="错误信息" span={2}>
            {data.errorMsg || '-'}
          </Descriptions.Item>
        </Descriptions>

        <Typography.Title level={5} style={{ marginTop: 16 }}>
          请求内容
        </Typography.Title>
        <Typography.Paragraph>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{formatJson(data.requestJson)}</pre>
        </Typography.Paragraph>

        <Typography.Title level={5}>响应内容</Typography.Title>
        <Typography.Paragraph>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {data.responseText || formatJson(data.responseJson)}
          </pre>
        </Typography.Paragraph>

        <Typography.Title level={5}>响应 JSON</Typography.Title>
        <Typography.Paragraph>
          <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{formatJson(data.responseJson)}</pre>
        </Typography.Paragraph>
      </Modal>
    </>
  );
};

const LlmInvocationPage = () => {
  const actionRef = useRef<ActionType | null>(null);
  const access = useAccess();
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    llmInvocationRemove,
    actionRef.current?.reload,
  );
  const request = useTableRequest(llmInvocationList, {
    defaultSort: { column: 'create_time', order: 'desc' },
  });

  const columns: ProColumns<API.LlmInvocationVo>[] = [
    { title: 'ID', dataIndex: 'id', ...HIDE_COLUMN },
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    { title: 'Trace ID', dataIndex: 'traceId', width: 180, ellipsis: true },
    { title: '模型名称', dataIndex: 'modelName', width: 160 },
    { title: '接入点ID', dataIndex: 'endpointId', width: 160, ellipsis: true, hideInSearch: true },
    { title: '供应商ID', dataIndex: 'providerId', width: 160, ellipsis: true, hideInSearch: true },
    { title: '对话ID', dataIndex: 'conversationId', width: 180, ellipsis: true,hideInSearch: true },
    { title: '消息ID', dataIndex: 'messageId', width: 180, ellipsis: true,hideInSearch: true },
    { title: 'Token In', dataIndex: 'tokenIn', width: 100, hideInSearch: true },
    { title: 'Token Out', dataIndex: 'tokenOut', width: 100, hideInSearch: true },
    { title: '成本', dataIndex: 'costAmount', width: 100, hideInSearch: true },
    { title: '耗时(ms)', dataIndex: 'latencyMs', width: 100, hideInSearch: true },
    { title: '状态', dataIndex: 'status', valueEnum: invocationStatusValueEnum, width: 90 },
    { title: '错误信息', dataIndex: 'errorMsg', width: 220, ellipsis: true, hideInSearch: true },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', width: 180, hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <LlmInvocationDetail record={record} />
          <Access accessible={access.canAccess('ai:llmInvocation:remove')}>
            <Popconfirm
              title="模型调用审计日志删除"
              description={`确认删除模型调用审计日志：${record.id}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ ids: record.id ? [record.id] : [] })}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.LlmInvocationVo>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        request={request}
        scroll={{ x: 1600 }}
        columnsState={columnsState}
        rowSelection={{}}
        tableAlertRender={(props) => (
          <Access accessible={access.canAccess('ai:llmInvocation:remove')}>
            <BatchDeleteAlert<API.LlmInvocationVo>
              {...props}
              actionRef={actionRef}
              onDelete={(keys) => llmInvocationRemove({ ids: keys.map(String) })}
            />
          </Access>
        )}
        pagination={{ defaultPageSize: 10 }}
        search={{ labelWidth: 'auto' }}
        size="small"
      />
    </PageContainer>
  );
};

export default LlmInvocationPage;
