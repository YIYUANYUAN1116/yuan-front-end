import { DictEnum } from '@/const/dict-enum';
import { useDictDataTagMap } from '@/hooks/dict/useDictDataTagMap';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { workPlaceMyTask } from '@/services/yuan/workPlaceController';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { history, useAccess } from '@umijs/max';
import React, { useRef } from 'react'

const index = () => {
  /**权限控制 */
  const access = useAccess();

  const actionRef = useRef<ActionType | null>(null);
  const statusEnum = useDictDataValueEnum(DictEnum.WF_TASK_STATUS);
  const bizTypeEnum = useDictDataValueEnum(DictEnum.WF_BIZ_TYPE);
  const wfBizTypeTagMap = useDictDataTagMap(DictEnum.WF_BIZ_TYPE);
  const wfBizType = (value: string | number) => {
    const tag = wfBizTypeTagMap[String(value)];
    return tag?.render?.() ?? value;
  };
  const columns: ProColumns<API.WorkItemRowVO>[] = [
    {
      title: '单号',
      dataIndex: 'bizNo',
      ellipsis: true,
      render: (_, record) => (<a onClick={() => {
        history.push(`/workflow/detail?bizNo=${record.bizNo}`)
      }}>
        {record.bizNo}
      </a>)
    },
    {
      title: '流程类型',
      dataIndex: 'bizType',
      valueEnum: bizTypeEnum,
      render: (_, row) => wfBizType(row.bizType || '')
    },
    {
      title: '当前节点',
      dataIndex: 'nodeName',
      search: false,
    },
    {
      title: '发起人',
      dataIndex: 'starterName'
    },
    {
      title: '到达时间',
      dataIndex: 'taskCreateTime',
      valueType: 'dateTime',
      search: false,
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
      render: (_, record) => (<a onClick={() => {
        history.push(`/workflow/detail?bizNo=${record.bizNo}`)
      }}>
        详细
      </a>)
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