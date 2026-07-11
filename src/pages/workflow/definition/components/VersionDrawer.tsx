import { PlusOutlined } from '@ant-design/icons';
import type { ProColumns } from '@ant-design/pro-components';
import { ModalForm, ProFormText, ProFormTextArea, ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Popconfirm, Space, Tag, message } from 'antd';
import { useEffect, useState } from 'react';
import {
  wfDefinitionGetInfo,
  wfDefinitionVersionArchive,
  wfDefinitionVersionCreate,
  wfDefinitionVersionList,
  wfDefinitionVersionPublish,
  wfDefinitionVersionRemove,
} from '@/services/yuan/wfDefinitionController';

interface Props {
  definition?: API.WfDefinitionVo;
  open: boolean;
  onClose: () => void;
  onDesign: (versionId: string) => void;
  onDefinitionChanged: () => void;
}

const colors: Record<string, string> = { DRAFT: 'blue', PUBLISHED: 'green', DISABLED: 'orange', ARCHIVED: 'default' };

export default function VersionDrawer({ definition: initialDefinition, open, onClose, onDesign, onDefinitionChanged }: Props) {
  const [definition, setDefinition] = useState(initialDefinition);
  const [versions, setVersions] = useState<API.WfDefinitionVersionVo[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => setDefinition(initialDefinition), [initialDefinition]);

  const reload = async () => {
    if (!initialDefinition?.id) return;
    setLoading(true);
    try {
      const [listRes, definitionRes] = await Promise.all([
        wfDefinitionVersionList({ id: initialDefinition.id }),
        wfDefinitionGetInfo({ id: initialDefinition.id }),
      ]);
      setVersions(listRes.data || []);
      setDefinition(definitionRes.data || initialDefinition);
      onDefinitionChanged();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { if (open) reload(); }, [open, initialDefinition?.id]);

  const createDraft = async (values: API.CreateDefinitionVersionDto) => {
    if (!definition?.id) return false;
    try {
      const res = await wfDefinitionVersionCreate({ id: definition.id }, values);
      message.success('新草稿版本已创建');
      await reload();
      if (res.data?.versionId) onDesign(res.data.versionId);
      return true;
    } catch {
      await reload();
      const draft = versions.find((item) => item.status === 'DRAFT');
      message.warning(draft ? '已存在草稿，请继续编辑已有草稿' : '创建失败，已刷新版本列表');
      return false;
    }
  };

  const columns: ProColumns<API.WfDefinitionVersionVo>[] = [
    { title: '版本号', dataIndex: 'versionNo', width: 80, render: (_, r) => 'v' + r.versionNo },
    { title: '版本名称', dataIndex: 'versionName' },
    { title: '状态', dataIndex: 'status', render: (_, r) => <Tag color={colors[r.status || '']}>{r.status}</Tag> },
    { title: '变更说明', dataIndex: 'changeSummary', ellipsis: true },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime' },
    { title: '发布时间', dataIndex: 'publishTime', valueType: 'dateTime' },
    { title: '发布人', dataIndex: 'publishedBy' },
    { title: '当前发布', render: (_, r) => r.versionId === definition?.publishedVersionId ? <Tag color="green">是</Tag> : '否' },
    {
      title: '操作', valueType: 'option', fixed: 'right',
      render: (_, r) => {
        const draft = r.status === 'DRAFT';
        const current = r.versionId === definition?.publishedVersionId;
        return (
          <Space size="small">
            <a onClick={() => r.versionId && onDesign(r.versionId)}>{draft ? '编辑' : '查看'}</a>
            {draft && <Popconfirm title="发布草稿" description="设计器会在发布前保存最新内容，确认进入设计器继续发布？" onConfirm={() => r.versionId && onDesign(r.versionId)}><a>发布</a></Popconfirm>}
            {!draft && (
              <ModalForm<API.CreateDefinitionVersionDto>
                title={'基于 v' + r.versionNo + ' 创建新草稿'}
                trigger={<a>创建新草稿</a>}
                onFinish={(v) => createDraft({ ...v, sourceVersionId: r.versionId })}
              >
                <ProFormText name="versionName" label="版本名称" />
                <ProFormTextArea name="changeSummary" label="变更说明" />
              </ModalForm>
            )}
            {draft && <Popconfirm title="删除未发布草稿？" onConfirm={async () => { await wfDefinitionVersionRemove({ versionId: r.versionId! }); message.success('草稿已删除'); reload(); }}><a style={{ color: 'red' }}>删除</a></Popconfirm>}
            {!draft && !current && r.status !== 'ARCHIVED' && <Popconfirm title="归档此历史版本？" onConfirm={async () => { await wfDefinitionVersionArchive({ versionId: r.versionId! }); message.success('版本已归档'); reload(); }}><a>归档</a></Popconfirm>}
          </Space>
        );
      },
    },
  ];

  return (
    <Drawer title={(definition?.definitionName || '') + ' · 版本管理'} width="90%" open={open} onClose={onClose}>
      <Space style={{ marginBottom: 16 }}>
        <ModalForm<API.CreateDefinitionVersionDto>
          title="创建新草稿版本"
          trigger={<Button type="primary" icon={<PlusOutlined />}>创建草稿</Button>}
          onFinish={createDraft}
        >
          <ProFormText name="versionName" label="版本名称" />
          <ProFormTextArea name="changeSummary" label="变更说明" />
        </ModalForm>
        {versions.some((v) => v.status === 'DRAFT') && <Button onClick={() => onDesign(versions.find((v) => v.status === 'DRAFT')!.versionId!)}>继续编辑已有草稿</Button>}
      </Space>
      <ProTable rowKey="versionId" search={false} options={false} loading={loading} dataSource={versions} columns={columns} pagination={false} scroll={{ x: 1200 }} />
    </Drawer>
  );
}