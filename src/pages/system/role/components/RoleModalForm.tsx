import { type ActionType, ModalForm, ProForm, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Form } from 'antd';
import { useState, type FC } from 'react';
import api from '@/services/yuan/index';
import { sysMenuTreeselect } from '@/services/yuan/sysMenuController';
import { DataNode } from 'antd/es/tree';
import { convertTree } from '@/utils/TreeUtils';

interface RoleModalFormProps {
  mode: 'add' | 'edit';
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysRoleVo;
}

const UserModalForm: FC<RoleModalFormProps> = ({
  mode,
  trigger,
  reload,
  record,
}) => {
  const [menuTree, setMenuTree] = useState<DataNode[]>([]);
  const isEdit = mode === 'edit';
  const [form] = Form.useForm<API.SysRoleBo>();
  const { run, loading } = useRequest(
    isEdit ? api.sysRoleController.sysRoleEdit : api.sysRoleController.sysRoleAdd,
    {
      manual: true,
      onSuccess: () => reload?.(),
    },
  );



  return (
    <ModalForm<API.SysRoleBo>
      title={isEdit ? '编辑角色' : '新建角色'}
      trigger={trigger}
      form={form}
      initialValues={{ ...record }}
      modalProps={{ okButtonProps: { loading } }}
      onFinish={async (values) => {
        await run(values);
        return true;
      }}
      onOpenChange={async (visible) => {
        if (visible) {
          const res = await sysMenuTreeselect({
            menu: {},
            roleId: record?.roleId
          } as API.sysMenuTreeselectParams);

          setMenuTree(convertTree(res.data?.menus || []))
          form.setFieldsValue({
            menuIds: res.data?.checkedKeys // 这里必须是数组
          })
        }
      }}
    >
      <>
        <ProForm.Group>
          <ProFormText width="md" name="roleId" hidden />

          <ProFormText
            width="md"
            name="roleName"
            label="角色名称"
            placeholder="请输入角色名称"
            rules={[{ required: true, message: '请输入角色名称' }]}
          />

          <ProFormText
            width="md"
            name="roleKey"
            label="权限字符"
            rules={[{ required: true, message: '请输入权限字符' }]}
            placeholder="请输入权限字符"
          />
        </ProForm.Group>

        <ProForm.Group>
          <ProFormText
            width="md"
            name="roleSort"
            label="显示顺序"
            rules={[{ required: true, message: '请输入显示顺序' }]}
            placeholder="显示顺序"
          />

          <ProFormSelect
            width="md"
            rules={[{ required: true, message: '请选择状态' }]}
            options={[
              { value: "0", label: '启用' },
              { value: "1", label: '禁用' }
            ]}
            name="status"
            label="状态"
          />
        </ProForm.Group>

        <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />

        <ProFormTreeSelect
          name="menuIds"
          label="菜单权限"
          placeholder="请选择菜单权限"
          fieldProps={{
            treeData: menuTree, // ← 接口返回的菜单树
            treeCheckable: true,
            showSearch: true
          }}
          rules={[{ required: true, message: "请选择菜单权限" }]}
        />
      </>
    </ModalForm>
  );
};

export default UserModalForm;
