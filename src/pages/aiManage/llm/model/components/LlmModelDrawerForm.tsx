import { OperationMode, OperationModes } from '@/const/Const';
import { DictEnum } from '@/const/dict-enum';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { selectEndpointByProvider } from '@/services/yuan/llmEndpointController';
import { llmModelAdd, llmModelEdit } from '@/services/yuan/llmModelController';
import { selectProvider } from '@/services/yuan/llmProviderController';
import {
  type ActionType,
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { useRef } from 'react';

interface LlmModelDrawerFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.LlmModelVo;
}

export const LlmModelDrawerForm = (props: LlmModelDrawerFormProps) => {
  const { mode, trigger, reload, record } = props;
  const isEdit = mode === OperationModes.EDIT;
  const formRef = useRef<any>(null);
  const modelTypeEnum = useDictDataValueEnum(DictEnum.AI_MODEL_TYPE);

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
        name="modelType"
        label="模型类型"
        placeholder="请选择模型类型"
        valueEnum={modelTypeEnum}
        rules={[{ required: true, message: '请选择模型类型' }]}
      />

      <ProFormSelect
        name="providerId"
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
              endpointId: undefined,
            });
          },
        }}
      />

      <ProFormDependency name={['providerId']}>
        {({ providerId }) => {
          return (
            <ProFormSelect
              name="endpointId"
              label="接入点"
              placeholder={providerId ? '请选择接入点' : '请先选择供应商'}
              rules={[{ required: true, message: '请选择接入点' }]}
              disabled={!providerId}
              params={{ providerId }}
              request={async ({ providerId }) => {
                if (!providerId) {
                  return [];
                }
                const res = await selectEndpointByProvider({ providerId });
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
