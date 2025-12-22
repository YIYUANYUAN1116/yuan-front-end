import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { sysPostAdd, sysPostEdit } from '@/services/yuan/sysPostController';
import { ActionType, DrawerForm, ModalForm, ProFormRadio, ProFormText, ProFormTextArea } from '@ant-design/pro-components';
import React from 'react'

interface ModalFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysPostVo;
}

export const PostModalForm = (props: ModalFormProps) => {
  const { mode, trigger, reload, record } = props;
  const isEdit = mode == OperationModes.EDIT
  const { run: run, loading: loading } = useActionRequest(isEdit ? sysPostEdit : sysPostAdd, reload)

  return (
    <DrawerForm<API.SysPostBo>
      title={isEdit ? '编辑岗位' : '新增岗位'}
      trigger={trigger}
      initialValues={{
        ...record,
        status: record?.status ?? '0', // ⭐ 新增默认启用
      }}
      drawerProps={{
        destroyOnClose: true,
        closable: true, // 默认就是 true
      }}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
      width={520}
    >
      <ProFormText name="postId" hidden />

      <ProFormText
        width="md"
        name="postCode"
        label="岗位编码"
        placeholder="请输入岗位编码"
        rules={[{ required: true, message: '请输入岗位编码' }]}
      />
      <ProFormText
        width="md"
        name="postName"
        label="岗位名称"
        placeholder="请输入岗位名称"
        rules={[{ required: true, message: '请输入岗位名称' }]}
      />
      <ProFormText
        width="md"
        name="postSort"
        label="显示顺序"
        placeholder="请输入显示顺序"
        rules={[{ required: true, message: '请输入显示顺序' }]}
      />
      <ProFormRadio.Group
        width="md"
        name="status"
        label="状态"
        fieldProps={{
          buttonStyle: 'solid'
        }}
        options={[
          { label: '启用', value: '0' },
          { label: '禁用', value: '1' }
        ]}
        radioType="button"
      />
      <ProFormTextArea
        width="md"
        name="remark"
        label="备注"
        placeholder="请输入备注"
      />
    </DrawerForm>
  )
}
