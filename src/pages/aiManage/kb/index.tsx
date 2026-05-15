import { PlusOutlined, UploadOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import {
  ModalForm,
  PageContainer,
  ProForm,
  ProFormDependency,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProTable,
} from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, message, Popconfirm, Space, Table, Tabs, Upload } from 'antd';
import type { UploadFile } from 'antd';
import { useRef, useState } from 'react';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import {
  kbBaseAdd,
  kbBaseEdit,
  kbBaseList,
  kbBaseRebuildIndex,
  kbBaseRemove,
  kbBaseSelect,
} from '@/services/yuan/kbBaseController';
import {
  kbBaseAuthAdd,
  kbBaseAuthEdit,
  kbBaseAuthList,
  kbBaseAuthRemove,
} from '@/services/yuan/kbBaseAuthController';
import {
  kbChunkAdd,
  kbChunkEdit,
  kbChunkList,
  kbChunkRemove,
} from '@/services/yuan/kbChunkController';
import {
  kbDocumentEdit,
  kbDocumentList,
  kbDocumentRebuildIndex,
  kbDocumentRemove,
  kbDocumentSelect,
  kbDocumentUpload,
} from '@/services/yuan/kbDocumentController';
import { selectEmbeddingModel } from '@/services/yuan/llmModelController';
import { HIDE_COLUMN } from '@/util/ColumsUtils';

type Reload = ActionType['reload'];
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

const loadDocumentOptions = async (kbId?: string) => {
  if (!kbId) return [];
  const res = await kbDocumentSelect({ kbId });
  return toOptions(res.data);
};

const loadEmbeddingModelOptions = async () => {
  const res = await selectEmbeddingModel();
  return toOptions(res.data);
};

const enabledStatusValueEnum = {
  '0': { text: '启用', status: 'Success' },
  '1': { text: '禁用', status: 'Default' },
};

const visibilityValueEnum = {
  PRIVATE: { text: '私有' },
  TEAM: { text: '团队' },
  TENANT: { text: '租户' },
  PUBLIC: { text: '公开' },
};

const sourceTypeValueEnum = {
  UPLOAD: { text: '上传' },
  URL: { text: '网页' },
  MANUAL: { text: '手工录入' },
  API: { text: '接口导入' },
};

const processStatusValueEnum = {
  PENDING: { text: '待处理', status: 'Default' },
  PARSING: { text: '解析中', status: 'Processing' },
  EMBEDDING: { text: '向量化中', status: 'Processing' },
  SUCCESS: { text: '成功', status: 'Success' },
  FAILED: { text: '失败', status: 'Error' },
};

const subjectTypeValueEnum = {
  USER: { text: '用户' },
  ROLE: { text: '角色' },
  DEPT: { text: '部门' },
  TENANT: { text: '租户' },
};

const permissionValueEnum = {
  READ: { text: '读取' },
  WRITE: { text: '编辑' },
  MANAGE: { text: '管理' },
};

const commonColumnsState = {
  persistenceType: 'localStorage' as const,
  defaultValue: {
    option: { fixed: 'right' as const, disable: true },
  },
};

interface KbBaseFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: Reload;
  record?: API.KbBaseVo;
}

