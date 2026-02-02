import { DictEnum } from '@/const/dict-enum';
import { useDictDataTagMap } from '@/hooks/dict/useDictDataTagMap';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { workPlaceMyApply } from '@/services/yuan/workPlaceController';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components'
import { history, useAccess } from '@umijs/max';
import React, { useRef } from 'react'

const index = () => {
  /**权限控制 */
  const access = useAccess();
  const actionRef = useRef<ActionType | null>(null);
  const statusEnum = useDictDataValueEnum(DictEnum.WF_INSTANCE_STATUS);
  const endReasonTag = useDictDataTagMap(DictEnum.WF_END_REASON);
  const wfBizTypeTagMap = useDictDataTagMap(DictEnum.WF_BIZ_TYPE);

  const endReason = (value: string | number) => {
    const tag = endReasonTag[String(value)];
    return tag?.render?.() ?? value;
  };
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
      render: (_, record) => wfBizType(record.bizType || '-'),
    },
    {
      title: '当前节点',
      dataIndex: 'nodeName',
      render: (_, row) =>
        row.instanceStatus === 'RUNNING' ? row.nodeName : '已结束',
    },
    {
      title: '当前状态',
      dataIndex: 'instanceStatus',
      valueEnum: statusEnum,
    },
    {
      title: '发起时间',
      dataIndex: 'instanceStartTime',
      valueType: 'dateTime',
    },
    {
      title: "结束原因",
      dataIndex: "endReason",
      render: (_, record) => endReason(record.instanceEndReason || '-'),
    },
    {
      title: '结束时间',
      dataIndex: 'instanceEndTime',
      valueType: 'dateTime'
    },
    {
      title: '操作',
      valueType: 'option',
      render: (_, row) => {
        return (<a key="detail" onClick={() => {
          history.push(`/workflow/detail?bizNo=${row.bizNo}`)
        }}>详情</a>)
      },
    },
  ]
  const request = useTableRequest(workPlaceMyApply)
  return (
    <PageContainer>
      <ProTable<API.WorkItemRowVO>
        headerTitle="我的申请"
        rowKey="instanceId"
        columns={columns}
        actionRef={actionRef}
        request={request}
        columnsState={{
          persistenceKey: 'workplace-MyApply-pro-table',
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