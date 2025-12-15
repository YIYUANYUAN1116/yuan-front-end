import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import React, { useRef } from 'react'
import DictDataModalForm from './components/DictDataModalForm';
import { Button, Popconfirm, Space } from 'antd';
import { dictList, dictRemove } from '@/services/yuan/sysDictDataController';
import { createFetchList, createLoadingRequest } from '@/util/DataRequestUtils';
import { OperationModes } from '@/const/Const';
import { PlusOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';

export default function index() {
    const [searchParams] = useSearchParams();
    const dictType = searchParams.get('dictType');
    const dictName = searchParams.get('dictName');
    const actionRef = useRef<ActionType | null>(null);

    const { run: delRun, loading: delLoading } = createLoadingRequest(dictRemove, actionRef.current?.reload)
    const fetchDictData = createFetchList<
        Record<string, any>,
        API.SysDictDataVo
    >(dictList as any);

    const columns: ProColumns<API.SysDictDataVo>[] = [
        {
            title: 'id',
            dataIndex: 'dictCode',
            ...HIDE_COLUMN,
        },
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48
        },
        {
            title: '字典标签',
            dataIndex: 'dictLabel',
            ellipsis: true,
        },
        {
            title: '字典键值',
            dataIndex: 'dictValue',
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
            title: '字典类型',
            dataIndex: 'dictType',
            ellipsis: true,
            ...HIDE_COLUMN
        },
        {
            title: '排序',
            dataIndex: 'dictSort',
            ellipsis: true
        },
        {
            title: '默认',
            dataIndex: 'isDefault',
            ellipsis: true,
            valueEnum: {
                Y: { text: '是', status: 'Success' },
                N: { text: '否', status: 'Default' },
            },
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
                    <DictDataModalForm
                        mode={OperationModes.EDIT}
                        trigger={<a>编辑</a>}
                        record={record}
                        reload={actionRef.current?.reload}
                        dictName={dictName || ''}
                    />
                    <Popconfirm
                        title="删除"
                        description={`确认删除：${record.dictLabel}`}
                        okText="确认"
                        cancelText="取消"
                        okButtonProps={{ loading: delLoading }}
                        onConfirm={() => delRun({ dictCodes: [record.dictCode as number] })}
                    >
                        <a style={{ color: 'red' }}>删除</a>
                    </Popconfirm>
                </Space>
            ),
        },
    ]

    const headerTitle = (
        <Space>
            <Button
                type="link"
                onClick={() => history.push('/system/dict')}
            >
                返回字典类型
            </Button>
            <span>{dictName}-字典</span>
        </Space>
    );

    return (
        <ProTable
            headerTitle={headerTitle}
            rowKey={'dictCode'}
            columns={columns}
            request={async (params, sort) => fetchDictData(params, sort)}
            cardBordered
            actionRef={actionRef}
            pagination={{ pageSize: 10 }}
            params={{ dictType }}
            columnsState={{
                persistenceKey: 'sys-dict-data-pro-table',
                persistenceType: 'localStorage',
                defaultValue: {
                    option: { fixed: 'right', disable: true },
                },
            }}
            toolBarRender={() => [
                <DictDataModalForm
                    mode={OperationModes.ADD}
                    reload={actionRef.current?.reload}
                    trigger={
                        <Button type="primary" icon={<PlusOutlined />}>
                            新建字典
                        </Button>
                    }
                    dictName={dictName || ''}
                    dictType={dictType || ''}
                    key="add"
                />
            ]}
        />
    )
}
