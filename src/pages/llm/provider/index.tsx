import { useTableRequest } from '@/hooks/table/useTableRequest';
import { llmProviderList, llmProviderRemove } from '@/services/yuan/llmProviderController';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useRef } from 'react'
import { LlmProviderDrawerForm } from './components/LlmProviderDrawerForm';
import { PlusOutlined } from '@ant-design/icons';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { DictEnum } from '@/const/dict-enum';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';

const index = () => {
  const actionRef = useRef<ActionType | null>(null);
  const access = useAccess();

  const columns: ProColumns<API.LlmProviderVo>[] = [
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
      title: '供应商名称',
      dataIndex: 'name',
    },
    {
      title: '供应商编号',
      dataIndex: 'code',
    },
    {
      title: '接口协议',
      dataIndex: 'protocol',
    },
    {
      title: '备注',
      dataIndex: 'remark',
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
            accessible={access.canAccess('ai:llmProvider:list') || false}
          >
            <LlmProviderDrawerForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <Access
            key="remove"
            accessible={access.canAccess('ai:llmProvider:remove')}
          >
            <Popconfirm
              title="供应商删除"
              description={`确认删除供应商：${record.name}`}
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
    llmProviderRemove,
    actionRef.current?.reload,
  );

  const request = useTableRequest(llmProviderList);
  return (
    <PageContainer>
      <ProTable<API.LlmProviderVo>
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
        headerTitle="供应商管理"
        toolBarRender={() => [
          <Access key="add" accessible={access.canAccess('system:user:add')}>
            <LlmProviderDrawerForm
              mode="add"
              trigger={
                <Button type="primary" icon={<PlusOutlined />}>
                  新增供应商
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
            accessible={access.canAccess('ai:llmProvider:remove')}
          >
            <BatchDeleteAlert<API.LlmProviderVo>
              {...props}
              actionRef={actionRef}
              onDelete={(keys) => llmProviderRemove({ ids: keys as string[] })}
            />
          </Access>
        )}
      />
    </PageContainer>
  );
}

export default index
