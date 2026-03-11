import { useTableRequest } from '@/hooks/table/useTableRequest';
import { llmModelList, llmModelRemove } from '@/services/yuan/llmModelController';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Access, useAccess } from '@umijs/max';
import { Button, Popconfirm, Space, Table, Tag } from 'antd';
import React, { useRef } from 'react'
import { PlusOutlined } from '@ant-design/icons';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { LlmModelDrawerForm } from './components/LlmModelDrawerForm';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { DictEnum } from '@/const/dict-enum';

const index = () => {
  const actionRef = useRef<ActionType | null>(null);
  const access = useAccess();
  const statusEnum = useDictDataValueEnum(DictEnum.SYS_NORMAL_DISABLE);

  const columns: ProColumns<API.LlmModelVo>[] = [
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
    { title: '显示名称', dataIndex: 'displayName', ellipsis: true },
    { title: '模型名', dataIndex: 'modelName', copyable: true, ellipsis: true },
    {
      title: '供应商',
      dataIndex: 'providerCode',
      width: 200
    },
    {
      title: '接入点',
      dataIndex: 'endpointKey',
      width: 200
    },
    {
      title: '状态',
      dataIndex: 'status',
      width: 80,
      valueEnum:statusEnum
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
            accessible={access.canAccess('ai:llmModel:list') || false}
          >
            <LlmModelDrawerForm
              mode="edit"
              trigger={<a>编辑</a>}
              record={record}
              reload={actionRef.current?.reload}
            />
          </Access>

          <Access
            key="remove"
            accessible={access.canAccess('ai:llmModel:remove')}
          >
            <Popconfirm
              title="模型删除"
              description={`确认删除模型：${record.modelName}`}
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
    llmModelRemove,
    actionRef.current?.reload,
  );

  const request = useTableRequest(llmModelList);
  return (
    <PageContainer>
      <ProTable<API.LlmModelVo>
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
        headerTitle="模型管理"
        toolBarRender={() => [
          <Access key="add" accessible={access.canAccess('system:user:add')}>
            <LlmModelDrawerForm
              mode="add"
              trigger={
                <Button type="primary" icon={<PlusOutlined />}>
                  新增模型
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
            accessible={access.canAccess('ai:llmModel:remove')}
          >
            <BatchDeleteAlert<API.LlmModelVo>
              {...props}
              actionRef={actionRef}
              onDelete={(keys) => llmModelRemove({ ids: keys as string[] })}
            />
          </Access>
        )}
      />
    </PageContainer>
  );
}

export default index
