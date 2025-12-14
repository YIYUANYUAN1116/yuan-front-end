
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { ActionType, ProColumns, ProTable, ProTableProps } from '@ant-design/pro-components'
import { Button, Popconfirm, Space } from 'antd'
import { useRef } from 'react'
import DictModalForm from './components/DictModalForm'
import { OperationModes } from '@/const/Const'
import { PlusOutlined } from '@ant-design/icons'
import { createFetchList, createLoadingRequest } from '@/util/DataRequestUtils'
import { dictTypeList, dictTypeRemove } from '@/services/yuan/sysDictTypeController';

const index = () => {
    const actionRef = useRef<ActionType | null>(null);
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
            valueEnum: {
                '1': { text: '禁用', status: 'Error' },
                '0': { text: '启用', status: 'Success' },
            },
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
                    <DictModalForm
                        mode={OperationModes.EDIT}
                        trigger={<a>编辑</a>}
                        record={record}
                        reload={actionRef.current?.reload}
                    />
                    <Popconfirm
                        title="删除"
                        description={`确认删除：${record.dictName}`}
                        okText="确认"
                        cancelText="取消"
                        okButtonProps={{ loading: deleteLoading }}
                        onConfirm={() => deleteRun({dictIds:[record.dictId as number]})}
                    >
                        <a style={{ color: 'red' }}>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const fetchDictData = createFetchList<
        Record<string, any>,
        API.SysDictTypeVo
    >(dictTypeList as any);

    const { run: deleteRun, loading: deleteLoading }  = createLoadingRequest(dictTypeRemove,actionRef)

    return (
        <ProTable
            columns={columns}
            rowKey={"dictId"}
            request={async (params, sort) => fetchDictData(params, sort)}
            cardBordered
            actionRef={actionRef}
            pagination={{ pageSize: 10 }}
            headerTitle="字典类型"
            toolBarRender={() => [
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
            ]}
        />
    )
}

export default index