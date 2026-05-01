import {
  type ActionType,
  ModalForm,
  ProFormDigit,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import type { FC, ReactNode } from 'react';
import { type OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import {
  schemaGroupAdd,
  schemaGroupEdit,
} from '@/services/yuan/schemaGroupController';

interface SchemaGroupModalFormProps {
  mode: OperationMode;
  trigger?: ReactNode;
  reload?: ActionType['reload'];
  record?: API.SchemaGroupVo;
}

const SchemaGroupModalForm: FC<SchemaGroupModalFormProps> = ({
  mode,
  trigger,
  reload,
  record,
}) => {
  const isEdit = mode === OperationModes.EDIT;
  const { run, loading } = useActionRequest(
    isEdit ? schemaGroupEdit : schemaGroupAdd,
    reload,
  );

  return (
    <ModalForm<API.SchemaGroupBo>
      title={isEdit ? '编辑模型分组' : '新增模型分组'}
      trigger={trigger}
      initialValues={{ ...record }}
      modalProps={{ destroyOnClose: true, okButtonProps: { loading } }}
      width={520}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
    >
      <ProFormText name="id" hidden />
      <ProFormText
        name="name"
        label="分组名称"
        placeholder="请输入分组名称"
        rules={[{ required: true, message: '请输入分组名称' }]}
      />
      <ProFormText
        name="code"
        label="分组编码"
        placeholder="请输入分组编码"
        rules={[{ required: true, message: '请输入分组编码' }]}
      />
      <ProFormText name="icon" label="图标" placeholder="请输入图标" />
      {/* <ProFormDigit
        name="sort"
        label="排序"
        min={0}
        fieldProps={{ precision: 0 }}
      /> */}
      <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />
    </ModalForm>
  );
};

export default SchemaGroupModalForm;
