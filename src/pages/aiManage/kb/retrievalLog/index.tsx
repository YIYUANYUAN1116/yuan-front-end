import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Descriptions, message, Modal, Popconfirm, Space, Table, Typography } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useRef, useState } from 'react';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { kbBaseSelect } from '@/services/yuan/kbBaseController';
import {
  kbRetrievalLogGetInfo,
  kbRetrievalLogList,
  kbRetrievalLogRemove,
} from '@/services/yuan/kbRetrievalLogController';
import { HIDE_COLUMN } from '@/util/ColumsUtils';

type SelectOption = { label: string; value: string };

const toOptions = (data?: API.SelectModel[]): SelectOption[] =>
  (data || [])
    .filter((item) => item.value)
    .map((item) => ({
      label: item.label || item.value || '',
      value: item.value || '',
    }));

const loadKbOptions = async () => {
  const res = await kbBaseSelect();
  return toOptions(res.data);
};

const retrievalStatusValueEnum = {
  '0': { text: '成功', status: 'Success' },
  '1': { text: '失败', status: 'Error' },
  SUCCESS: { text: '成功', status: 'Success' },
  FAILED: { text: '失败', status: 'Error' },
};

const hitStatusValueEnum = {
  SUCCESS: { text: '成功', status: 'Success' },
  DISCARDED: { text: '丢弃', status: 'Default' },
};

const columnsState = {
  persistenceKey: 'ai-kb-retrieval-log-pro-table',
  persistenceType: 'localStorage' as const,
  defaultValue: {
    option: { fixed: 'right' as const, disable: true },
  },
};

const getStatusText = (status?: string) =>
  retrievalStatusValueEnum[status as keyof typeof retrievalStatusValueEnum]?.text || status || '-';

const hitColumns: ColumnsType<API.KbRetrievalHitVo> = [
  { title: '序号', dataIndex: 'rankNo', width: 70 },
  { title: '知识库ID', dataIndex: 'kbId', width: 160, ellipsis: true },
  { title: '文档ID', dataIndex: 'docId', width: 160, ellipsis: true },
  { title: '切片ID', dataIndex: 'chunkId', width: 160, ellipsis: true },
  { title: '向量分数', dataIndex: 'score', width: 100 },
  { title: '重排分数', dataIndex: 'rerankScore', width: 100 },
  {
    title: '注入Prompt',
    dataIndex: 'usedInPrompt',
    width: 100,
    render: (value) => (value === 1 ? '是' : '否'),
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 90,
    render: (value) => hitStatusValueEnum[value as keyof typeof hitStatusValueEnum]?.text || value || '-',
  },
  { title: '命中内容预览', dataIndex: 'contentPreview', ellipsis: true, width: 260 },
  { title: '完整内容', dataIndex: 'completeContent', ellipsis: true, width: 260 },
  { title: '创建时间', dataIndex: 'createTime', width: 180 },
];

interface KbRetrievalLogDetailProps {
  record: API.KbRetrievalLogVo;
}