const KbBaseModalForm = ({ mode, trigger, reload, record }: KbBaseFormProps) => {
  const isEdit = mode === OperationModes.EDIT;
  const { run, loading } = useActionRequest(isEdit ? kbBaseEdit : kbBaseAdd, reload);

  return (
    <ModalForm<API.KbBaseBo>
      title={isEdit ? '编辑知识库' : '新增知识库'}
      trigger={trigger}
      initialValues={{
        visibility: 'PRIVATE',
        status: '0',
        chunkSize: 1000,
        chunkOverlap: 100,
        ...record,
      }}
      modalProps={{ okButtonProps: { loading } }}
      width={720}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
    >
      <ProFormText name="kbId" hidden />
      <ProFormText
        name="kbCode"
        label="知识库编码"
        placeholder="请输入知识库编码"
        rules={[{ required: true, message: '请输入知识库编码' }]}
      />
      <ProFormText
        name="kbName"
        label="知识库名称"
        placeholder="请输入知识库名称"
        rules={[{ required: true, message: '请输入知识库名称' }]}
      />
      <ProFormTextArea name="description" label="知识库描述" placeholder="请输入知识库描述" />
      <ProFormSelect
        name="visibility"
        label="可见范围"
        valueEnum={visibilityValueEnum}
        rules={[{ required: true, message: '请选择可见范围' }]}
      />
      <ProFormText name="ownerId" label="负责人ID" placeholder="请输入负责人ID" />
      <ProFormSelect
        name="embeddingModelId"
        label="向量模型"
        placeholder="请选择向量模型"
        request={loadEmbeddingModelOptions}
      />
      <ProFormText name="chunkStrategy" label="切分策略" placeholder="请输入切分策略" />
      <ProFormDigit name="chunkSize" label="切片大小" min={1} fieldProps={{ precision: 0 }} />
      <ProFormDigit name="chunkOverlap" label="重叠大小" min={0} fieldProps={{ precision: 0 }} />
      <ProFormSelect
        name="status"
        label="状态"
        valueEnum={enabledStatusValueEnum}
        rules={[{ required: true, message: '请选择状态' }]}
      />
    </ModalForm>
  );
};

const KbBaseTable = () => {
  const actionRef = useRef<ActionType | null>(null);
  const access = useAccess();
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    kbBaseRemove,
    actionRef.current?.reload,
  );
  const { run: rebuildIndexRun, loading: rebuildIndexLoading } = useActionRequest(
    kbBaseRebuildIndex,
    actionRef.current?.reload,
    { successMessage: '重建知识库索引任务已提交' },
  );
  const request = useTableRequest(kbBaseList);

  const columns: ProColumns<API.KbBaseVo>[] = [
    { title: 'ID', dataIndex: 'kbId', ...HIDE_COLUMN },
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    { title: '知识库编码', dataIndex: 'kbCode', copyable: true, width: 160 },
    { title: '知识库名称', dataIndex: 'kbName', width: 180 },
    { title: '描述', dataIndex: 'description', ellipsis: true, hideInSearch: true },
    { title: '可见范围', dataIndex: 'visibility', valueEnum: visibilityValueEnum, width: 100 },
    { title: '负责人ID', dataIndex: 'ownerId', width: 140 },
    { title: '向量模型ID', dataIndex: 'embeddingModelId', ...HIDE_COLUMN },
    {
      title: '向量模型',
      dataIndex: 'embeddingModel',
      width: 160,
      hideInSearch: true,
      renderText: (_, record) => record.embeddingModel || record.embeddingModelId || '-',
    },
    {
      title: '向量模型',
      dataIndex: 'embeddingModelId',
      valueType: 'select',
      hideInTable: true,
      request: loadEmbeddingModelOptions,
    },
    { title: '切分策略', dataIndex: 'chunkStrategy', width: 120, hideInSearch: true },
    { title: '切片大小', dataIndex: 'chunkSize', width: 100, hideInSearch: true },
    { title: '重叠大小', dataIndex: 'chunkOverlap', width: 100, hideInSearch: true },
    { title: '状态', dataIndex: 'status', valueEnum: enabledStatusValueEnum, width: 90 },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', width: 180, hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Access accessible={access.canAccess('ai:kbBase:edit')}>
            <KbBaseModalForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>
          <Access accessible={access.canAccess('ai:kbBase:edit')}>
            <Popconfirm
              title="重建知识库索引"
              description={`确认重建知识库索引：${record.kbName || record.kbCode || record.kbId}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: rebuildIndexLoading }}
              onConfirm={() => record.kbId && rebuildIndexRun({ kbId: record.kbId })}
            >
              <a>重建索引</a>
            </Popconfirm>
          </Access>
          <Access accessible={access.canAccess('ai:kbBase:remove')}>
            <Popconfirm
              title="知识库删除"
              description={`确认删除知识库：${record.kbName || record.kbCode || record.kbId}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ kbIds: record.kbId ? [record.kbId] : [] })}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<API.KbBaseVo>
      columns={columns}
      actionRef={actionRef}
      request={request}
      columnsState={{ ...commonColumnsState, persistenceKey: 'kb-base-pro-table' }}
      rowKey="kbId"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
      headerTitle="知识库管理"
      scroll={{ x: 1400 }}
      toolBarRender={() => [
        <Access key="add" accessible={access.canAccess('ai:kbBase:add')}>
          <KbBaseModalForm
            mode="add"
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增知识库
              </Button>
            }
            reload={actionRef.current?.reload}
          />
        </Access>,
      ]}
      rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
      tableAlertOptionRender={false}
      tableAlertRender={(props) => (
        <Access accessible={access.canAccess('ai:kbBase:remove')}>
          <BatchDeleteAlert<API.KbBaseVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) => kbBaseRemove({ kbIds: keys.map(String) })}
          />
        </Access>
      )}
    />
  );
};

