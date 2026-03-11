import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { llmProviderAdd, llmProviderEdit } from '@/services/yuan/llmProviderController';
import { ActionType, DrawerForm, ModalForm, ProFormText } from '@ant-design/pro-components';
import React from 'react'

interface LlmProviderDrawerFormProps {
    mode: OperationMode;
    trigger?: React.ReactNode;
    reload?: ActionType['reload'];
    record?: API.LlmProviderVo;
}

export const LlmProviderDrawerForm = (props: LlmProviderDrawerFormProps) => {
    const { mode, trigger, reload, record } = props;
    const isEdit = mode == OperationModes.EDIT
    const { run: run, loading: loading } = useActionRequest(isEdit ? llmProviderEdit : llmProviderAdd, reload)

    return (
        <ModalForm<API.LlmProviderBo>
            title={isEdit ? '编辑供应商' : '新增供应商'}
            trigger={trigger}
            initialValues={{
                ...record,
            }}
            modalProps={{ okButtonProps: { loading } }}
            onFinish={async (values) => {
                run(values);
                return true;
            }}
            size='small'
            width={520}
        >
            <ProFormText name="id" hidden />

            <ProFormText
                name="name"
                label="供应商名称"
                placeholder="请输入供应商名称"
                rules={[{ required: true, message: '请输入供应商名称' }]}
            />
            <ProFormText

                name="code"
                label="供应商编码"
                placeholder="请输入供应商编码"
                rules={[{ required: true, message: '请输入供应商名称' }]}
            />

            <ProFormText
                name="protocol"
                label="接口协议"
                placeholder="请输入供应商接口协议"
                rules={[{ required: true, message: '请输入供应商接口协议' }]}
            />

            <ProFormText
                name="remark"
                label="备注"
                placeholder="请输入备注"
            />
        </ModalForm>
    )
}
