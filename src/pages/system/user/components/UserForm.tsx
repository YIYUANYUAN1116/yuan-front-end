import { ProFormText, ProFormSelect, ProFormTextArea, ProForm } from '@ant-design/pro-components';
import type { FC } from 'react';

const UserForm = () => {
  return (
    <>
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
          placeholder="请输入登录名称"
          rules={[{ required: true, message: '请输入登录名称' }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormText
          width="md"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          rules={[{ required: true, message: '请输入邮箱' }]}
        />
        <ProFormText
          width="md"
          name="phonenumber"
          label="手机号"
          placeholder="请输入手机号"
          rules={[{ pattern: /^1[3-9]\d{9}$/, message: '手机号格式错误' }]}
        />
      </ProForm.Group>

      <ProForm.Group>
        <ProFormSelect
          width="md"
          name="sex"
          label="性别"
          options={[
            { value: "0", label: '男', color: 'blue' }, // 添加颜色
            { value: "1", label: '女', color: 'pink' },
            { value: "2", label: '未知', color: 'gray' },
          ]}
          rules={[{ required: true, message: '请选择性别' }]}
        />
        <ProFormSelect
          width="md"
          name="status"
          label="状态"
          options={[
            { value: "0", label: '启用' },
            { value: "1", label: '禁用' },
          ]}
        />
      </ProForm.Group>

      <ProFormText name="deptName" label="部门" placeholder="请输入部门" />
      <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />

      {/* 隐藏的userId，只在编辑时用 */}
      <ProFormText name="userId" hidden />
    </>
  );
};

export default UserForm;