interface KbDocumentFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: Reload;
  record?: API.KbDocumentVo;
}

type KbDocumentUploadFormValues = {
  kbId: string;
  file: UploadFile[];
};

const KbDocumentModalForm = ({ mode, trigger, reload, record }: KbDocumentFormProps) => {
  const isEdit = mode === OperationModes.EDIT;
  const [uploading, setUploading] = useState(false);
  const { run, loading } = useActionRequest(kbDocumentEdit, reload);

  if (!isEdit) {
    return (
      <ModalForm<KbDocumentUploadFormValues>
        title="新增文档"
        trigger={trigger}
        modalProps={{ destroyOnClose: true, okButtonProps: { loading: uploading } }}
        width={520}
        onFinish={async (values) => {
          const uploadFile = values.file?.[0]?.originFileObj;

          if (!uploadFile) {
            message.error('请选择上传文件');
            return false;
          }

          setUploading(true);
          try {
            await kbDocumentUpload({ kbId: Number(values.kbId) }, uploadFile);
            message.success('文档上传成功');
            reload?.();
            return true;
          } catch (error: any) {
            message.error(error?.message || '文档上传失败');
            return false;
          } finally {
            setUploading(false);
          }
        }}
      >
        <ProFormSelect
          name="kbId"
          label="知识库"
          placeholder="请选择知识库"
          request={loadKbOptions}
          rules={[{ required: true, message: '请选择知识库' }]}
        />
        <ProForm.Item
          name="file"
          label="上传文件"
          valuePropName="fileList"
          getValueFromEvent={(event: { fileList?: UploadFile[] }) => event?.fileList}
          rules={[{ required: true, message: '请选择上传文件' }]}
        >
          <Upload beforeUpload={() => false} maxCount={1}>
            <Button icon={<UploadOutlined />}>选择文件</Button>
          </Upload>
        </ProForm.Item>
      </ModalForm>
    );
  }

  return (
    <ModalForm<API.KbDocumentBo>
      title={isEdit ? '编辑文档' : '新增文档'}
      trigger={trigger}
      initialValues={{
        sourceType: 'MANUAL',
        parseStatus: 'PENDING',
        embedStatus: 'PENDING',
        status: '0',
        chunkCount: 0,
        tokenCount: 0,
        charCount: 0,
        ...record,
      }}
      modalProps={{ okButtonProps: { loading } }}
      width={720}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
    >
      <ProFormText name="docId" hidden />
      <ProFormSelect
        name="kbId"
        label="知识库"
        placeholder="请选择知识库"
        request={loadKbOptions}
        rules={[{ required: true, message: '请选择知识库' }]}
      />
      <ProFormText
        name="fileName"
        label="文件名"
        placeholder="请输入文件名"
        rules={[{ required: true, message: '请输入文件名' }]}
      />
      <ProFormText name="title" label="文档标题" placeholder="请输入文档标题" />
      <ProFormText name="fileType" label="文件类型" placeholder="例如 pdf/docx/txt/md" />
      <ProFormText name="fileSize" label="文件大小" placeholder="请输入文件大小" />
      <ProFormText name="fileUrl" label="文件地址" placeholder="请输入文件访问地址" />
      <ProFormText name="objectKey" label="对象存储Key" placeholder="请输入对象存储Key" />
      <ProFormSelect
        name="sourceType"
        label="来源类型"
        valueEnum={sourceTypeValueEnum}
        rules={[{ required: true, message: '请选择来源类型' }]}
      />
      <ProFormText name="sourceUrl" label="来源URL" placeholder="请输入来源URL" />
      <ProFormSelect
        name="parseStatus"
        label="解析状态"
        valueEnum={processStatusValueEnum}
        rules={[{ required: true, message: '请选择解析状态' }]}
      />
      <ProFormSelect
        name="embedStatus"
        label="向量化状态"
        valueEnum={processStatusValueEnum}
        rules={[{ required: true, message: '请选择向量化状态' }]}
      />
      <ProFormDigit name="chunkCount" label="切片数量" min={0} fieldProps={{ precision: 0 }} />
      <ProFormDigit name="tokenCount" label="Token数量" min={0} fieldProps={{ precision: 0 }} />
      <ProFormDigit name="charCount" label="字符数量" min={0} fieldProps={{ precision: 0 }} />
      <ProFormTextArea name="errorMessage" label="错误信息" placeholder="请输入错误信息" />
      <ProFormSelect
        name="status"
        label="状态"
        valueEnum={enabledStatusValueEnum}
        rules={[{ required: true, message: '请选择状态' }]}
      />
    </ModalForm>
  );
};

