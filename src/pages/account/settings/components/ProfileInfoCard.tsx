import { UserOutlined } from '@ant-design/icons';
import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Avatar, Tag } from 'antd';
import React from 'react'

const ProfileInfoCard = () => {
    return (
        <ProCard>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Avatar
                    size={96}
                    icon={<UserOutlined />}
                    style={{ marginBottom: 12 }}
                />
                <div style={{ fontSize: 18, fontWeight: 500 }}>admin</div>
                <div style={{ color: '#999', marginTop: 8 }}>
                    让时间有价值，让未来可期。
                </div>
            </div>

            <ProDescriptions
                column={1}
                size="small"
                labelStyle={{ color: '#999' }}
            >
                <ProDescriptions.Item label="账号">
                    admin
                </ProDescriptions.Item>
                <ProDescriptions.Item label="手机号">
                    15888888888
                </ProDescriptions.Item>
                <ProDescriptions.Item label="邮箱">
                    ageerle@163.com
                </ProDescriptions.Item>
                <ProDescriptions.Item label="部门">
                    <Tag color="blue">未分配部门</Tag>
                    <Tag color="blue">董事长</Tag>
                </ProDescriptions.Item>
                <ProDescriptions.Item label="上次登录" valueType={'dateTime'}>
                    1766730288000
                </ProDescriptions.Item>
            </ProDescriptions>
        </ProCard>
    );
}

export default ProfileInfoCard