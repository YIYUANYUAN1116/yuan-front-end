import { DictEnum } from '@/const/dict-enum';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { workPlaceMyTask } from '@/services/yuan/workPlaceController';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { useAccess } from '@umijs/max';
import React, { useRef } from 'react'

const index = () => {
  /**权限控制 */
  const access = useAccess();

  const actionRef = useRef<ActionType | null>(null);
  const statusEnum = useDictDataValueEnum(DictEnum.WF_TASK_STATUS);

  const columns: ProColumns<API.WorkItemRowVO>[] = [
    {
      title: '事项',
      dataIndex: 'bizTitle',
      ellipsis: true,
    },
    {
      title: '流程',
      dataIndex: 'bizType'
    },
    {
      title: '当前节点',
      dataIndex: 'nodeName'
    },
    {
      title: '发起人',
      dataIndex: 'starterName'
    },
    {
      title: '到达时间',
      dataIndex: 'taskCreateTime',
      valueType: 'dateTime'
    },
    {
      title: '状态',
      dataIndex: 'taskStatus',
      valueEnum: statusEnum,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 200,
      render: (_, row) => [
        <a key="handle">处理</a>,
        <a key="transfer">转交</a>,
      ],
    },
  ]
  const request = useTableRequest(workPlaceMyTask)
  return (
    <PageContainer>
      <ProTable<API.WorkItemRowVO>
        headerTitle="我的待办"
        rowKey="taskId"
        columns={columns}
        actionRef={actionRef}
        request={request}
        columnsState={{
          persistenceKey: 'workplace-mytask-pro-table',
          persistenceType: 'localStorage',
          defaultValue: {
            option: { fixed: 'right', disable: true },
          },
        }}

        search={{ labelWidth: 'auto' }}
        pagination={{ pageSize: 10 }}


      />
    </PageContainer>
  )
}

export default index