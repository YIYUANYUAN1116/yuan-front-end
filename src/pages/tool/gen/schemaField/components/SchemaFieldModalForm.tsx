import {
  type ActionType,
  ModalForm,
  ProFormDigit,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { Collapse } from 'antd';
import type { FC, ReactNode } from 'react';
import { type OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import {
  schemaFieldAdd,
  schemaFieldEdit,
} from '@/services/yuan/schemaFieldController';
import {
  fieldTypeOptions,
  htmlTypeOptions,
  querySchemaOptions,
  queryTypeOptions,
  yesNoOptions,
} from '../../utils';

interface SchemaFieldModalFormProps {
  mode: OperationMode;
  trigger?: ReactNode;
  reload?: ActionType['reload'];
  record?: API.SchemaFieldVo;
  schemaId?: string | null;
}

const SchemaFieldModalForm: FC<SchemaFieldModalFormProps> = ({
  mode,
  trigger,
  reload,
  record,
  schemaId,
}) => {
  const isEdit = mode === OperationModes.EDIT;
  const { run, loading } = useActionRequest(
    isEdit ? schemaFieldEdit : schemaFieldAdd,
    reload,
  );

  return (
    <ModalForm<API.SchemaFieldBo>
      title={isEdit ? '编辑模型字段' : '新增模型字段'}
      trigger={trigger}
      initialValues={{
        schemaId,
        isPk: '0',
        isRequired: '0',
        isUnique: '0',
        isList: '1',
        isQuery: '1',
        isInsert: '1',
        isEdit: '1',
        queryType: 'EQ',
        htmlType: 'input',
        ...record,
      }}
      modalProps={{ destroyOnClose: true, okButtonProps: { loading } }}
      width={760}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
    >
      <ProFormText name="id" hidden />
      <ProFormSelect
        name="schemaId"
        label="数据模型"
        placeholder="请选择数据模型"
        request={querySchemaOptions}
        fieldProps={{ showSearch: true, optionFilterProp: 'label' }}
        rules={[{ required: true, message: '请选择数据模型' }]}
      />
      <ProFormText
        name="name"
        label="字段名称"
        placeholder="请输入字段名称"
        rules={[{ required: true, message: '请输入字段名称' }]}
      />
      <ProFormText
        name="code"
        label="字段编码"
        placeholder="请输入字段编码"
        rules={[{ required: true, message: '请输入字段编码' }]}
      />
      <Collapse
        ghost
        items={[
          {
            key: 'optional',
            label: '更多配置',
            children: (
              <>
                <ProFormSelect
                  name="type"
                  label="字段类型"
                  placeholder="请选择字段类型"
                  options={fieldTypeOptions}
                  fieldProps={{ showSearch: true }}
                />
                <ProFormText
                  name="comment"
                  label="字段注释"
                  placeholder="请输入字段注释"
                />
                <ProFormDigit
                  name="length"
                  label="字段长度"
                  min={0}
                  fieldProps={{ precision: 0 }}
                />
                <ProFormDigit
                  name="scale"
                  label="小数位数"
                  min={0}
                  fieldProps={{ precision: 0 }}
                />
                <ProFormDigit
                  name="sort"
                  label="排序"
                  min={0}
                  fieldProps={{ precision: 0 }}
                />
                <ProFormSelect
                  name="isPk"
                  label="主键"
                  options={yesNoOptions}
                />
                <ProFormSelect
                  name="isRequired"
                  label="必填"
                  options={yesNoOptions}
                />
                <ProFormSelect
                  name="isUnique"
                  label="唯一"
                  options={yesNoOptions}
                />
                <ProFormSelect
                  name="isList"
                  label="列表显示"
                  options={yesNoOptions}
                />
                <ProFormSelect
                  name="isQuery"
                  label="查询字段"
                  options={yesNoOptions}
                />
                <ProFormSelect
                  name="isInsert"
                  label="插入字段"
                  options={yesNoOptions}
                />
                <ProFormSelect
                  name="isEdit"
                  label="编辑字段"
                  options={yesNoOptions}
                />
                <ProFormSelect
                  name="queryType"
                  label="查询方式"
                  options={queryTypeOptions}
                />
                <ProFormSelect
                  name="htmlType"
                  label="显示类型"
                  options={htmlTypeOptions}
                />
                <ProFormText
                  name="dictType"
                  label="字典类型"
                  placeholder="请输入字典类型"
                />
                <ProFormText
                  name="defaultValue"
                  label="默认值"
                  placeholder="请输入默认值"
                />
                <ProFormTextArea
                  name="remark"
                  label="备注"
                  placeholder="请输入备注"
                />
              </>
            ),
          },
        ]}
      />
    </ModalForm>
  );
};

export default SchemaFieldModalForm;
