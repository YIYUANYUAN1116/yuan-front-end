import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { llmEndpointAdd, llmEndpointEdit } from '@/services/yuan/llmEndpointController';
import { selectProvider } from '@/services/yuan/llmProviderController';
import { ActionType, DrawerForm, ModalForm, ProCard, ProFormSelect, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Alert } from 'antd';
import React from 'react'

interface LlmEndpointDrawerFormProps {
    mode: OperationMode;
    trigger?: React.ReactNode;
    reload?: ActionType['reload'];
    record?: API.LlmEndpointVo;
}

export const LlmEndpointDrawerForm = (props: LlmEndpointDrawerFormProps) => {
    const { mode, trigger, reload, record } = props;
    const isEdit = mode == OperationModes.EDIT
    const { run: run, loading: loading } = useActionRequest(isEdit ? llmEndpointEdit : llmEndpointAdd, reload)
    
    return (
        <ModalForm<API.LlmEndpointBo>
            title={isEdit ? '编辑接入点' : '新增接入点'}
            trigger={trigger}
            initialValues={{
                status: '0',
                ...record,
            }}
            modalProps={{ okButtonProps: { loading } }}
            onFinish={async (values) => {
                run(values);
                return true;
            }}
            size='middle'
            width={520}
        >
            <ProFormText name="id" hidden />

            <ProFormText
                name="endpointName"
                label="接入点名称"
                placeholder="请输入接入点名称"
                rules={[{ required: true, message: '请输入接入点名称' }]}
            />

            <ProFormText
                name="endpointCode"
                label="接入点编号"
                placeholder="请输入接入点编号"
                rules={[{ required: true, message: '请输入接入点编号' }]}
            />

            <ProFormSelect
                name="providerId"
                label="供应商"
                placeholder="请选择供应商"
                rules={[{ required: true, message: '请选择供应商' }]}
                request={async () => {
                    const res = await selectProvider();
                    return res.data ? res.data : []
                }}
            />

            <ProFormText
                name="baseUrl"
                label="地址"
                placeholder="请输入接入点地址"
                rules={[{ required: true, message: '请输入请输入接入点地址' }]}
            />

            <ProFormText
                name="apiKey"
                label="密钥"
                placeholder="请输入密钥"
                rules={[{ required: true, message: '请输入密钥' }]}
            />

            <ProFormSelect
                width="md"
                name="status"
                label="状态"
                options={[
                    { value: '0', label: '启用' },
                    { value: '1', label: '禁用' },
                ]}
            />
            <ProCard
                title="高级配置"
                bordered
                headerBordered
                collapsible
                defaultCollapsed
            >
                <Alert
                    type="info"
                    showIcon
                    message="用于兼容不同供应商的路径/鉴权差异（如 Ark: /api/v3/chat/completions）"
                    style={{ marginBottom: 10 }}
                />
                <ProFormText
                    name="chatCompletionsPath"
                    label="Chat Completions Path"
                    placeholder="/v1/chat/completions"
                />
                <ProFormText
                    name="embeddingsPath"
                    label="Embeddings Path"
                    placeholder="/v1/embeddings"
                />
                <ProFormText
                    name="authHeaderName"
                    label="Auth Header Name"
                    placeholder="Authorization"
                />
                <ProFormText
                    name="authHeaderPrefix"
                    label="Auth Header Prefix"
                    placeholder="Bearer "
                />
                <ProFormTextArea
                    name="extraHeadersJson"
                    label="Extra Headers (JSON)"
                    fieldProps={{ rows: 3 }}
                    placeholder='{"X-Project-Id":"xxx"}'
                />
                <ProFormTextArea
                    name="extraParamsJson"
                    label="Extra Params (JSON)"
                    fieldProps={{ rows: 3 }}
                    placeholder='{"api-version":"2025-01-01"}'
                />
                <ProFormTextArea
                    name="remark"
                    label="备注"
                    fieldProps={{ rows: 2 }}
                />
            </ProCard>
        </ModalForm>
    )
}
