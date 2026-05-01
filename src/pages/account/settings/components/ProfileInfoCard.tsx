import { ProCard, ProDescriptions } from '@ant-design/pro-components';
import { CameraOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { Avatar, Button, Image, message, Upload } from 'antd';
import type { UploadProps } from 'antd';
import { useState } from 'react';
import { avatar as uploadAvatar } from '@/services/yuan/sysProfileController';

type ProfileInfoCardProps = {
    data?: API.ProfileVo;
    onRefresh?: () => unknown | Promise<unknown>;
};

const ProfileInfoCard = ({ data, onRefresh }: ProfileInfoCardProps) => {
    const [messageApi, contextHolder] = message.useMessage();
    const [uploading, setUploading] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);
    const { initialState, setInitialState } = useModel('@@initialState');
    const avatarSrc = data?.user?.avatarUrl || data?.user?.avatar;

    const uploadProps: UploadProps = {
        accept: 'image/*',
        showUploadList: false,
        beforeUpload: (file) => {
            const isImage = file.type.startsWith('image/');
            if (!isImage) {
                messageApi.error('只能上传图片文件');
                return Upload.LIST_IGNORE;
            }

            const isLt2M = file.size / 1024 / 1024 < 2;
            if (!isLt2M) {
                messageApi.error('头像图片不能超过 2MB');
                return Upload.LIST_IGNORE;
            }

            return true;
        },
        customRequest: async ({ file, onError, onSuccess }) => {
            setUploading(true);
            try {
                const result = await uploadAvatar({}, file as File);
                if (result.code !== 200) {
                    throw new Error(result.msg || '头像上传失败');
                }

                messageApi.success(result.msg || '头像上传成功');
                onSuccess?.(result);
                await onRefresh?.();

                const currentUser = await initialState?.fetchUserInfo?.();
                if (currentUser) {
                    setInitialState((state) => ({
                        ...state,
                        currentUser,
                    }));
                }
            } catch (error) {
                const err = error as Error;
                messageApi.error(err.message || '头像上传失败');
                onError?.(err);
            } finally {
                setUploading(false);
            }
        },
    };

    return (
        <ProCard>
            {contextHolder}
            <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <Avatar
                    size={96}
                    src={avatarSrc}
                    style={{ cursor: avatarSrc ? 'pointer' : 'default' }}
                    onClick={() => {
                        if (avatarSrc) {
                            setPreviewOpen(true);
                        }
                    }}
                />
                {avatarSrc ? (
                    <Image
                        src={avatarSrc}
                        style={{ display: 'none' }}
                        preview={{
                            visible: previewOpen,
                            onVisibleChange: (visible) => setPreviewOpen(visible),
                        }}
                    />
                ) : null}
                <div style={{ fontSize: 18, fontWeight: 500 }}>
                    {data?.user?.nickName || data?.user?.userName || '-'}
                </div>
                <Upload {...uploadProps}>
                    <Button
                        icon={<CameraOutlined />}
                        loading={uploading}
                        size="small"
                        style={{ marginTop: 8 }}
                    >
                        更换头像
                    </Button>
                </Upload>
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
