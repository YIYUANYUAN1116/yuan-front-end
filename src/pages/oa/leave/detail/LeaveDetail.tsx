import { DictEnum } from '@/const/dict-enum';
import { useDictDataTagMap } from '@/hooks/dict/useDictDataTagMap';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { oaLeaveApplyGetInfoByBizNo } from '@/services/yuan/oaLeaveApplyController';

import {  ProCard, ProDescriptions, ProDescriptionsItemProps } from '@ant-design/pro-components'
import { useRequest, useSearchParams } from '@umijs/max';
import React, { useEffect, useMemo } from 'react'

export type LeaveDetailProps = {
     bizNo?: string;
}

const LeaveDetail = (props:LeaveDetailProps) => {
    const {bizNo} = props;
    const leaveStatusEnum = useDictDataValueEnum(DictEnum.OA_APPLY_STATUS)
    const leaveTypetagMap = useDictDataTagMap(DictEnum.OA_LEAVE_TYPE)
    const leaveType = (value: string | number) => {
        const tag = leaveTypetagMap[String(value)];
        return tag?.render?.() ?? value;
    };

    const { data, run: fetchDetail } = useRequest(oaLeaveApplyGetInfoByBizNo,
        { manual: true }
    );

    useEffect(() => {
        if (bizNo) {
            fetchDetail({ bizNo: bizNo });
        }
    }, [bizNo, fetchDetail]);


    const descColumns: ProDescriptionsItemProps<API.OaLeaveApplyVo>[] = [
        {
            title: '单号',
            dataIndex: 'applyNo',
            copyable: true,
            ellipsis: true,
        },
        {
            title: '状态',
            dataIndex: 'status',
            valueEnum: leaveStatusEnum
        },
        {
            title: '申请人',
            dataIndex: 'applicantName',
        },
        {
            title: '部门',
            dataIndex: 'applicantDeptName'
        },
        {
            title: '请假类型',
            dataIndex: 'leaveType',
            render: (_, record) => leaveType(record.leaveType || ''),
        },
        {
            title: '请假时间',
            render: (_, r) => `${r.startTime} ~ ${r.endTime}`,
            span: 2,
        },
        {
            title: '请假天数',
            dataIndex: 'leaveDays',
            render: (_, r) => (r.leaveDays ?? 0).toFixed?.(2) ?? r.leaveDays,
        },

        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTime'
        },
        {
            title: '更新时间',
            dataIndex: 'updateTime',
            valueType: 'dateTime'
        },

        {
            title: '原因',
            dataIndex: 'reason',
            valueType: 'textarea',
            render: (_, r) => r.reason || '-',
            span: 2,

        },
    ];
    return (
        <ProCard>
            <ProDescriptions
                column={2}
                columns={descColumns}
                dataSource={data}
            />
        </ProCard>

    )
}

export default LeaveDetail