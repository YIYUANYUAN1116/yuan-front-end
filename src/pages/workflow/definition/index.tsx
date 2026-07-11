import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Access, history, useAccess } from '@umijs/max';
import { Button, Popconfirm, Space } from 'antd';
import { useRef, useState } from 'react';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { wfDefinitionList, wfDefinitionRemove } from '@/services/yuan/wfDefinitionController';
import DefinitionModalForm from './components/DefinitionModalForm';
import VersionDrawer from './components/VersionDrawer';

export default () => {
  const access = useAccess();
  const actionRef = useRef<ActionType | null>(null);
  const [versionDefinition, setVersionDefinition] = useState<API.WfDefinitionVo>();
  const { run: deleteRun, loading: deleting } = useActionRequest(wfDefinitionRemove, async () => { await actionRef.current?.reload(); });

  const columns: ProColumns<API.WfDefinitionVo>[] = [
    { title: 'id', dataIndex: 'id', ...HIDE_COLUMN },
    { title: '序号', valueType: 'indexBorder', width: 48 },
    { title: '流程名称', dataIndex: 'definitionName' },
    { title: '流程业务标识', dataIndex: 'definitionKey', hideInSearch: true },
    { title: '最新版本号', dataIndex: 'latestVersionNo', hideInSearch: true },
    { title: '当前发布版本', dataIndex: 'publishedVersionId', hideInSearch: true, render: (_, r) => r.publishedVersionId || '-' },
    { title: '状态', dataIndex: 'status' },
    { title: '创建时间', dataIndex: 'createTime', valueType: 'dateTime', hideInSearch: true },
    {
      title: '操作', valueType: 'option', fixed: 'right',
      render: (_, record) => (
        <Space size="small">
          <Access accessible={access.canAccess('workflow:wfDefinition:edit')}>
            <DefinitionModalForm mode="edit" trigger={<a>编辑主体</a>} reload={() => actionRef.current?.reload()} record={record} />
            <a onClick={() => setVersionDefinition(record)}>版本管理</a>
          </Access>
          <Access accessible={access.canAccess('workflow:wfDefinition:remove')}>
            <Popconfirm title="删除流程定义" description={'确认删除：' + record.definitionName + '？'} onConfirm={() => deleteRun({ ids: [record.id] })}>
              <a style={{ color: 'red' }}>{deleting ? '删除中' : '删除'}</a>
            </Popconfirm>
          </Access>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<API.WfDefinitionVo>
        rowKey="id" columns={columns} actionRef={actionRef} cardBordered
        request={useTableRequest(wfDefinitionList)} pagination={{ pageSize: 10 }}
        headerTitle="流程定义管理"
        toolBarRender={() => [
          <Access key="add" accessible={access.canAccess('workflow:wfDefinition:add')}>
            <DefinitionModalForm mode="add" trigger={<Button type="primary" icon={<PlusOutlined />}>新增流程</Button>} reload={() => actionRef.current?.reload()} />
          </Access>,
        ]}
      />
      <VersionDrawer
        definition={versionDefinition}
        open={!!versionDefinition}
        onClose={() => setVersionDefinition(undefined)}
        onDefinitionChanged={() => actionRef.current?.reload()}
        onDesign={(versionId) => history.push('/workflow/definition/' + versionDefinition?.id + '/versions/' + versionId + '/design')}
      />
    </PageContainer>
  );
};