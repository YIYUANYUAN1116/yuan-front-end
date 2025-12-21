import { DictEnum } from "@/const/dict-enum";
import { DrawerForm, ProDescriptions } from "@ant-design/pro-components";
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';

const LoginforDrawer = ({ trigger, record }: any) => {    
    const statusEnum = useDictDataValueEnum(DictEnum.SYS_OPRE_STATUS)
    return (
        <DrawerForm
            title={"操作日志"}
            trigger={trigger}
            width={480}
            drawerProps={{
                destroyOnClose: true,
                closable: true, // 默认就是 true
            }}
            submitter={false}
        >
            <ProDescriptions
                dataSource={record}
                column={1}
                columns={[
                    {
                        title: '登录编号',
                        dataIndex: 'infoId',
                    },
                    {
                        title: '用户账号',
                        dataIndex: 'userName'
                    },

                    {
                        title: '登录IP地址',
                        dataIndex: 'ipaddr',
                    },
                    {
                        title: '登录地点',
                        dataIndex: 'loginLocation',
                    },
                    {
                        title: '浏览器类型',
                        dataIndex: 'browser',
                        ellipsis: true
                    },
                    {
                        title: '操作系统',
                        dataIndex: 'os',
                        ellipsis: true,
                        render: (text, record) => {
                            if (!record.os) return '-';
                            const match = record.os.match(/^Windows\s+\d+/);
                            return match ? match[0] : record.os;
                        },
                    },

                    {
                        title: '登录状态',
                        dataIndex: 'status',
                        valueType: 'select',
                        valueEnum: statusEnum
                    },
                    {
                        title: '提示消息',
                        dataIndex: 'msg',
                        hideInSearch: true,
                    },
                    {
                        title: '访问时间',
                        dataIndex: 'loginTime',
                        hideInSearch: true,
                        valueType: 'dateTime'
                    }

                ]
                }
            >
            </ProDescriptions>

        </DrawerForm >
    );
};

export default LoginforDrawer