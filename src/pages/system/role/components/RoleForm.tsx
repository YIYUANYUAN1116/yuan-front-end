import { ProForm, ProFormSelect, ProFormText, ProFormTextArea, ProFormTreeSelect } from "@ant-design/pro-components";
import { useState } from "react";

export default () => {
    const treeData = [
        {
            title: '一级部门',
            value: '0',
            children: [
                { title: '研发部', value: '1', key: '1' },
                { title: '产品部', value: '2', key: '2' },
                { title: '设计部', value: '3', key: '3' },
            ],
        },
        {
            title: '二级部门',
            value: '4',
            children: [
                { title: '前端组', value: '5', key: '5' },
                { title: '后端组', value: '6', key: '6' },
                { title: '测试组', value: '7', key: '7' },
            ],
        },
    ];
    
    return <>
        <ProForm.Group>
            <ProFormText
                width="md"
                name="roleId"
                hidden
            />
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
                    {
                        value: "0",
                        label: '启用',
                    },
                    {
                        value: "1",
                        label: '禁用',
                    }
                ]}
                name="status"
                label="状态"
            />
        </ProForm.Group>

        <ProFormTextArea
            name="remark"
            label="备注"
            placeholder="请输入备注"
        />

        <ProFormTreeSelect
            name="menu"
            label="菜单权限"
            placeholder="菜单权限"
            fieldProps={{
                treeData, // ✅ 关键！必须放在fieldProps里
                showSearch: true, // 开启搜索
                treeCheckable: true, // 开启多选
                // 可选：treeCheckStrictly={true} 用于严格父子节点控制
                // 可选：showCheckedStrategy={TreeSelect.SHOW_PARENT} 选中父节点时显示父节点
                //  loadData: async (node) => {
                //     // 这里模拟异步加载
                //     // const data = await fetchDepartmentData(node.value);
                //     return treeData;
                // },
                
            }}
            // 以下属性是ProFormTreeSelect特有的，用于表单验证
            rules={[
                { required: true, message: '请选择菜单权限！' },
                {
                    validator: (_, value) => {
                        if (!value) return Promise.reject('请选择菜单权限');
                        return Promise.resolve();
                    }
                }
            ]}
        />
    </>
}