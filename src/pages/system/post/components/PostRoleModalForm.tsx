import { ActionType, ModalForm, ProFormSelect } from '@ant-design/pro-components';
import { Form } from 'antd';
import { sysRolePostSelect } from '@/services/yuan/sysRoleController';
import { useState } from 'react';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { sysPostInsertPostRole } from '@/services/yuan/sysPostController';

interface PostRoleModalFormProps {
    postId: string;
    reload?: ActionType['reload'];
}

const PostRoleModalForm = ({ postId, reload }: PostRoleModalFormProps) => {
    const [roles, setRoles] = useState<{ label: string; value: string }[]>([]);
    const [form] = Form.useForm<{ roleIds: string[] }>();
    const { run: run, loading: loading } = useActionRequest(sysPostInsertPostRole, reload)

    return (
        <ModalForm
            title="分配角色"
            trigger={<a>授权</a>}
            form={form}
            modalProps={{ okButtonProps: { loading } }}
            onOpenChange={async (visible) => {
                if (visible) {
                    const res = await sysRolePostSelect({ postId });
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
                run({ postId, roleIds: values.roleIds }); // ✅ 调接口
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

export default PostRoleModalForm;
