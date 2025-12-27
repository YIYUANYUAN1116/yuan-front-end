import { updatePwd } from '@/services/yuan/sysProfileController';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import React from 'react'

const SecurityForm = () => {
    return (
        <ProForm<API.SysUserPasswordBo>
            size="middle"
            layout="horizontal"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21}}
            onFinish={async (values) => {
                await updatePwd(values);
                return true;
            }}
        >
            <ProFormText
                name="oldPassword"
                label="原密码"
                width="md"
                rules={[{ required: true, message: "请输入原密码" }]}
                placeholder={"请输入原密码"}
                colProps={{ span: 24 }}
            />
            <ProFormText
                name="newPassword"
                label="新密码"
                width="md"
                rules={[{ required: true, message: "请输入新密码" }]}
                placeholder={"请输入新密码"}
                colProps={{ span: 24 }}
            />

            <ProFormText
                name="confirmPassword"
                label="确认密码"
                width="md"
                colProps={{ span: 24 }}
                rules={[{ required: true, message: "请输入确认密码" }]}
                placeholder={"请输入确认密码"}

            />
        </ProForm>
    )
}

export default SecurityForm