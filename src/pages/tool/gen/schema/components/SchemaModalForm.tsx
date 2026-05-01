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
import { schemaAdd, schemaEdit } from '@/services/yuan/schemaController';
import {
  querySchemaGroupOptions,
  queryTableNameOptions,
  statusOptions,
} from '../../utils';

interface SchemaModalFormProps {
  mode: OperationMode;
  trigger?: ReactNode;
  reload?: ActionType['reload'];
  record?: API.SchemaVo;
  schemaGroupId?: string | null;
}

const SchemaModalForm: FC<SchemaModalFormProps> = ({
  mode,
  trigger,
  reload,
  record,
  schemaGroupId,
}) => {
  const isEdit = mode === OperationModes.EDIT;
  const { run, loading } = useActionRequest(
    isEdit ? schemaEdit : schemaAdd,
    reload,
  );

  return (
    <ModalForm<API.SchemaBo>
      title={isEdit ? '编辑数据模型' : '新增数据模型'}
      trigger={trigger}
      initialValues={{ status: '0', schemaGroupId, ...record }}
      modalProps={{ destroyOnClose: true, okButtonProps: { loading } }}
      width={620}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
    >
      <ProFormText name="id" hidden />
      <ProFormSelect
        name="schemaGroupId"
        label="模型分组"
        placeholder="请选择模型分组"
        request={querySchemaGroupOptions}
        fieldProps={{
          showSearch: true,
          optionFilterProp: 'label',
        }}
        rules={[{ required: true, message: '请选择模型分组' }]}
      />
      <ProFormText
        name="name"
        label="模型名称"
        placeholder="请输入模型名称"
        rules={[{ required: true, message: '请输入模型名称' }]}
      />
      <ProFormSelect
        name="tableName"
        label="表名"
        placeholder="请选择或输入表名"
        request={queryTableNameOptions}
        fieldProps={{
          showSearch: true,
          optionFilterProp: 'label',
        }}
        rules={[{ required: true, message: '请输入表名' }]}
      />
      <Collapse
        ghost
        items={[
          {
            key: 'optional',
            label: '更多配置',
            children: (
              <>
                <ProFormText
                  name="code"
                  label="模型编码"
                  placeholder="请输入模型编码"
                />
                <ProFormText
                  name="comment"
                  label="表注释"
                  placeholder="请输入表注释"
                />
                <ProFormText
                  name="dictType"
                  label="字典"
                  placeholder="请输入字典类型"
                />
                <ProFormText
                  name="engine"
                  label="存储引擎"
                  placeholder="请输入存储引擎"
                />
                <ProFormSelect
                  name="status"
                  label="状态"
                  options={statusOptions}
                />
                {/* <ProFormDigit
                  name="sort"
                  label="排序"
                  min={0}
                  fieldProps={{ precision: 0 }}
                /> */}
                <ProFormText
                  name="listKeys"
                  label="列表字段"
                  placeholder="请输入列表字段，多个用英文逗号分隔"
                />
                <ProFormText
                  name="searchFormKeys"
                  label="搜索字段"
                  placeholder="请输入搜索字段，多个用英文逗号分隔"
                />
                <ProFormTextArea name="designer" label="表单设计" />
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

export default SchemaModalForm;
