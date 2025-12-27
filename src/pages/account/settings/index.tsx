import { ProCard } from '@ant-design/pro-components';
import React from 'react';
import ProfileInfoCard from './components/ProfileInfoCard';
import ProfileSettingTabs from './components/ProfileSettingTabs';
import { useRequest } from '@umijs/max';
import { getProfile } from '@/services/yuan/sysProfileController';

const index = () => {
  // 1. 在 index 组件中获取数据（只请求一次）
  const { data: profileData } = useRequest(getProfile);

  return (
    <ProCard ghost gutter={16}>
      <ProCard colSpan="30%" style={{ height: '100%' }} bordered>
        <ProfileInfoCard data={profileData} />
      </ProCard>

      <ProCard colSpan="70%" style={{ height: '100%' }} bordered>
        {/* 2. 把 profileData 传递给 ProfileSettingTabs */}
        <ProfileSettingTabs profileData={profileData} />
      </ProCard>
    </ProCard>
  );
};

export default index;