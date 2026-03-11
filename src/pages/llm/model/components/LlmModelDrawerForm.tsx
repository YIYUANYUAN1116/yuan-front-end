import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { llmModelAdd, llmModelEdit } from '@/services/yuan/llmModelController';
import { selectEndpoint} from '@/services/yuan/llmEndpointController';
import { selectProvider } from '@/services/yuan/llmProviderController';
import {
  ActionType,
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import React, { useRef } from 'react';

interface LlmModelDrawerFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.LlmModelVo;
}

export const LlmModelDrawerForm = (props: LlmModelDrawerFormProps) => {
  const { mode, trigger, reload, record } = props;
  const isEdit = mode === OperationModes.EDIT;
  const formRef = useRef<any>();

  const { run, loading } = useActionRequest(
    isEdit ? llmModelEdit : llmModelAdd,
    reload,
  );

  return (
    <ModalForm<API.LlmModelBo>
      title={isEdit ? '编辑模型' : '新增模型'}
      trigger={trigger}
      formRef={formRef}
      initialValues={{
        status: '0',
        ...record,
      }}
      modalProps={{ destroyOnClose: true, okButtonProps: { loading } }}
      onFinish={async (values) => {
        await run(values);
        return true;
      }}
      width={520}
    >
      <ProFormText name="id" hidden />

      <ProFormText
        name="modelName"
        label="实际模型名称"
        placeholder="请输入实际模型名称"
        rules={[{ required: true, message: '请输入实际模型名称' }]}
      />

      <ProFormText
        name="displayName"
        label="显示模型名称"
        placeholder="请输入显示模型名称"
        rules={[{ required: true, message: '请输入显示模型名称' }]}
      />

      <ProFormSelect
        name="providerCode"
        label="供应商"
        placeholder="请选择供应商"
        rules={[{ required: true, message: '请选择供应商' }]}
        request={async () => {
          const res = await selectProvider();
          return res.data ?? [];
        }}
        fieldProps={{
          onChange: () => {
            formRef.current?.setFieldsValue({
              endpointKey: undefined,
            });
          },
        }}
      />

      <ProFormDependency name={['providerCode']}>
        {({ providerCode }) => {
          return (
            <ProFormSelect
              name="endpointKey"
              label="接入点"
              placeholder={providerCode ? '请选择接入点' : '请先选择供应商'}
              rules={[{ required: true, message: '请选择接入点' }]}
              disabled={!providerCode}
              params={{ providerCode }}
              request={async ({ providerCode }) => {
                if (!providerCode) {
                  return [];
                }
                const res = await selectEndpoint({providerCode:providerCode});
                return res.data ?? [];
              }}
            />
          );
        }}
      </ProFormDependency>

      <ProFormSelect
        name="status"
        label="状态"
        options={[
          { value: '0', label: '启用' },
          { value: '1', label: '禁用' },
        ]}
      />
    </ModalForm>
  );
};