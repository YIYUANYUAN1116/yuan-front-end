import { DictEnum } from '@/const/dict-enum';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { oaLeaveApplyList, oaLeaveApplyRemove, oaLeaveApplySubmit } from '@/services/yuan/oaLeaveApplyController';
import { ActionType, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { Button, Popconfirm, Space } from 'antd';
import React, { useRef } from 'react'
import { history, useAccess } from '@umijs/max';
import { useDictDataTagMap } from '@/hooks/dict/useDictDataTagMap';
import { useActionRequest } from '@/hooks/action/useActionRequest';

const index = () => {
  const access = useAccess();
  const actionRef = useRef<ActionType | null>(null);
  const leaveStatusEnum = useDictDataValueEnum(DictEnum.OA_APPLY_STATUS)
  const leaveTypetagMap = useDictDataTagMap(DictEnum.OA_LEAVE_TYPE)
  const leaveTypeEnum = useDictDataValueEnum(DictEnum.OA_LEAVE_TYPE);

  const leaveType = (value: string | number) => {
    const tag = leaveTypetagMap[String(value)];
    return tag?.render?.() ?? value;
  };

  const { run: deleteRun } = useActionRequest(
    oaLeaveApplyRemove,
    actionRef.current?.reload
  );

  const { run: submitRun } = useActionRequest(oaLeaveApplySubmit,actionRef.current?.reload);

  const columns: ProColumns<API.OaLeaveApplyVo>[] = [
    {
      title: '单号',
      dataIndex: 'applyNo',
      ellipsis: true,
      fixed: 'left',
      render: (_, record) => (<a onClick={() => {
        history.push(`/workflow/detail?bizNo=${record.applyNo}`)
      }}>
        {record.applyNo}
      </a>),
    },
    {
      title: '请假类型',
      dataIndex: 'leaveType',
      valueEnum:leaveTypeEnum,
      render: (_, record) => leaveType(record.leaveType || ''),
      width: 100
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      valueEnum: leaveStatusEnum,
      width: 100
    },
    {
      title: '申请人',
      dataIndex: 'applicantName',
      search: false,
    },
    {
      title: '部门',
      dataIndex: 'applicantDeptName',
      search: false,
      ellipsis: true,
    },
    {
      title: '开始时间',
      dataIndex: 'startTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'dateTime',
      search: false,
    },
    {
      title: '天数',
      dataIndex: 'leaveDays',
      search: false,
      width: 80
    },

    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      search: false,
      sorter: true,
      defaultSortOrder: 'descend', // 默认降序
    },
    {
      title: '操作',
      valueType: 'option',
      fixed: 'right',
      render: (_, r) => {
        const isDraft = r.status === 'DRAFT';
        const isApproving = r.status === 'APPROVING';
        return (
          <Space size='small'>
            <a onClick={() => history.push(`/workflow/detail?bizNo=${r.applyNo}&bizType=Leave`)}>
              查看
            </a>

            {isDraft && (
              <>
                <a onClick={() => history.push(`/oa/leave/form?bizNo=${r.applyNo}&mode=edit`)}>
                  编辑
                </a>

                <Popconfirm
                  title="提交申请"
                  description="确认提交申请"
                  okText="确认"
                  cancelText="取消"
                  onConfirm={() => submitRun({ bizNo: r.applyNo })}
                >
                  <a >提交申请</a>
                </Popconfirm>

                <Popconfirm
                  title="删除"
                  onConfirm={() => deleteRun({ ids: [r.id] })}
                  okText='确认'
                  cancelText='取消'
                >
                  <a style={{ color: 'red' }}>删除</a>
                </Popconfirm>
              </>
            )}
          </Space>
        );
      },
    },
  ];

  const request = useTableRequest(oaLeaveApplyList)
  return (
    <PageContainer>
      <ProTable<API.OaLeaveApplyVo>
        rowKey="id"
        actionRef={actionRef}
        columns={columns}
        pagination={{ pageSize: 10 }}
        request={request}
        toolbar={{
          title: '请假申请',
          actions: [
            <Button
              key="new"
              type="primary"
              onClick={() => history.push('/oa/leave/form?mode=create')}
            >
              新建请假
            </Button>,
          ],
        }}
        search={{
          labelWidth: 80,
        }}
      />
    </PageContainer>
  );
}

export default index