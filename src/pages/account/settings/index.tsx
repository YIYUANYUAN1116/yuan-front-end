import { ProCard } from '@ant-design/pro-components';
import React from 'react'
import ProfileInfoCard from './components/ProfileInfoCard';
import ProfileSettingTabs from './components/ProfileSettingTabs';

const index = () => {
  return (
    <ProCard 
        bordered 
        headerBordered 
        gutter={16}
    >
      <ProCard colSpan="30%" style={{ height: '100%' }} bordered>
        <ProfileInfoCard />
      </ProCard>

      <ProCard colSpan="70%" style={{ height: '100%' }} bordered>
        <ProfileSettingTabs />
      </ProCard>
    </ProCard>
  );
}

export default index