const KbRetrievalLogDetail = ({ record }: KbRetrievalLogDetailProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState<API.KbRetrievalLogVo>();

  const handleOpen = async () => {
    if (!record.logId) {
      return;
    }

    setOpen(true);
    setLoading(true);
    try {
      const res = await kbRetrievalLogGetInfo({ logId: record.logId });
      setDetail(res.data || record);
    } catch (_error) {
      message.error('检索日志详情加载失败');
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
        title="检索日志详情"
        open={open}
        onCancel={() => setOpen(false)}
        footer={null}
        width={1100}
        destroyOnClose
      >
        <Descriptions bordered size="small" column={2}>
          <Descriptions.Item label="日志ID">{data.logId || '-'}</Descriptions.Item>
          <Descriptions.Item label="状态">{getStatusText(data.status)}</Descriptions.Item>
          <Descriptions.Item label="知识库ID">{data.kbId || '-'}</Descriptions.Item>
          <Descriptions.Item label="知识库ID列表">{data.kbIds || '-'}</Descriptions.Item>
          <Descriptions.Item label="对话ID">{data.conversationId || '-'}</Descriptions.Item>
          <Descriptions.Item label="用户消息ID">{data.messageId || '-'}</Descriptions.Item>
          <Descriptions.Item label="模型调用记录ID">{data.invocationId || '-'}</Descriptions.Item>
          <Descriptions.Item label="向量模型ID">{data.embeddingModelId || '-'}</Descriptions.Item>
          <Descriptions.Item label="召回数量">{data.topK ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="最低相似度分数">{data.minScore ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="命中数量">{data.hitCount ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="注入上下文数量">{data.usedCount ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="检索耗时(ms)">{data.latencyMs ?? '-'}</Descriptions.Item>
          <Descriptions.Item label="创建时间">{data.createTime || '-'}</Descriptions.Item>
          <Descriptions.Item label="原始问题" span={2}>
            {data.queryText || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="改写后的检索问题" span={2}>
            {data.rewriteQuery || '-'}
          </Descriptions.Item>
          <Descriptions.Item label="错误信息" span={2}>
            {data.errorMessage || '-'}
          </Descriptions.Item>
        </Descriptions>

        <Typography.Title level={5} style={{ marginTop: 16 }}>
          命中条目
        </Typography.Title>
        <Table<API.KbRetrievalHitVo>
          rowKey={(item, index) => item.hitId || item.chunkId || `${data.logId}_${index}`}
          loading={loading}
          columns={hitColumns}
          dataSource={data.hitVoList || []}
          pagination={false}
          size="small"
          scroll={{ x: 1600 }}
        />
      </Modal>
    </>
  );
};

const KbRetrievalLogPage = () => {
  const actionRef = useRef<ActionType | null>(null);
  const access = useAccess();
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    kbRetrievalLogRemove,
    actionRef.current?.reload,
  );
  const request = useTableRequest(kbRetrievalLogList, {
    defaultSort: { column: 'create_time', order: 'desc' },
  });

  const columns: ProColumns<API.KbRetrievalLogVo>[] = [
    { title: 'ID', dataIndex: 'logId', ...HIDE_COLUMN },
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    {
      title: '知识库',
      dataIndex: 'kbId',
      valueType: 'select',
      request: loadKbOptions,
      width: 180,
    },
    { title: '知识库ID列表', dataIndex: 'kbIds', width: 180, ellipsis: true, hideInSearch: true },
    { title: '对话ID', dataIndex: 'conversationId', width: 180, ellipsis: true },
    { title: '用户消息ID', dataIndex: 'messageId', width: 180, ellipsis: true },
    { title: '模型调用记录ID', dataIndex: 'invocationId', width: 180, ellipsis: true },
    { title: '原始问题', dataIndex: 'queryText', width: 240, ellipsis: true },
    { title: '改写后的检索问题', dataIndex: 'rewriteQuery', width: 240, ellipsis: true, hideInSearch: true },
    { title: '向量模型ID', dataIndex: 'embeddingModelId', width: 180, ellipsis: true, hideInSearch: true },
    { title: '召回数量', dataIndex: 'topK', width: 100, hideInSearch: true },
    { title: '最低分数', dataIndex: 'minScore', width: 100, hideInSearch: true },
    { title: '命中数量', dataIndex: 'hitCount', width: 100, hideInSearch: true },
    { title: '注入数量', dataIndex: 'usedCount', width: 100, hideInSearch: true },
    { title: '耗时(ms)', dataIndex: 'latencyMs', width: 100, hideInSearch: true },
    { title: '状态', dataIndex: 'status', valueEnum: retrievalStatusValueEnum, width: 90 },
    { title: '错误信息', dataIndex: 'errorMessage', width: 220, ellipsis: true, hideInSearch: true },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', width: 180, hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <KbRetrievalLogDetail record={record} />
          <Access accessible={access.canAccess('ai:kbRetrievalLog:remove')}>
            <Popconfirm
              title="检索日志删除"
              description={`确认删除检索日志：${record.logId}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ logIds: record.logId ? [record.logId] : [] })}
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
      <ProTable<API.KbRetrievalLogVo>
        rowKey="logId"
        actionRef={actionRef}
        columns={columns}
        request={request}
        scroll={{ x: 1800 }}
        columnsState={columnsState}
        rowSelection={{}}
        tableAlertRender={(props) => (
          <Access accessible={access.canAccess('ai:kbRetrievalLog:remove')}>
            <BatchDeleteAlert<API.KbRetrievalLogVo>
              {...props}
              actionRef={actionRef}
              onDelete={(keys) => kbRetrievalLogRemove({ logIds: keys.map(String) })}
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

export default KbRetrievalLogPage;
