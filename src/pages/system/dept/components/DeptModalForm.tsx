import { OperationMode, OperationModes } from '@/const/Const';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { sysDeptAdd, sysDeptEdit, sysDeptTreeselect } from '@/services/yuan/sysDeptController';
import { convertTree } from '@/util/TreeUtils';
import { ActionType, DrawerForm, ProFormRadio, ProFormText, ProFormTextArea, ProFormTreeSelect } from '@ant-design/pro-components';
import { useRequest } from '@umijs/max';
import React, { useState } from 'react'

interface ModalFormProps {
  mode: OperationMode;
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysDeptVo;
}

export const DeptModalForm = (props: ModalFormProps) => {
  const [treeData, setTreeData] = useState<any[]>([]);
  const { mode, trigger, reload, record } = props;
  const isEdit = mode == OperationModes.EDIT
  const { run: run } = useActionRequest(isEdit ? sysDeptEdit : sysDeptAdd, reload)

  return (
    <DrawerForm<API.SysDeptBo>
      title={isEdit ? '编辑部门' : '新增部门'}
      trigger={trigger}
      size='middle'
      width={720}
      initialValues={isEdit
        ? { ...record } // 编辑：完整回填
        : {
          status: '0',            // 新增默认启用
          parentId: record?.deptId, // 新增时父节点
        }}
      drawerProps={{
        destroyOnClose: true,
        closable: true, // 默认就是 true
      }}
      onOpenChange={async (visible) => {
        if (visible) {
          const res = await sysDeptTreeselect({
            bo: {}
          } as API.sysMenuTreeselectParams);
          setTreeData(convertTree(res.data?.treeList || []));
        }
      }}
      onFinish={async (values) => {
        run(values);
        return true;
      }}

    >
      <ProFormText name="deptId" hidden />

      <ProFormTreeSelect
        name="parentId"
        label="上级部门"
        placeholder="请选择上级部门"
        fieldProps={{
          treeData: treeData, // ← 接口返回的菜单树
          showSearch: true,
          treeNodeFilterProp: "deptName",
        }}
        rules={[{ required: true, message: "请选择上级部门" }]}
      />

      <ProFormText
        
        name="deptName"
        label="部门名称"
        placeholder="请输入部门名称"
        rules={[{ required: true, message: '请输入部门名称' }]}
      />

      <ProFormText
        
        name="leader"
        label="负责人"
        placeholder="请输入负责人"
      />

      <ProFormText
        
        name="phone"
        label="联系电话"
        placeholder="请输入联系电话"
      />
      <ProFormText
        
        name="email"
        label="邮箱"
        placeholder="请输入邮箱"
      />

      <ProFormText
        
        name="orderNum"
        label="显示顺序"
        placeholder="请输入显示顺序"
        rules={[{ required: true, message: '请输入显示顺序' }]}
      />
      <ProFormRadio.Group
        
        name="status"
        label="状态"
        fieldProps={{
          buttonStyle: 'solid'
        }}
        options={[
          { label: '启用', value: '0' },
          { label: '禁用', value: '1' }
        ]}
        radioType="button"
      />
    </DrawerForm>
  )
}
