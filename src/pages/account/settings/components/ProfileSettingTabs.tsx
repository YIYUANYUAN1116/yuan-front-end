import { ProCard } from '@ant-design/pro-components';
import React from 'react'
import BaseSettingForm from './BaseSettingForm ';
import BindForm from './BindForm';
import DeviceForm from './DeviceForm';
import SecurityForm from './SecurityForm';

const ProfileSettingTabs = () => {
    return (
        <ProCard
            tabs={{
                items: [
                    {
                        label: `基本设置`,
                        key: 'base',
                        children: <BaseSettingForm />,
                    },
                    {
                        label: `安全设置`,
                        key: 'security',
                       children: <SecurityForm />,
                    },
                    {
                        label: `账号绑定`,
                        key: 'account',
                        children: <BindForm />,
                    },
                     {
                        label: `在线设备`,
                        key: 'device',
                        children: <DeviceForm />,
                    },
                ],
            }}
        />
    )
}

export default ProfileSettingTabs