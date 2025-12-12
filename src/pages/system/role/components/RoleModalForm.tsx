import { type ActionType, ModalForm } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Form } from 'antd';
import { useState, type FC } from 'react';
import api from '@/services/yuan/index';
import RoleForm from './RoleForm';
import { values } from 'lodash';
import { sysMenuTreeselect } from '@/services/yuan/sysMenuController';
import { DataNode } from 'antd/es/tree';

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
  const [checkedKeys, setCheckedKeys] = useState<number[]>([]);
  const isEdit = mode === 'edit';

  const { run, loading } = useRequest(
    isEdit ? api.sysRoleController.sysRoleEdit : api.sysRoleController.sysRoleAdd,
    {
      manual: true,
      onSuccess: () => reload?.(),
    },
  );

  const [form] = Form.useForm<API.SysRoleBo>();
  // 将后端菜单树转换为 ProFormTreeSelect 可用的 treeData
  const convertMenuTree = (menus: API.TreeLong[]): any[] => {
    return menus.map((item: API.TreeLong) => ({
      title: item.label,
      value: item.id,
      key: item.id,
      children: item.children ? convertMenuTree(item.children) : [],
    }));
  };

  return (
    <ModalForm<API.SysRoleBo>
      title={isEdit ? '编辑角色' : '新建角色'}
      trigger={trigger}
      form={form}
      initialValues={{...record}}
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
          setMenuTree(convertMenuTree(res.data?.menus || []))
          setCheckedKeys(res.data?.checkedKeys || [])
        }
      }}
    >
      <RoleForm menuTree={menuTree} checkedKeys={checkedKeys}/>
    </ModalForm>
  );
};

export default UserModalForm;
