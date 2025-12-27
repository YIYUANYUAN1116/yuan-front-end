import { updateProfile } from "@/services/yuan/sysProfileController";
import { ProForm, ProFormRadio, ProFormText } from "@ant-design/pro-components";
import { Form } from "antd";
import { useEffect } from "react";

const BaseSettingForm = ({ initialValues }: { initialValues?: API.SysUserVo }) => {
  const [form] = Form.useForm();
  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);
  return (
    <ProForm
      size="middle"
      layout="horizontal"
      labelCol={{ span: 2 }}
      wrapperCol={{ span: 22 }}
      initialValues={initialValues}
      onFinish={async (values) => {
        await updateProfile(values);
        return true;
      }}
      form={form}
    >
      <ProFormText
        name="userId"
        width="md"
        hidden
      />

      <ProFormText
        name="nickName"
        label="昵称"
        width="md"
        rules={[{ required: true }]}
        colProps={{ span: 24 }}
      />

      <ProFormText
        name="email"
        label="邮箱"
        width="md"
        rules={[{ required: true, type: "email" }]}
        colProps={{ span: 24 }}
      />

      <ProFormRadio.Group
        name="sex"
        label="性别"
        width="md"
        options={[
          { label: "男", value: "1" },
          { label: "女", value: "2" },
          { label: "未知", value: "0" },
        ]}
        fieldProps={{
          buttonStyle: "solid",
        }}
        radioType="button"
        colProps={{ span: 24 }}
      />

      <ProFormText
        width="md"
        name="phonenumber"
        label="电话"
        colProps={{ span: 24 }}
      />
    </ProForm>
  );
};

export default BaseSettingForm;