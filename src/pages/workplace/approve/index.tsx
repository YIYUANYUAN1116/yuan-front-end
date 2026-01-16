import { DictEnum } from '@/const/dict-enum';
import { useDictDataTagMap } from '@/hooks/dict/useDictDataTagMap';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { workPlaceApprovals } from '@/services/yuan/workPlaceController';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { useAccess } from '@umijs/max';
import React, { useRef } from 'react'

const index = () => {
  /**权限控制 */
  const access = useAccess();

  const actionRef = useRef<ActionType | null>(null);
  const taskActionTag = useDictDataTagMap(DictEnum.WF_TASK_ACTION);
  const taskAction = (value: string | number) => {
    const tag = taskActionTag[String(value)];
    return tag?.render?.() ?? value;
  };
  const columns: ProColumns<API.WorkItemRowVO>[] = [
    {
      title: '事项',
      dataIndex: 'bizTitle',
      ellipsis: true,
    },
    {
      title: '流程',
      dataIndex: 'bizType',
      width: 120,
    },
    {
      title: '节点',
      dataIndex: 'nodeName',
    },
    {
      title: '发起人',
      dataIndex: 'starterName',
    },
    {
      title: '处理结果',
      dataIndex: 'taskAction',
      render: (_, record) => taskAction(record.taskAction || '-'),
    },
    {
      title: '处理时间',
      dataIndex: 'taskFinishTime',
      valueType: 'dateTime',
      width: 180,
    },
    {
      title: '审批意见',
      dataIndex: 'taskComment',
      ellipsis: true,
      width: 260,
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, row) => [
        <a key="detail">详情</a>,
      ],
    },
  ]
  const request = useTableRequest(workPlaceApprovals)
  return (
    <PageContainer>
      <ProTable<API.WorkItemRowVO>
        headerTitle="我的已办"
        rowKey="taskId"
        columns={columns}
        actionRef={actionRef}
        request={request}
        columnsState={{
          persistenceKey: 'workplace-myApprovals-pro-table',
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