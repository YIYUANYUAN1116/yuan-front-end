import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { sysDeptTreeselect } from '@/services/yuan/sysDeptController';
import { sysUserAdd, sysUserEdit } from '@/services/yuan/sysUserController';
import { convertTree } from '@/util/TreeUtils';
import { type ActionType, ModalForm, ProForm, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-components';
import { Form } from 'antd';
import { useState, type FC } from 'react';


interface UserModalFormProps {
  mode: OperationMode;
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
  const isEdit = mode === OperationModes.EDIT;
  const { run: run, loading: loading } = useActionRequest(isEdit ? sysUserEdit : sysUserAdd, reload)
  const [form] = Form.useForm<API.SysUserBo>();
  const [treeData, setTreeData] = useState<any[]>([]);


  return (
    <ModalForm<API.SysUserBo>
      title={isEdit ? '编辑用户' : '新建用户'}
      trigger={trigger}
      form={form}
      initialValues={record}
      modalProps={{ okButtonProps: { loading } }}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
      onOpenChange={async (visible) => {
        if (visible) {
          const res = await sysDeptTreeselect({
            bo: {}
          } as API.sysMenuTreeselectParams);
          setTreeData(convertTree(res.data?.treeList || []));
        }
      }}
    >
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

        <ProFormTreeSelect
          name="deptId"
          label="部门"
          placeholder="请选择部门"
          fieldProps={{
            treeData: treeData, // ← 接口返回的菜单树
            showSearch: true,
            treeNodeFilterProp: "deptName",
          }}
          rules={[{ required: true, message: "请选择部门" }]}
        />

        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />

        {/* 隐藏的userId，只在编辑时用 */}
        <ProFormText name="userId" hidden />
      </>
    </ModalForm>
  );
};

export default UserModalForm;
