import { sysMenuTreeselect } from "@/services/yuan/sysMenuController";
import { ProForm, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect } from "@ant-design/pro-components";
import { useForm } from "antd/es/form/Form";
import { DataNode } from "antd/es/tree";
import { useEffect, useState } from "react";

interface RoleFormProps {
    menuTree?: DataNode[];
}

export default (roleFormProps: RoleFormProps) => {
   const {menuTree} = roleFormProps

    return (
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
    );
};
