import { type ActionType, ModalForm, ProForm, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-components';
import { Form } from 'antd';
import { type FC } from 'react';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { sysPostEdit } from '@/services/yuan/sysPostController';
import { authScopeOptions } from './AuthScopeOptions';


interface RoleModalFormProps {
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysPostVo;
}

const DataScopeModalForm: FC<RoleModalFormProps> = ({
  trigger,
  reload,
  record,
}) => {
  const [form] = Form.useForm<API.SysPostBo>();
  const { run: run, loading: loading } = useActionRequest(sysPostEdit)


  return (
    <ModalForm<API.SysPostBo>
      title={"数据权限"}
      trigger={trigger}
      form={form}
      initialValues={{ ...record }}
      modalProps={{ okButtonProps: { loading } }}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
    >
      <>
        <ProForm.Group>
          <ProFormText width="md" name="postId" hidden />

          <ProFormText
            width="md"
            name="postName"
            label="岗位名称"
            placeholder="请输入岗位名称"
            rules={[{ required: true, message: '请输入岗位名称' }]}
          />

          <ProFormSelect
            name="dataScope"
            label="数据权限"
            placeholder="请选择数据权限"
            options={authScopeOptions}
          />
        </ProForm.Group>
      </>
    </ModalForm>
  );
};

export default DataScopeModalForm;