const KbDocumentTable = () => {
  const actionRef = useRef<ActionType | null>(null);
  const access = useAccess();
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    kbDocumentRemove,
    actionRef.current?.reload,
  );
  const { run: rebuildIndexRun, loading: rebuildIndexLoading } = useActionRequest(
    kbDocumentRebuildIndex,
    actionRef.current?.reload,
    { successMessage: '重建文档索引任务已提交' },
  );
  const request = useTableRequest(kbDocumentList);

  const columns: ProColumns<API.KbDocumentVo>[] = [
    { title: 'ID', dataIndex: 'docId', ...HIDE_COLUMN },
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    {
      title: '知识库',
      dataIndex: 'kbId',
      valueType: 'select',
      hideInTable: true,
      request: loadKbOptions,
    },
    { title: '知识库', dataIndex: 'kbName', width: 160, hideInSearch: true },
    { title: '文件名', dataIndex: 'fileName', width: 180, ellipsis: true },
    { title: '文档标题', dataIndex: 'title', width: 180, ellipsis: true },
    { title: '文件类型', dataIndex: 'fileType', width: 100 },
    { title: '来源类型', dataIndex: 'sourceType', valueEnum: sourceTypeValueEnum, width: 110 },
    { title: '解析状态', dataIndex: 'parseStatus', valueEnum: processStatusValueEnum, width: 110 },
    { title: '向量化状态', dataIndex: 'embedStatus', valueEnum: processStatusValueEnum, width: 120 },
    { title: '切片数', dataIndex: 'chunkCount', width: 90, hideInSearch: true },
    { title: 'Token数', dataIndex: 'tokenCount', width: 100, hideInSearch: true },
    { title: '字符数', dataIndex: 'charCount', width: 100, hideInSearch: true },
    { title: '状态', dataIndex: 'status', valueEnum: enabledStatusValueEnum, width: 90 },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', width: 180, hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 200,
      render: (_, record) => (
        <Space size="small">
          <Access accessible={access.canAccess('ai:kbDocument:edit')}>
            <KbDocumentModalForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>
          <Access accessible={access.canAccess('ai:kbDocument:edit')}>
            <Popconfirm
              title="重建文档索引"
              description={`确认重建文档索引：${record.title || record.fileName || record.docId}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: rebuildIndexLoading }}
              onConfirm={() => record.docId && rebuildIndexRun({ docId: record.docId })}
            >
              <a>重建索引</a>
            </Popconfirm>
          </Access>
          <Access accessible={access.canAccess('ai:kbDocument:remove')}>
            <Popconfirm
              title="文档删除"
              description={`确认删除文档：${record.title || record.fileName || record.docId}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ docIds: record.docId ? [record.docId] : [] })}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<API.KbDocumentVo>
      columns={columns}
      actionRef={actionRef}
      request={request}
      columnsState={{ ...commonColumnsState, persistenceKey: 'kb-document-pro-table' }}
      rowKey="docId"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
      headerTitle="文档管理"
      scroll={{ x: 1500 }}
      toolBarRender={() => [
        <Access key="add" accessible={access.canAccess('ai:kbDocument:add')}>
          <KbDocumentModalForm
            mode="add"
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增文档
              </Button>
            }
            reload={actionRef.current?.reload}
          />
        </Access>,
      ]}
      rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
      tableAlertOptionRender={false}
      tableAlertRender={(props) => (
        <Access accessible={access.canAccess('ai:kbDocument:remove')}>
          <BatchDeleteAlert<API.KbDocumentVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) => kbDocumentRemove({ docIds: keys.map(String) })}
          />
        </Access>
      )}
    />
  );
};

