import { Access, useAccess, useSearchParams } from '@umijs/max';
import { allocatedUserList, cancelAuthUserAll } from '@/services/yuan/sysRoleController';
import RoleUserTable from './components/RoleUserTable';
import AuthUserListDrawerForm from './components/AuthUserListDrawerForm';
import { useRef } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button, Space, Table } from 'antd';
import { history } from '@umijs/max';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { userBaseColumns } from './components/userColumns';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';

export default () => {
  const [searchParams] = useSearchParams();
  const actionRef = useRef<ActionType | null>(null);
  const roleId = searchParams.get("roleId") || '';
  const roleName = searchParams.get("roleName");
  const access = useAccess();
      const headerTitle = (
        <Space>
            <Button
                type="link"
                onClick={() => history.push('/system/role')}
            >
                返回角色列表
            </Button>
            <span>{roleName}-已分配用户列表</span>
        </Space>
    );
   
  return (
    <RoleUserTable
      model='Y'
      title={headerTitle}
      roleId={roleId}
      actionText="批量取消授权"
      confirmText={(n) => `确认取消授权选中的 ${n} 条用户吗？`}
      onBatchAction={(keys) => cancelAuthUserAll({ roleId, userIds: keys as string[]})}
      reloadParent={() => actionRef.current?.reload()}
      toolBarRender={() => [
        <AuthUserListDrawerForm
          key="add"
          roleId={roleId}
          reload={() => actionRef.current?.reload()}
          triggerText="新增"
        />
      ]}
      actionRef={actionRef} // ✅ 确保传递给子表
    />
  );
};
