import {
  ModalForm,
  ProFormDependency,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';
import {
  batchGenCode,
  batchGenFrontendCode,
} from '@/services/yuan/genController';
import { querySchemaOptions } from '../../utils';

interface SchemaOption {
  label?: string;
  value?: string;
  tableName?: string;
  name?: string;
}

interface CodeGenerateModalFormProps {
  trigger?: ReactNode;
  schemaId?: string;
}

const CodeGenerateModalForm: FC<CodeGenerateModalFormProps> = ({
  trigger,
  schemaId,
}) => {
  const [schemaOptions, setSchemaOptions] = useState<SchemaOption[]>([]);
  const [loading, setLoading] = useState(false);

  const loadSchemaOptions = async () => {
    const options = (await querySchemaOptions()) as SchemaOption[];
    setSchemaOptions(options);
    return options;
  };

  return (
    <ModalForm<{
      schemaId: string;
      genType: 'backend' | 'frontend';
      workPath?: string;
      previewCode?: string;
    }>
      title="代码生成"
      trigger={trigger}
      initialValues={{
        schemaId,
        genType: 'backend',
        workPath: '/Users/yuan/VscodeProjects/yuan-front-end',
      }}
      modalProps={{ destroyOnClose: true, okButtonProps: { loading } }}
      width={640}
      onFinish={async (values) => {
        const schema = schemaOptions.find(
          (item) => item.value === values.schemaId,
        );
        if (!schema?.tableName) {
          return false;
        }

        setLoading(true);
        try {
          if (values.genType === 'backend') {
            await batchGenCode({ tableNameStr: schema.tableName });
          } else {
            await batchGenFrontendCode({
              workPath: values.workPath || '',
              previewCode: values.previewCode || '',
            });
          }
          return true;
        } catch (_error: any) {
          return false;
        } finally {
          setLoading(false);
        }
      }}
    >
      <ProFormSelect
        name="schemaId"
        label="数据模型"
        placeholder="请选择数据模型"
        request={loadSchemaOptions}
        fieldProps={{ showSearch: true, optionFilterProp: 'label' }}
        rules={[{ required: true, message: '请选择数据模型' }]}
      />
      <ProFormSelect
        name="genType"
        label="代码类型"
        options={[
          { label: '后端代码', value: 'backend' },
          { label: '前端代码', value: 'frontend' },
        ]}
        rules={[{ required: true, message: '请选择代码类型' }]}
      />
      <ProFormDependency name={['genType']}>
        {({ genType }) =>
          genType === 'frontend' ? (
            <>
              <ProFormText
                name="workPath"
                label="执行目录"
                placeholder="请输入前端项目路径"
                rules={[{ required: true, message: '请输入执行目录' }]}
              />
              <ProFormTextArea
                name="previewCode"
                label="生成命令"
                placeholder="请输入需要在执行目录运行的前端生成命令"
                rules={[{ required: true, message: '请输入生成命令' }]}
              />
            </>
          ) : null
        }
      </ProFormDependency>
    </ModalForm>
  );
};

export default CodeGenerateModalForm;