interface KbChunkFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: Reload;
  record?: API.KbChunkVo;
}

const KbChunkModalForm = ({ mode, trigger, reload, record }: KbChunkFormProps) => {
  const isEdit = mode === OperationModes.EDIT;
  const { run, loading } = useActionRequest(isEdit ? kbChunkEdit : kbChunkAdd, reload);

  return (
    <ModalForm<API.KbChunkBo>
      title={isEdit ? '编辑切片' : '新增切片'}
      trigger={trigger}
      initialValues={{
        chunkNo: 1,
        embeddingStatus: 'PENDING',
        status: '0',
        ...record,
      }}
      modalProps={{ okButtonProps: { loading } }}
      width={760}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
    >
      <ProFormText name="chunkId" hidden />
      <ProFormSelect
        name="kbId"
        label="知识库"
        placeholder="请选择知识库"
        request={loadKbOptions}
        rules={[{ required: true, message: '请选择知识库' }]}
      />
      <ProFormDependency name={['kbId']}>
        {({ kbId }) => (
          <ProFormSelect
            name="docId"
            label="文档"
            placeholder="请选择文档"
            disabled={!kbId}
            request={() => loadDocumentOptions(kbId)}
            rules={[{ required: true, message: '请选择文档' }]}
          />
        )}
      </ProFormDependency>
      <ProFormDigit
        name="chunkNo"
        label="切片序号"
        min={1}
        fieldProps={{ precision: 0 }}
        rules={[{ required: true, message: '请输入切片序号' }]}
      />
      <ProFormText name="chunkTitle" label="切片标题" placeholder="请输入切片标题" />
      <ProFormTextArea
        name="content"
        label="切片内容"
        placeholder="请输入切片内容"
        fieldProps={{ rows: 6 }}
        rules={[{ required: true, message: '请输入切片内容' }]}
      />
      <ProFormDigit name="tokenCount" label="Token数量" min={0} fieldProps={{ precision: 0 }} />
      <ProFormDigit name="charCount" label="字符数量" min={0} fieldProps={{ precision: 0 }} />
      <ProFormDigit name="pageNo" label="页码" min={0} fieldProps={{ precision: 0 }} />
      <ProFormText name="sectionTitle" label="章节标题" placeholder="请输入章节标题" />
      <ProFormSelect
        name="embeddingStatus"
        label="向量化状态"
        valueEnum={processStatusValueEnum}
        rules={[{ required: true, message: '请选择向量化状态' }]}
      />
      <ProFormText name="embeddingId" label="向量记录ID" placeholder="请输入向量记录ID" />
      <ProFormSelect
        name="status"
        label="状态"
        valueEnum={enabledStatusValueEnum}
        rules={[{ required: true, message: '请选择状态' }]}
      />
    </ModalForm>
  );
};

