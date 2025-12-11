import {
  ActionType,
  ModalForm,
  ProForm,
  ProFormDateTimePicker,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
  StepsForm,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl, useRequest } from '@umijs/max';
import { Button, Form, Modal, message } from 'antd';
import React, { cloneElement, useCallback, useState } from 'react';
import { updateRule } from '@/services/ant-design-pro/api';
import { PlusOutlined } from '@ant-design/icons';
import api from '@/services/yuan/index'
import RoleForm from './RoleForm';


interface UpdateFormProps {
    reload?: ActionType['reload'];
    record?: API.SysRoleBo;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => {
  const { reload ,record} = props;
     const intl = useIntl();
     const { run, loading } = useRequest(api.sysRoleController.edit1, {
         manual: true,
         onSuccess: () => {
             reload?.();
         },
         onError: () => {
         },
     });
 
     const [form] = Form.useForm<API.SysRoleBo>();
 
     return (
         <>
             <ModalForm<API.SysRoleBo>
                 title="编辑角色"
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
              <RoleForm/>
             </ModalForm>
         </>
     );
};

export default UpdateForm;
