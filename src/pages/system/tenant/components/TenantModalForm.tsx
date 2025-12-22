import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { sysTenantAdd, sysTenantEdit } from '@/services/yuan/sysTenantController';
import { ActionType, ModalForm, ProForm, ProFormGroup, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import { Button } from 'antd';
import React from 'react'

interface TenantModalFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysTenantVo;
}

export const TenantModalForm = (props: TenantModalFormProps) => {
  const { mode, trigger, reload, record } = props;
  const isEdit = mode == OperationModes.EDIT
  const { run: run, loading: loading } = useActionRequest(isEdit ? sysTenantEdit : sysTenantAdd, reload)

  return (
    <ModalForm<API.SysTenantBo>
      title={isEdit ? '编辑租户' : '新增租户'}
      trigger={trigger}
       initialValues={{
        ...record,
        status: record?.status ?? '0', // ⭐ 新增默认启用
      }}
      modalProps={{ okButtonProps: { loading } }}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
    >
      <ProFormText name="id" hidden />
      <ProForm.Group>
        <ProFormText
          width="md"
          name="tenantId"
          label="租户编号"
          placeholder="请输入租户编号"
          rules={[{ required: true, message: '请输入租户编号' }]}
        />
        <ProFormRadio.Group
          width="md"
          name="status"
          label="租户状态"
          fieldProps={{
            buttonStyle: 'solid'
          }}
          options={[
            { label: '启用', value: '0' },
            { label: '禁用', value: '1' }
          ]}
          radioType="button"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="companyName"
          label="企业名称"
          placeholder="请输入企业名称"
          rules={[{ required: true, message: '请输入租户编号' }]}
        />
        <ProFormText
          width="md"
          name="licenseNumber"
          label="统一社会信用代码"
          placeholder="请输入统一社会信用代码"
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="contactUserName"
          label="联系人"
          placeholder="请输入联系人"
        />
        <ProFormText
          width="md"
          name="contactPhone"
          label="联系电话"
          placeholder="请输入联系电话"
        
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="packageId"
          label="租户套餐编号"
          placeholder="请输入租户套餐编号"
        />
        <ProFormText
          width="md"
          name="accountCount"
          label="用户数量"
          placeholder="请输入用户数量"
          tooltip="-1不限制"
        />
      </ProForm.Group>

      <ProFormText
        width="xl"
        name="address"
        label="地址"
        placeholder="请输入地址"
      />

      <ProFormText
        width="xl"
        name="domain"
        label="域名"
        placeholder="请输入域名"
      />

      <ProForm.Group>
        <ProFormTextArea
          width="md"
          name="intro"
          label="企业简介"
          placeholder="请输入企业简介"
        />

        <ProFormTextArea
          width="md"
          name="remark"
          label="备注"
          placeholder="请输入备注"
        />
      </ProForm.Group>
    </ModalForm>
  )
}
