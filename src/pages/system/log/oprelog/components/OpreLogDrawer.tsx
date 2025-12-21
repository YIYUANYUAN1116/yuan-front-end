import { DictEnum } from "@/const/dict-enum";
import { useDictDataTagMap } from "@/hooks/dict/useDictDataTagMap";
import { DrawerForm, ProDescriptions } from "@ant-design/pro-components";
import { Space, Tag } from "antd";
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';

const OpreLogDrawer = ({ trigger, record }: any) => {
    const opreTypetagMap = useDictDataTagMap(DictEnum.SYS_OPER_TYPE)
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
                        title: '操作编号',
                        dataIndex: 'operId',
                    },
                    {
                        title: '操作结果',
                        dataIndex: 'status',
                        valueEnum: statusEnum
                    },

                    {
                        title: '操作业务',
                        dataIndex: 'businessType',
                        ellipsis: true,
                        render: (_, record) => (
                            <Space>
                                {opreTypetagMap[record.businessType]?.render()}
                                <span>{record.title}</span>
                            </Space>
                        ),
                    },

                    {
                        title: '操作人员',
                        dataIndex: 'operName',
                        ellipsis: true,
                        render: (_, record) =>(
                             <Space>
                                <span>账号：{record.operName}</span>
                                <span>ip: {record.operIp}</span>
                            </Space>
                        )

                    },
                    {
                        title: '请求方式',
                        dataIndex: 'requestMethod',
                        render: (_, record) =>
                             <Space>
                                <Tag>{record.requestMethod}请求</Tag>
                                <span>{record.operUrl}</span>
                            </Space>
                    },


                    {
                        title: '方法名称',
                        dataIndex: 'method',
                    },

                    {
                        title: '请求参数',
                        dataIndex: 'operParam',
                        valueType: 'jsonCode'
                    },

                    {
                        title: '返回参数',
                        dataIndex: 'jsonResult',
                        valueType: 'jsonCode'
                    },


                    {
                        title: '消耗时间',
                        dataIndex: 'costTime',
                        hideInSearch: true,
                    },
                    {
                        title: '操作时间',
                        dataIndex: 'operTime',
                        hideInSearch: true,
                        valueType: 'dateTime'
                    },
                ]
                }
            >
            </ProDescriptions>

        </DrawerForm >
    );
};

export default OpreLogDrawer