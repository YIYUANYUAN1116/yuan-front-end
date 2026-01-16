import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Button, Card, Divider, message, Space } from 'antd';
import { PageContainer, ProForm, ProFormDateTimePicker, ProFormSelect, ProFormTextArea, ProFormText, ProFormDateTimeRangePicker, FooterToolbar } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import { history, useRequest, useSearchParams } from '@umijs/max';
import dayjs from 'dayjs';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { DictEnum } from '@/const/dict-enum';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { oaLeaveApplyAdd, oaLeaveApplyEdit, oaLeaveApplyGetInfoByBizNo } from '@/services/yuan/oaLeaveApplyController';

type SubmitAction = 'SAVE_DRAFT' | 'SUBMIT';

const OaLeaveApplyForm: React.FC = () => {
    const formRef = useRef<ProFormInstance | undefined>(undefined)
    const actionRef = useRef<SubmitAction>('SAVE_DRAFT'); // 默认
    const [sp] = useSearchParams();
    const bizNo = useMemo(() => {
        return sp.get('bizNo');
    }, [sp]);
    const mode = useMemo(() => sp.get('mode') || (bizNo ? 'view' : 'create'), [sp, bizNo]);
    const isCreate = mode === 'create';
    const isEdit = mode === 'edit';

    const leaveTypeEnum = useDictDataValueEnum(DictEnum.OA_LEAVE_TYPE);
    const { run: run } = useActionRequest(isEdit ? oaLeaveApplyEdit : oaLeaveApplyAdd)

    const { data: detail, loading, run: fetchDetail } = useRequest(
        (bizNo: string) => oaLeaveApplyGetInfoByBizNo({ bizNo: bizNo }),        // 👈 请求函数
        {
            manual: true,               // 👈 手动触发
            onSuccess: (d) => {
                if (d)
                    formRef.current?.setFieldsValue({
                        leaveType: d.leaveType,
                        reason: d.reason,
                        timeRange: [
                            dayjs(d.startTime),
                            dayjs(d.endTime),
                        ],
                        leaveDays: d.leaveDays,
                    });
            },
            onError: (e: any) => {
                message.error(e?.message || '加载详情失败');
            },
        }
    );

    useEffect(() => {
        if (bizNo && !isCreate) {
            fetchDetail(bizNo);
        }
    }, [bizNo, isCreate, fetchDetail]);

    return (
        <PageContainer
            title={isCreate ? '新建请假' : isEdit ? '编辑请假' : '请假详情'}
            onBack={() => history.back()}
        >
            <Card>
                {/* 顶部一些只读信息（查看/编辑都可以展示） */}
                {detail && (
                    <>
                        <Space wrap>
                            <span>单号：{detail.applyNo}</span>
                            <span>申请人：{detail.applicantName}</span>
                            {detail.applicantDeptName && <span>部门：{detail.applicantDeptName}</span>}
                            <span>状态：{detail.status}</span>
                        </Space>
                        <Divider />
                    </>
                )}

                <ProForm<API.OaLeaveApplyBo>
                    formRef={formRef}
                    layout="horizontal"
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    onValuesChange={(_, allValues) => {
                        const { timeRange } = allValues;
                        if (timeRange?.[0] && timeRange?.[1]) {
                            const start = dayjs(timeRange[0]);
                            const end = dayjs(timeRange[1]);
                            if (start.isValid() && end.isValid() && end.isAfter(start)) {
                                const days = end.diff(start, 'day'); // 返回整数天数
                                formRef.current?.setFieldsValue({ leaveDays: days.toString() });
                            }
                        }
                    }}


                    submitter={{
                        // ✅ 自定义按钮放 submitter
                        render: (props, dom) => {
                            return <FooterToolbar>
                                <Button
                                    key="reset"
                                    onClick={() => {
                                        props.form?.resetFields?.();
                                    }}
                                >
                                    重置
                                </Button>
                                <Button
                                    key="draft"
                                    onClick={() => {
                                        actionRef.current = 'SAVE_DRAFT';
                                        // 触发表单校验 + onFinish
                                        props.form?.submit?.();
                                    }}
                                >
                                    保存草稿
                                </Button>
                                <Button
                                    key="submit"
                                    type="primary"
                                    onClick={() => {
                                        actionRef.current = 'SUBMIT';
                                        props.form?.submit?.();
                                    }}
                                >
                                    提交发起
                                </Button>
                            </FooterToolbar>;
                        },
                    }}
                    onFinish={async (values) => {
                        const action = actionRef.current; // 

                        // 1) 统一把 timeRange 拆成 startTime/endTime
                        const range = values.timeRange;
                        const [start, end] = Array.isArray(range) ? range : [];
                        const startTime = dayjs(start).format('YYYY-MM-DD HH:mm:ss');
                        const endTime = dayjs(end).format('YYYY-MM-DD HH:mm:ss');

                        const body = {
                            ...values,
                            startTime,
                            endTime,
                            status: action === 'SAVE_DRAFT' ? 'DRAFT' : 'APPROVING',
                        };
                        run(body as API.OaLeaveApplyBo)

                        history.push("/oa/leave")
                        return true;
                    }}

                >
                    <ProFormSelect
                        name="leaveType"
                        label="请假类型"
                        valueEnum={leaveTypeEnum}
                        rules={[{ required: true, message: '请选择请假类型' }]}
                    />
                    <ProFormDateTimeRangePicker
                        name="timeRange"
                        label="请假时间"
                        rules={[
                            { required: true, message: '请选择请假时间范围' },
                            {
                                validator: async (_, value) => {
                                    if (!value || value.length !== 2) return;
                                    const [start, end] = value;
                                    if (!dayjs(start).isValid() || !dayjs(end).isValid()) return;
                                    if (!dayjs(end).isAfter(dayjs(start))) {
                                        throw new Error('结束时间必须晚于开始时间');
                                    }
                                },
                            },
                        ]}
                        fieldProps={{
                            format: 'YYYY-MM-DD HH:mm:ss',
                            showTime: true,
                        }}
                    />

                    <ProFormText
                        name="leaveDays"
                        label="请假天数"
                        readonly
                        fieldProps={{ placeholder: '自动计算' }}
                    />

                    <ProFormTextArea
                        name="reason"
                        label="请假原因"
                        placeholder="请输入请假原因"
                        fieldProps={{ maxLength: 255, showCount: true, rows: 4 }}
                        rules={[{ required: true, message: '请填写请假原因' }]}
                    />
                </ProForm>
            </Card>
        </PageContainer>
    );
};

export default OaLeaveApplyForm;
