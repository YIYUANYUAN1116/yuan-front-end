import { type ActionType, ModalForm } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Form } from 'antd';
import type { FC } from 'react';
import api from '@/services/yuan/index';
import UserForm from './UserForm';

interface UserModalFormProps {
  mode: 'add' | 'edit';
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysUserVo;
}

const UserModalForm: FC<UserModalFormProps> = ({
  mode,
  trigger,
  reload,
  record,
}) => {
  const isEdit = mode === 'edit';

  const { run, loading } = useRequest(
    isEdit ? api.sysUserController.edit : api.sysUserController.add,
    {
      manual: true,
      onSuccess: () => reload?.(),
    },
  );

  const [form] = Form.useForm<API.SysUserBo>();

  return (
    <ModalForm<API.SysUserBo>
      title={isEdit ? '编辑用户' : '新建用户'}
      trigger={trigger}
      form={form}
      initialValues={record}
      modalProps={{ okButtonProps: { loading } }}
      onFinish={async (values) => {
        await run(values);
        return true;
      }}
    >
      <UserForm />
    </ModalForm>
  );
};

export default UserModalForm;
