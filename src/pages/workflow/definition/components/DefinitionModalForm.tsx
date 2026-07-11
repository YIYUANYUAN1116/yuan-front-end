import { OperationMode, OperationModes } from '@/const/Const';
import { wfDefinitionAdd, wfDefinitionEdit } from '@/services/yuan/wfDefinitionController';
import { DrawerForm, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { message } from 'antd';
import type { FC } from 'react';
import { initialFlowData } from '../../designer/types.ts/DesiginerTypes';

interface Props {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: () => void;
  record?: API.WfDefinitionVo;
}

const DefinitionModalForm: FC<Props> = ({ mode, trigger, reload, record }) => {
  const isEdit = mode === OperationModes.EDIT;
  return (
    <DrawerForm<API.WfDefinitionBo>
      title={isEdit ? '编辑流程定义' : '新建流程定义'}
      trigger={trigger}
      initialValues={isEdit ? record : { initialDefinitionJson: JSON.stringify(initialFlowData), initialFormSchema: '{}' }}
      width={520}
      onFinish={async (values) => {
        if (isEdit) await wfDefinitionEdit({ id: record?.id, definitionKey: values.definitionKey, definitionName: values.definitionName, remark: values.remark });
        else await wfDefinitionAdd(values);
        message.success(isEdit ? '流程定义已更新' : '流程定义已创建，并生成 v1 草稿');
        reload?.();
        return true;
      }}
    >
      <ProFormText name="definitionName" label="流程名称" rules={[{ required: true }]} />
      <ProFormText name="definitionKey" label="流程业务标识" rules={[{ required: true }]} disabled={isEdit} />
      <ProFormTextArea name="remark" label="备注" />
      {!isEdit && <ProFormTextArea name="initialDefinitionJson" label="初始流程 JSON" rules={[{ required: true }]} fieldProps={{ autoSize: { minRows: 4, maxRows: 10 } }} />}
      {!isEdit && <ProFormTextArea name="initialFormSchema" label="初始表单 Schema" fieldProps={{ autoSize: { minRows: 3, maxRows: 8 } }} />}
    </DrawerForm>
  );
};
export default DefinitionModalForm;