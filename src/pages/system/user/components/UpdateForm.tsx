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


interface UpdateFormProps {
    reload?: ActionType['reload'];
    record?: API.SysUserBo;
}


const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { reload ,record} = props;
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
                    <Button  type="link">编辑</Button>
                 }
                 modalProps={{ okButtonProps: { loading } }}
                 onFinish={async (value) => {
                     await run({...value});
                     return true;
                 }}
                 initialValues={record}
             >
               <ProFormText
                         width="md"
                         name="userId"
                         hidden
               />
                 <ProForm.Group>
                     <ProFormText
                         width="md"
                         name="nickName"
                         label="用户名称"
                         placeholder="请输入用户名称"
                         rules={[{ required: true, message: '请输入用户名称' }]}
                     />
                     <ProFormText
                         width="md"
                         name="userName"
                         label="登录名称"
                         rules={[{ required: true, message: '请输入登录名称' }]}
                         placeholder="请输入登录名称"
                     />
                 </ProForm.Group>
 
                 <ProForm.Group>
                     <ProFormText
                         width="md"
                         name="email"
                         label="邮箱"
                         rules={[{ required: true, message: '请输入邮箱' }]}
                         placeholder="请输入邮箱"
                     />
                     <ProFormText
                         width="md"
                         name="phonenumber"
                         label="手机号"
                         placeholder="请输入手机号"
                     />
                 </ProForm.Group>
                 <ProForm.Group>
                     <ProFormSelect
                         width="md"
                         options={[
                             {
                                 value: 0,
                                 label: '男',
                             },
                             {
                                 value: 1,
                                 label: '女',
                             },
                             {
                                 value: 2,
                                 label: '未知',
                             }
                         ]}
                         name="sex"
                         label="性别"
                         rules={[{ required: true, message: '请输入性别' }]}
                     />
                     <ProFormSelect
                         width="md"
                         options={[
                             {
                                 value: 0,
                                 label: '启用',
                             },
                             {
                                 value: 1,
                                 label: '禁用',
                             }
                         ]}
                         name="status"
                         label="状态"
                     />
                 </ProForm.Group>
                 <ProFormText
                     name="deptName"
                     label="部门"
                     placeholder="请输入部门"
                 />
                 <ProFormTextArea
                     name="remark"
                     label="备注"
                     placeholder="请输入备注"
                 />
             </ModalForm>
         </>
     );
};

export default UpdateForm;
