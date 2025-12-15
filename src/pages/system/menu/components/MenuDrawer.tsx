import { sysMenuAdd, sysMenuEdit, sysMenuTreeselect } from "@/services/yuan/sysMenuController";
import { createLoadingRequest } from "@/util/DataRequestUtils";
import { convertTree } from "@/util/TreeUtils";
import { DrawerForm, ProFormDigit, ProFormRadio, ProFormText, ProFormTreeSelect } from "@ant-design/pro-components";
import { useRequest } from "@umijs/max";
import { Form } from "antd";
import { useState } from "react";

const MenuDrawer = ({ mode, trigger, record, reload }: any) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const [form] = Form.useForm<API.SysMenuVo>();
  const isEdit = mode === 'edit';
  const { run: run, loading: loading } = createLoadingRequest(isEdit ? sysMenuEdit : sysMenuAdd, reload)

  return (
    <DrawerForm
      title={isEdit ? '编辑菜单' : '新建菜单'}
      trigger={trigger}
      width={480}
      initialValues={record}
      drawerProps={{ destroyOnClose: true }}
      onOpenChange={async (visible) => {
        if (visible) {
          const res = await sysMenuTreeselect({
            menu: {
              menuTypes: ['M', 'C'] // 只要目录 + 菜单
            },
            roleId: record?.roleId
          } as API.sysMenuTreeselectParams);
          setTreeData(convertTree(res.data?.menus || []))
          if (isEdit) {
            form.setFieldsValue({
              parentId: record?.parentId // 这里必须是数组
            })
          }
        }
      }}
      onFinish={async (values) => {
        await run(values);
        return true;
      }}
    >
      <ProFormText
        name="menuId"
        label="菜单ID"
        hidden
      />

      <ProFormTreeSelect
        name="parentId"
        label="上级菜单"
        placeholder="请选择上级菜单"
        fieldProps={{
          treeData: treeData, // ← 接口返回的菜单树
          showSearch: true,
          treeNodeFilterProp: "menuName",
        }}
        rules={[{ required: true, message: "请选择上级菜单" }]}
      />

      <ProFormText
        name="menuName"
        label="菜单名称"
        rules={[{ required: true }]}
      />

      <ProFormRadio.Group
        name="menuType"
        label="菜单类型"
        rules={[{ required: true, message: '请选择菜单类型' }]}
        options={[
          { label: '目录', value: 'M' },
          { label: '菜单', value: 'C' },
          { label: '按钮', value: 'F' },
        ]}
        initialValue={record?.menuType || 'C'}
        fieldProps={{
          buttonStyle: "solid",
        }}
        radioType="button"
      />

      <ProFormText
        name="path"
        label="路由地址"
        rules={[{ required: true }]}
      />

      <ProFormDigit
        name="orderNum"
        label="显示顺序"
        min={0}
        rules={[{ required: true, message: '请输入显示顺序' }]}
      />

      <ProFormRadio.Group
        name="status"
        label="菜单状态"
        options={[
          { label: '启用', value: '0' },
          { label: '禁用', value: '1' }
        ]}
        initialValue={record?.status || '0'}
        fieldProps={{
          buttonStyle: "solid",
        }}
        radioType="button" 
      />

    </DrawerForm>
  );
};

export default MenuDrawer