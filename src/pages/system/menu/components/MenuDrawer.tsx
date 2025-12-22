import { useActionRequest } from "@/hooks/action/useActionRequest";
import { sysMenuAdd, sysMenuEdit, sysMenuTreeselect } from "@/services/yuan/sysMenuController";
import { convertTree } from "@/util/TreeUtils";
import { DrawerForm, ProFormDigit, ProFormRadio, ProFormText, ProFormTextArea, ProFormTreeSelect } from "@ant-design/pro-components";
import { useState } from "react";

const MenuDrawer = ({ mode, trigger, record, reload }: any) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const isEdit = mode === 'edit';
  const { run: run, loading: loading } = useActionRequest(isEdit ? sysMenuEdit : sysMenuAdd, reload)
  const [currentMenuType, setCurrentMenuType] = useState<string>(record?.menuType || 'C'); // 默认菜单

  return (
    <DrawerForm
      title={isEdit ? '编辑菜单' : '新建菜单'}
      trigger={trigger}
      width={520}
      initialValues={record}
      drawerProps={{ destroyOnClose: true }}
      onOpenChange={async (visible) => {
        if (visible) {
          const res = await sysMenuTreeselect({
            bo: {
              menuTypes: ['M', 'C'] // 只要目录 + 菜单
            },
            roleId: record?.roleId
          } as API.sysMenuTreeselectParams);
          // 添加根目录节点
          const treeWithRoot = [
            {
              title: '根目录',   // 显示名称
              value: 0,         // 对应 parentId
              key: 0,
              children: convertTree(res.data?.treeList || [])
            }
          ];
          setTreeData(treeWithRoot);
        }
      }}
      onFinish={async (values) => {
        await run(values);
        return true;
      }}
      onValuesChange={(changedValues, allValues) => {
        if (changedValues.menuType !== undefined) {
          setCurrentMenuType(allValues.menuType);
        }
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

      <ProFormRadio.Group
        name="menuType"
        label="菜单类型"
        rules={[{ required: true, message: '请选择菜单类型' }]}
        options={[
          { label: '目录', value: 'M' },
          { label: '菜单', value: 'C' },
          { label: '按钮', value: 'F' },
        ]}
        fieldProps={{
          buttonStyle: "solid",
          defaultValue: currentMenuType
        }}
        radioType="button"
      />
      <ProFormRadio.Group
        name="status"
        label="菜单状态"
        options={[
          { label: '启用', value: '0' },
          { label: '禁用', value: '1' }
        ]}
        fieldProps={{
          buttonStyle: "solid",
          defaultValue: '0'
        }}
        radioType="button"
      />

      <ProFormRadio.Group
        name="visible"
        label="显示状态"
        options={[
          { label: '显示', value: '0' },
          { label: '隐藏', value: '1' }
        ]}
        fieldProps={{
          buttonStyle: "solid",
          defaultValue: '0'
        }}
        radioType="button"
      />

      <ProFormText
        name="menuName"
        label="菜单名称"
        rules={[{ required: true }]}
      />
      {currentMenuType !== 'F' &&
        (
          <>

            <ProFormText
              name="routeName"
              label="路由名称"
              tooltip="国际化中的配置名称"
              rules={[{ required: true }]}
            />

            <ProFormText
              name="path"
              label="路由地址"
              rules={[{ required: true }]}
            />
          </>
        )
      }
      {
        currentMenuType === 'C' && (
          <ProFormText
            name="component"
            label="组件路径"
            tooltip="工程中的组件路径，例如： ./system/user"
          />)
      }

      {
        currentMenuType != 'M' && (
          <ProFormText
            name="perms"
            label="权限标识"
            tooltip="权限标识，例如： system:user:add"
            rules={[{ required: true, message: '请输入权限标识' }]}
          />)
      }


      {currentMenuType === 'M' && (
        <ProFormText
          name="icon"
          label="图标"
          tooltip="例如：SettingOutlined"
        />)}

      {currentMenuType !== 'F' &&
        (
          <ProFormDigit
            name="orderNum"
            label="显示顺序"
            min={0}
            rules={[{ required: true, message: '请输入显示顺序' }]}
          />
        )
      }

      <ProFormTextArea
        name="remark"
        label="备注"
      />

    </DrawerForm>
  );
};

export default MenuDrawer