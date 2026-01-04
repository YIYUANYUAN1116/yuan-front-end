import { type ActionType, ModalForm, ProForm, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-components';
import { Form } from 'antd';
import { type FC } from 'react';
import { useActionRequest } from '@/hooks/action/useActionRequest';

import { authScopeOptions } from './AuthScopeOptions';
import { sysRoleEdit } from '@/services/yuan/sysRoleController';


interface RoleModalFormProps {
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysRoleVo;
}

const DataScopeModalForm: FC<RoleModalFormProps> = ({
  trigger,
  reload,
  record,
}) => {
  const [form] = Form.useForm<API.SysRoleBo>();
  const { run: run, loading: loading } = useActionRequest(sysRoleEdit)


  return (
    <ModalForm<API.SysRoleBo>
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
            name="roleName"
            label="角色名称"
            placeholder="请输入角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
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
