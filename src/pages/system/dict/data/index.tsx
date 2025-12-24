import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { useSearchParams } from '@umijs/max';
import { useRef } from 'react'
import DictDataModalForm from './components/DictDataModalForm';
import { Button, Popconfirm, Space, Table } from 'antd';
import { dictList, dictRemove } from '@/services/yuan/sysDictDataController';
import { OperationModes } from '@/const/Const';
import { PlusOutlined } from '@ant-design/icons';
import { history } from '@umijs/max';
import { DictEnum } from '@/const/dict-enum';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { useActionRequest } from '@/hooks/action/useActionRequest';
import { dictCache } from '@/hooks/dict/dictCache';

export default function index() {
    const [searchParams] = useSearchParams();
    const dictType = searchParams.get('dictType');
    const dictName = searchParams.get('dictName');
    const actionRef = useRef<ActionType | null>(null);
    const statusEnum = useDictDataValueEnum(DictEnum.SYS_NORMAL_DISABLE)
    const { run: delRun, loading: delLoading } = useActionRequest(dictRemove, actionRef.current?.reload)

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
            valueEnum: statusEnum,
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
                        onConfirm={() => {
                            delRun({ dictCodes: [record.dictCode] });
                            dictCache.delete(record.dictType)
                        }}
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

    const request = useTableRequest(dictList);
    return (
        <ProTable
            headerTitle={headerTitle}
            rowKey={'dictCode'}
            columns={columns}
            request={request}
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
            rowSelection={{
                // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
                // 注释该行则默认不显示下拉选项
                selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            }}
            tableAlertOptionRender={false}
            tableAlertRender={(props) => (
                <BatchDeleteAlert<API.SysDictDataVo>
                    {...props}
                    actionRef={actionRef}
                    onDelete={(keys) =>
                        dictRemove({ dictCodes: keys as string[] }) 
                    }
                    afterSuccess={()=>dictCache.delete(dictType)}
                />
            )}
        />
    )
}
