import {
    ActionType,
    ModalForm,
    ProForm,
    ProFormDateTimePicker,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    StepsForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Form, Modal, message } from 'antd';
import React, { cloneElement, useCallback, useState } from 'react';
import { updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import api from '@/services/yuan/index'
import UserForm from './UserForm';


interface UpdateFormProps {
    reload?: ActionType['reload'];
    record?: API.SysUserBo;
}


const UpdateForm: React.FC<UpdateFormProps> = (props) => {
    const { reload, record } = props;
    const intl = useIntl();
    const { run, loading } = useRequest(api.sysUserController.edit, {
        manual: true,
        onSuccess: () => {
            reload?.();
        },
        onError: () => {
        },
    });

    const [form] = Form.useForm<API.SysUserBo>();
    return (
        <>
            <ModalForm<API.SysUserBo>
                title="编辑用户"
                trigger={
                    <Button type="link">编辑</Button>
                }
                modalProps={{ okButtonProps: { loading } }}
                onFinish={async (value) => {
                    await run({ ...value });
                    return true;
                }}
                initialValues={record}
            >
                <UserForm />
            </ModalForm>
        </>
    );
};

export default UpdateForm;
