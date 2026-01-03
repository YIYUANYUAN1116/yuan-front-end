import {  useAccess, useSearchParams } from '@umijs/max';
import { useRef } from 'react';
import { ActionType, ProTable } from '@ant-design/pro-components';
import { Button, Space, Table } from 'antd';
import { history } from '@umijs/max';
import PostUserTable from './components/PostUserTable';
import AuthUserListDrawerForm from './components/AuthUserListDrawerForm';
import { postCancelUserAll } from '@/services/yuan/sysPostController';


export default () => {
  const [searchParams] = useSearchParams();
  const actionRef = useRef<ActionType | null>(null);
  const postId = searchParams.get("postId") || '';
  const postName = searchParams.get("postName");
  const access = useAccess();
      const headerTitle = (
        <Space>
            <Button
                type="link"
                onClick={() => history.push('/system/post')}
            >
                返回岗位列表
            </Button>
            <span>{postName}-已分配用户列表</span>
        </Space>
    );
   
  return (
    <PostUserTable
      model='Y'
      title={headerTitle}
      postId={postId}
      actionText="批量取消分配"
      confirmText={(n) => `确认取消分配选中的 ${n} 条用户吗？`}
      onBatchAction={(keys) => postCancelUserAll({ postId, userIds: keys as string[]})}
      reloadParent={() => actionRef.current?.reload()}
      toolBarRender={() => [
        <AuthUserListDrawerForm
          key="add"
          postId={postId}
          reload={() => actionRef.current?.reload()}
          triggerText="新增"
        />
      ]}
      actionRef={actionRef} // ✅ 确保传递给子表
    />
  );
};
