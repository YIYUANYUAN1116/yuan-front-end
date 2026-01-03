import { useAccess, useSearchParams } from '@umijs/max';
import { useRef } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button, Space, Table } from 'antd';
import { history } from '@umijs/max';

import DeptUserTable from './components/DeptUserTable';
import AuthUserListDrawerForm from './components/AuthUserListDrawerForm';
import { deptCancelUserAll } from '@/services/yuan/sysDeptController';


export default () => {
    const [searchParams] = useSearchParams();
    const actionRef = useRef<ActionType | null>(null);
    const deptId = searchParams.get("deptId") || '';
    const deptName = searchParams.get("deptName");
    const headerTitle = (
        <Space>
            <Button
                type="link"
                onClick={() => history.push('/system/dept')}
            >
                返回部门列表
            </Button>
            <span>{deptName}-已分配用户列表</span>
        </Space>
    );

    return (
        <DeptUserTable
            model='Y'
            title={headerTitle}
            deptId={deptId}
            actionText="批量取消分配"
            confirmText={(n) => `确认取消分配选中的 ${n} 条用户吗？`}
            onBatchAction={(keys) => deptCancelUserAll({ deptId, userIds: keys as string[] })}
            reloadParent={() => actionRef.current?.reload()}
            toolBarRender={() => [
                <AuthUserListDrawerForm
                    key="add"
                    deptId={deptId}
                    reload={() => actionRef.current?.reload()}
                    triggerText="新增"
                />
            ]}
            actionRef={actionRef} // ✅ 确保传递给子表
        />
    );
};
