import { PlusOutlined } from '@ant-design/icons';
import {
    type ActionType,
    ModalForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Form, message } from 'antd';
import { useState, type FC } from 'react';
import api from '@/services/yuan/index'
import RoleForm from './RoleForm';


interface CreateFormProps {
    reload?: ActionType['reload'];
}

const CreateForm: FC<CreateFormProps> = (props) => {
    const { reload } = props;
    const intl = useIntl();
    const { run, loading } = useRequest(api.sysRoleController.add1, {
        manual: true,
        onSuccess: () => {
            reload?.();
        },
        onError: () => {
        },
    });
    const [form] = Form.useForm<API.SysRoleVo>();
   
    return (
        <>
            <ModalForm<API.SysRoleVo>
                title="新建角色"
                trigger={
                    <Button type="primary" icon={<PlusOutlined />}>
                        新建角色
                    </Button>
                }
                modalProps={{ okButtonProps: { loading } }}
                onFinish={async (value) => {
                    console.log(value)
                    await run({ ...value });
                    return true;
                }}
                form={form}
            >
            <RoleForm/>
            </ModalForm>
        </>
    );
};

export default CreateForm;
