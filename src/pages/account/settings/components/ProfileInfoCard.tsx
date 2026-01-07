import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { Avatar, Tag } from 'antd';

const ProfileInfoCard = ({ data }:{data?:API.ProfileVo}) => {
    return (
        <ProCard>
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Avatar size={96} src={data?.user?.avatar} />
                <div style={{ fontSize: 18, fontWeight: 500 }}>admin</div>
                <div style={{ color: '#999', marginTop: 8 }}>
                    让时间有价值，让未来可期。
                </div>
            </div>

            <ProDescriptions
                column={1}
                size="small"
                styles={{
                    label:{ color: '#999' }
                }}
                dataSource={
                    data
                        ? {
                            ...data.user,
                            roleGroup: data.roleGroup,
                            postGroup: data.postGroup,
                        }
                        : {}
                }
                columns={[
                    {
                        title: '账号',
                        key: 'text',
                        dataIndex: 'userName',
                    },
                    {
                        title: '手机号',
                        key: 'text',
                        dataIndex: 'phonenumber',
                    },
                    {
                        title: '邮箱',
                        key: 'text',
                        dataIndex: 'email',
                    },
                    {
                        title: '岗位',
                        key: '岗位',
                        dataIndex: 'postName',
                    },
                    {
                        title: '部门',
                        key: '部门',
                        dataIndex: 'deptName',
                    },
                    {
                        title: '上次登录',
                        key: 'text',
                        dataIndex: 'loginDate',
                        valueType: 'dateTime'
                    },
                ]}
            />
        </ProCard>
    );
}

export default ProfileInfoCard