const KbChunkTable = () => {
  const actionRef = useRef<ActionType | null>(null);
  const access = useAccess();
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    kbChunkRemove,
    actionRef.current?.reload,
  );
  const request = useTableRequest(kbChunkList);

  const columns: ProColumns<API.KbChunkVo>[] = [
    { title: 'ID', dataIndex: 'chunkId', ...HIDE_COLUMN },
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    {
      title: '知识库',
      dataIndex: 'kbId',
      valueType: 'select',
      hideInTable: true,
      request: loadKbOptions,
    },
    {
      title: '文档',
      dataIndex: 'docId',
      valueType: 'select',
      hideInTable: true,
      dependencies: ['kbId'],
      request: (params) => loadDocumentOptions(params?.kbId),
    },
    { title: '知识库', dataIndex: 'kbName', width: 160, hideInSearch: true },
    { title: '文档', dataIndex: 'docName', width: 180, ellipsis: true, hideInSearch: true },
    { title: '切片序号', dataIndex: 'chunkNo', width: 100 },
    { title: '切片标题', dataIndex: 'chunkTitle', width: 180, ellipsis: true },
    { title: '内容', dataIndex: 'content', ellipsis: true, hideInSearch: true },
    { title: 'Token数', dataIndex: 'tokenCount', width: 100, hideInSearch: true },
    { title: '字符数', dataIndex: 'charCount', width: 100, hideInSearch: true },
    { title: '页码', dataIndex: 'pageNo', width: 80, hideInSearch: true },
    { title: '向量化状态', dataIndex: 'embeddingStatus', valueEnum: processStatusValueEnum, width: 120 },
    { title: '状态', dataIndex: 'status', valueEnum: enabledStatusValueEnum, width: 90 },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', width: 180, hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Access accessible={access.canAccess('ai:kbChunk:edit')}>
            <KbChunkModalForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>
          <Access accessible={access.canAccess('ai:kbChunk:remove')}>
            <Popconfirm
              title="切片删除"
              description={`确认删除切片：${record.chunkTitle || record.chunkId}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ chunkIds: record.chunkId ? [record.chunkId] : [] })}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<API.KbChunkVo>
      columns={columns}
      actionRef={actionRef}
      request={request}
      columnsState={{ ...commonColumnsState, persistenceKey: 'kb-chunk-pro-table' }}
      rowKey="chunkId"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
      headerTitle="切片管理"
      scroll={{ x: 1500 }}
      toolBarRender={() => [
        <Access key="add" accessible={access.canAccess('ai:kbChunk:add')}>
          <KbChunkModalForm
            mode="add"
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增切片
              </Button>
            }
            reload={actionRef.current?.reload}
          />
        </Access>,
      ]}
      rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
      tableAlertOptionRender={false}
      tableAlertRender={(props) => (
        <Access accessible={access.canAccess('ai:kbChunk:remove')}>
          <BatchDeleteAlert<API.KbChunkVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) => kbChunkRemove({ chunkIds: keys.map(String) })}
          />
        </Access>
      )}
    />
  );
};

interface KbBaseAuthFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: Reload;
  record?: API.KbBaseAuthVo;
}

const KbBaseAuthModalForm = ({ mode, trigger, reload, record }: KbBaseAuthFormProps) => {
  const isEdit = mode === OperationModes.EDIT;
  const { run, loading } = useActionRequest(isEdit ? kbBaseAuthEdit : kbBaseAuthAdd, reload);

  return (
    <ModalForm<API.KbBaseAuthBo>
      title={isEdit ? '编辑授权' : '新增授权'}
      trigger={trigger}
      initialValues={{
        subjectType: 'USER',
        permission: 'READ',
        status: '0',
        ...record,
      }}
      modalProps={{ okButtonProps: { loading } }}
      width={620}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
    >
      <ProFormText name="authId" hidden />
      <ProFormSelect
        name="kbId"
        label="知识库"
        placeholder="请选择知识库"
        request={loadKbOptions}
        rules={[{ required: true, message: '请选择知识库' }]}
      />
      <ProFormSelect
        name="subjectType"
        label="授权对象类型"
        valueEnum={subjectTypeValueEnum}
        rules={[{ required: true, message: '请选择授权对象类型' }]}
      />
      <ProFormText
        name="subjectId"
        label="授权对象ID"
        placeholder="请输入授权对象ID"
        rules={[{ required: true, message: '请输入授权对象ID' }]}
      />
      <ProFormSelect
        name="permission"
        label="权限"
        valueEnum={permissionValueEnum}
        rules={[{ required: true, message: '请选择权限' }]}
      />
      <ProFormSelect
        name="status"
        label="状态"
        valueEnum={enabledStatusValueEnum}
        rules={[{ required: true, message: '请选择状态' }]}
      />
    </ModalForm>
  );
};

const KbBaseAuthTable = () => {
  const actionRef = useRef<ActionType | null>(null);
  const access = useAccess();
  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    kbBaseAuthRemove,
    actionRef.current?.reload,
  );
  const request = useTableRequest(kbBaseAuthList);

  const columns: ProColumns<API.KbBaseAuthVo>[] = [
    { title: 'ID', dataIndex: 'authId', ...HIDE_COLUMN },
    { title: '序号', dataIndex: 'index', valueType: 'indexBorder', width: 48 },
    {
      title: '知识库',
      dataIndex: 'kbId',
      valueType: 'select',
      hideInTable: true,
      request: loadKbOptions,
    },
    {
      title: '知识库',
      dataIndex: 'kbName',
      width: 160,
      hideInSearch: true,
      renderText: (_, record) => (record as API.KbBaseAuthVo & { kbName?: string }).kbName || record.kbId || '-',
    },
    { title: '对象类型', dataIndex: 'subjectType', valueEnum: subjectTypeValueEnum, width: 120 },
    { title: '对象ID', dataIndex: 'subjectId', width: 140, copyable: true },
    { title: '权限', dataIndex: 'permission', valueEnum: permissionValueEnum, width: 100 },
    { title: '状态', dataIndex: 'status', valueEnum: enabledStatusValueEnum, width: 90 },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', width: 180, hideInSearch: true },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      fixed: 'right',
      width: 120,
      render: (_, record) => (
        <Space size="small">
          <Access accessible={access.canAccess('ai:kbBaseAuth:edit')}>
            <KbBaseAuthModalForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>
          <Access accessible={access.canAccess('ai:kbBaseAuth:remove')}>
            <Popconfirm
              title="授权删除"
              description={`确认删除授权：${record.subjectType || ''} ${record.subjectId || record.authId}`}
              okText="确认"
              cancelText="取消"
              okButtonProps={{ loading: deleteLoading }}
              onConfirm={() => deleteRun({ authIds: record.authId ? [record.authId] : [] })}
            >
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <ProTable<API.KbBaseAuthVo>
      columns={columns}
      actionRef={actionRef}
      request={request}
      columnsState={{ ...commonColumnsState, persistenceKey: 'kb-base-auth-pro-table' }}
      rowKey="authId"
      search={{ labelWidth: 'auto' }}
      pagination={{ pageSize: 10 }}
      headerTitle="授权管理"
      scroll={{ x: 1100 }}
      toolBarRender={() => [
        <Access key="add" accessible={access.canAccess('ai:kbBaseAuth:add')}>
          <KbBaseAuthModalForm
            mode="add"
            trigger={
              <Button type="primary" icon={<PlusOutlined />}>
                新增授权
              </Button>
            }
            reload={actionRef.current?.reload}
          />
        </Access>,
      ]}
      rowSelection={{ selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }}
      tableAlertOptionRender={false}
      tableAlertRender={(props) => (
        <Access accessible={access.canAccess('ai:kbBaseAuth:remove')}>
          <BatchDeleteAlert<API.KbBaseAuthVo>
            {...props}
            actionRef={actionRef}
            onDelete={(keys) => kbBaseAuthRemove({ authIds: keys.map(String) })}
          />
        </Access>
      )}
    />
  );
};

const KbManagePage = () => {
  return (
    <PageContainer>
      <Tabs
        items={[
          { key: 'base', label: '知识库', children: <KbBaseTable /> },
          { key: 'document', label: '文档', children: <KbDocumentTable /> },
          { key: 'chunk', label: '切片', children: <KbChunkTable /> },
          { key: 'auth', label: '授权', children: <KbBaseAuthTable /> },
        ]}
      />
    </PageContainer>
  );
};

export default KbManagePage;
