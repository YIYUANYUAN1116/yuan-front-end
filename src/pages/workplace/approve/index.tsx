import { DictEnum } from '@/const/dict-enum';
import { useDictDataTagMap } from '@/hooks/dict/useDictDataTagMap';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { workPlaceApprovals } from '@/services/yuan/workPlaceController';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { history, useAccess } from '@umijs/max';
import React, { useRef } from 'react'

const index = () => {
  /**权限控制 */
  const access = useAccess();

  const actionRef = useRef<ActionType | null>(null);
  const taskActionTag = useDictDataTagMap(DictEnum.WF_TASK_ACTION);
  const taskActionEnum = useDictDataValueEnum(DictEnum.WF_TASK_ACTION);
  const taskAction = (value: string | number) => {
    const tag = taskActionTag[String(value)];
    return tag?.render?.() ?? value;
  };
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
      render: (_, record) => (
        <a onClick={() => {
          history.push(`/workplace/detail?bizNo=${record.bizNo}`)
        }}>
          {record.bizNo}
        </a>
      ),
    },
    {
      title: '流程类型',
      dataIndex: 'bizType',
      valueEnum: bizTypeEnum,
      render: (_, row) => wfBizType(row.bizType || ''),
    },
    {
      title: '节点',
      dataIndex: 'nodeName',
      search: false
    },
    {
      title: '发起人',
      dataIndex: 'starterName',
    },
    {
      title: '处理动作',
      dataIndex: 'taskAction',
      valueEnum: taskActionEnum,
      render: (_, record) => taskAction(record.taskAction || '-'),
    },
    {
      title: '处理时间',
      dataIndex: 'taskFinishTime',
      valueType: 'dateTime',
      width: 180,
      search: false
    },
    {
      title: '审批意见',
      dataIndex: 'taskComment',
      ellipsis: true,
      width: 260,
      search: false
    },
    {
      title: '操作',
      valueType: 'option',
      width: 120,
      render: (_, row) => [
        <a key="detail" onClick={() => history.push(`/workplace/detail?bizNo=${row.bizNo}`)}>详情</a>,
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