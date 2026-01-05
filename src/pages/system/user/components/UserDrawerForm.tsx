import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { sysDeptTreeselect } from '@/services/yuan/sysDeptController';
import { sysPostGetByDeptId, sysPostList } from '@/services/yuan/sysPostController';
import { sysUserAdd, sysUserEdit } from '@/services/yuan/sysUserController';
import { convertTree } from '@/util/TreeUtils';
import {
  type ActionType,
  DrawerForm,
  ProForm,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
  ProFormTreeSelect,
} from '@ant-design/pro-components';
import { Form } from 'antd';
import { useMemo, useState, type FC } from 'react';

interface UserModalFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysUserVo;
}

const UserDrawerForm: FC<UserModalFormProps> = ({ mode, trigger, reload, record }) => {
  const isEdit = mode === OperationModes.EDIT;
  const { run } = useActionRequest(isEdit ? sysUserEdit : sysUserAdd, reload);
  const [form] = Form.useForm<API.SysUserBo>();

  // 部门树数据（TreeSelect 需要 treeData）
  const [deptTree, setDeptTree] = useState<any[]>([]);
  // 当前部门下岗位 options
  const [postOptions, setPostOptions] = useState<Array<{ label: string; value: any }>>([]);

  const loadDeptTree = async () => {
    const res = await sysDeptTreeselect({bo:{}});
    // 你项目里应该已有 convertTree，确保字段映射为 {title,value,children}
    const tree = convertTree(res.data?.treeList || []);
    setDeptTree(tree);
  };

  const loadPostsByDept = async (deptId?: any) => {
    if (!deptId) {
      setPostOptions([]);
      return;
    }
    const res = await sysPostGetByDeptId({ deptId }); // 如果接口参数不是 deptId，自行改名
    setPostOptions(
      (res.data || []).map((item: any) => ({
        label: item.postName,
        value: item.postId,
      })),
    );
  };

  return (
    <DrawerForm<API.SysUserBo>
      title={isEdit ? '编辑用户' : '新建用户'}
      trigger={trigger}
      form={form}
      initialValues={record}
      onFinish={async (values) => {
        run(values);
        return true;
      }}
      onOpenChange={async (visible) => {
        if (!visible) return;

        // 1) 打开时加载部门树
        await loadDeptTree();

        // 2) 编辑时：根据 record.deptId 预加载岗位
        const deptId = (record as any)?.deptId ?? form.getFieldValue('deptId');
        if (deptId) {
          await loadPostsByDept(deptId);
        }
      }}
    >
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
          disabled={isEdit}
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
            { value: '0', label: '男' },
            { value: '1', label: '女' },
            { value: '2', label: '未知' },
          ]}
          rules={[{ required: true, message: '请选择性别' }]}
        />
        <ProFormSelect
          width="md"
          name="status"
          label="状态"
          options={[
            { value: '0', label: '启用' },
            { value: '1', label: '禁用' },
          ]}
        />
      </ProForm.Group>

      {/* ✅ 新增：部门 */}
      <ProFormTreeSelect
        name="deptId"
        label="部门"
        placeholder="请选择部门"
        fieldProps={{
          treeData: deptTree,
          showSearch: true,
          treeDefaultExpandAll: false,
          allowClear: true,
          onChange: async (deptId) => {
            // 切部门时，清空主岗位并重新加载岗位列表
            form.setFieldValue('primaryPostId', undefined);
            await loadPostsByDept(deptId);
          },
        }}
      />

      {/* ✅ 岗位根据部门加载 */}
      <ProFormSelect
        name="primaryPostId"
        label="主岗位"
        placeholder="请先选择部门"
        options={postOptions}
        fieldProps={{
          showSearch: true,
          optionFilterProp: 'label',
        }}
      />

      <ProFormTextArea name="remark" label="备注" placeholder="请输入备注" />

      {/* 隐藏的 userId，只在编辑时用 */}
      <ProFormText name="userId" hidden />
    </DrawerForm>
  );
};

export default UserDrawerForm;
