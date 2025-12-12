import { ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import { Form } from 'antd';
import { sysRoleOptionselect } from '@/services/yuan/sysRoleController';
import { sysUserInsertAuthRole } from '@/services/yuan/sysUserController';
import { useState } from 'react';

interface UserRoleModalFormProps {
    userId: number;
    reload?: () => void;
}

const UserRoleModalForm = ({ userId, reload }: UserRoleModalFormProps) => {
    const [roles, setRoles] = useState<{ label: string; value: number }[]>([]);

    const [form] = Form.useForm<{ roleIds: number[] }>();

    const { run, loading } = useRequest(sysUserInsertAuthRole, {
        manual: true,
        onSuccess: () => reload?.(),
    });

    return (
        <ModalForm
            title="分配角色"
            trigger={<a>授权</a>}
            form={form}
            modalProps={{ okButtonProps: { loading } }}
            onOpenChange={async (visible) => {
                if (visible) {
                    const res = await sysRoleOptionselect({ userId });
                    // 过滤掉 roleName 或 roleId 为 undefined/null 的数据
                    const validRoles = (res?.data?.roles || [])
                        .filter(role => role.roleName != null && role.roleId != null)
                        .map(role => ({
                            label: role.roleName!,
                            value: role.roleId!,
                        }));
                    setRoles(validRoles);
                    // 设置表单初始值，回显已分配角色
                    form.setFieldsValue({
                        roleIds: res?.data?.checkedKeys || [],
                    });
                }
            }}
            onFinish={async (values) => {
                await run({ userId, roleIds: values.roleIds }); // ✅ 调接口
                return true;
            }}
        >
            <ProFormSelect
                name="roleIds"
                label="角色"
                width="md"
                mode="multiple"
                options={roles}
                placeholder="请选择角色"
                rules={[{ required: true, message: '请选择角色' }]}
            />
        </ModalForm>
    );
};

export default UserRoleModalForm;
