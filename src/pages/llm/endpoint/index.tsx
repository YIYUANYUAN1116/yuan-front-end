import { useTableRequest } from '@/hooks/table/useTableRequest';
import { llmEndpointList, llmEndpointRemove } from '@/services/yuan/llmEndpointController';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useRef } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { LlmEndpointDrawerForm } from './components/LlmEndpointDrawerForm';

const index = () => {
  const actionRef = useRef<ActionType | null>(null);
  const access = useAccess();

  const columns: ProColumns<API.LlmEndpointVo>[] = [
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
      title: '接入点名称',
      dataIndex: 'endpointName',
    },
    {
      title: '接入点编号',
      dataIndex: 'endpointKey',
    },
    {
      title: '供应商',
      dataIndex: 'providerCode',
    },
    {
      title: '地址',
      dataIndex: 'baseUrl',
      hideInSearch: true,
    },
    {
      title: '密钥',
      dataIndex: 'apiKey',
      hideInSearch: true,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      hideInSearch: true,
    },
    { title: '创建时间', dataIndex: 'createTime', width: 180 },
    { title: '更新时间', dataIndex: 'updateTime', width: 180 },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      hideInSearch: true,
      render: (text, record) => (
        <Space size="small">
          <Access
            key="edit"
            accessible={access.canAccess('ai:llmEndpoint:list') || false}
          >
            <LlmEndpointDrawerForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <Access
            key="remove"
            accessible={access.canAccess('ai:llmEndpoint:remove')}
          >
            <Popconfirm
              title="接入点删除"
              description={`确认删除接入点：${record.endpointKey}`}
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

  const { run: deleteRun, loading: deleteLoading } = useActionRequest(
    llmEndpointRemove,
    actionRef.current?.reload,
  );

  const request = useTableRequest(llmEndpointList);
  return (
    <PageContainer>
      <ProTable<API.LlmEndpointVo>
        columns={columns}
        actionRef={actionRef}
        request={request}
        columnsState={{
          persistenceKey: 'sys-user-pro-table',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}
        rowKey="userId"
        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 10 }}
        headerTitle="接入点管理"
        toolBarRender={() => [
          <Access key="add" accessible={access.canAccess('system:user:add')}>
            <LlmEndpointDrawerForm
              mode="add"
              trigger={
                <Button type="primary" icon={<PlusOutlined />}>
                  新增接入点
                </Button>
              }
              reload={actionRef.current?.reload}
            />
          </Access>,
        ]}
        rowSelection={{
          // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
          // 注释该行则默认不显示下拉选项
          selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
        }}
        tableAlertOptionRender={false}
        tableAlertRender={(props) => (
          <Access
            key="remove"
            accessible={access.canAccess('ai:llmEndpoint:remove')}
          >
            <BatchDeleteAlert<API.LlmEndpointVo>
              {...props}
              actionRef={actionRef}
              onDelete={(keys) => llmEndpointRemove({ ids: keys as string[] })}
            />
          </Access>
        )}
      />
    </PageContainer>
  );
}

export default index
