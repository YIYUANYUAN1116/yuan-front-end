
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { ActionType, PageContainer, ProColumns, ProTable, ProTableProps } from '@ant-design/pro-components'
import { Button, Popconfirm, Space, Table } from 'antd'
import { useRef } from 'react'
import DictModalForm from './components/DictModalForm'
import { OperationModes } from '@/const/Const'
import { PlusOutlined } from '@ant-design/icons'
import { dictTypeList, dictTypeRemove } from '@/services/yuan/sysDictTypeController';
import { Access, history, useAccess } from '@umijs/max';
import { DictEnum } from '@/const/dict-enum';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { dictCache } from '@/hooks/dict/dictCache';

const index = () => {
    const actionRef = useRef<ActionType | null>(null);
    const statusEnum = useDictDataValueEnum(DictEnum.SYS_NORMAL_DISABLE)
    const access = useAccess();

    const columns: ProColumns<API.SysDictTypeVo>[] = [
        {
            title: '字典类型Id',
            dataIndex: 'dictId',
            ...HIDE_COLUMN,
        },
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48
        },
        {
            title: '字典名称',
            dataIndex: 'dictName',
            ellipsis: true,
        },
        {
            title: '字典类型',
            dataIndex: 'dictType',
            ellipsis: true,
        },
        {
            disable: true,
            title: '状态',
            dataIndex: 'status',
            filters: true,
            onFilter: true,
            ellipsis: true,
            valueType: 'select',
            valueEnum: statusEnum,
        },
        {
            title: '备注',
            dataIndex: 'remark',
            ellipsis: true,
            hideInSearch: true,
        },
        {
            title: '创建时间',
            dataIndex: 'createTime',
            valueType: 'dateTime',
            sorter: true,
            hideInSearch: true,
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            hideInSearch: true,
            render: (text, record) => (
                <Space size="small">
                    <Access accessible={access.canAccess('system:dict:edit')}>
                        <DictModalForm
                            mode={OperationModes.EDIT}
                            trigger={<a>编辑</a>}
                            record={record}
                            reload={actionRef.current?.reload}
                        />
                    </Access>

                    <Access accessible={access.canAccess('system:dictData:edit')}>
                        <a onClick={() => {
                            history.push({
                                pathname: '/system/dict/data',
                                search: `?dictType=${record.dictType}&dictName=${record.dictName}`,
                            })
                        }}>
                            字典项
                        </a>
                    </Access>

                    <Access accessible={access.canAccess('system:dict:remove')}>
                        <Popconfirm
                            title="删除"
                            description={`确认删除：${record.dictName}`}
                            okText="确认"
                            cancelText="取消"
                            okButtonProps={{ loading: deleteLoading }}
                            onConfirm={() => {
                                deleteRun({ dictIds: [record.dictId] })
                                dictCache.delete(record.dictType)
                            }}
                        >
                            <a style={{ color: 'red' }}>删除</a>
                        </Popconfirm>
                    </Access>

                </Space>
            ),
        },
    ]

    const { run: deleteRun, loading: deleteLoading } = useActionRequest(dictTypeRemove, actionRef.current?.reload)
    const request = useTableRequest(dictTypeList);

    return (
        <PageContainer>
            <ProTable
                columns={columns}
                rowKey={"dictId"}
                request={request}
                cardBordered
                actionRef={actionRef}
                pagination={{ pageSize: 10 }}
                headerTitle="字典类型"
                columnsState={{
                    persistenceKey: 'sys-dict-type-pro-table',
                    persistenceType: 'localStorage',
                    defaultValue: {
                        option: { fixed: 'right', disable: true },
                    },
                }}
                toolBarRender={() => [
                    <Access accessible={access.canAccess('system:dict:add')}>
                        <DictModalForm
                            mode={OperationModes.ADD}
                            reload={actionRef.current?.reload}
                            trigger={
                                <Button type="primary" icon={<PlusOutlined />}>
                                    新建字典
                                </Button>
                            }
                            key="add"
                        />
                    </Access>
                ]}
                rowSelection={{
                    // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
                    // 注释该行则默认不显示下拉选项
                    selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
                }}
                tableAlertOptionRender={false}
                tableAlertRender={(props) => (
                    <Access accessible={access.canAccess('system:dict:remove')}>
                        <BatchDeleteAlert<API.SysDictTypeVo>
                            {...props}
                            actionRef={actionRef}
                            onDelete={(keys) =>
                                dictTypeRemove({ dictIds: keys as string[] })
                            }
                        />
                    </Access>

                )}
            />
        </PageContainer>
    )
}

export default index