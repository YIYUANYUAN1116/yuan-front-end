
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Table } from 'antd';
import { useRef } from 'react';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { sysOperLogList, sysOperLogRemove } from '@/services/yuan/sysOperLogController';
import { DictEnum } from '@/const/dict-enum';
import OpreLogDrawer from './components/OpreLogDrawer';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { useDictDataTagMap } from '@/hooks/dict/useDictDataTagMap';
import { Access, useAccess } from '@umijs/max';

export default () => {
    const actionRef = useRef<ActionType | null>(null);
    const statusEnum = useDictDataValueEnum(DictEnum.SYS_OPRE_STATUS)
    const opreTypetagMap = useDictDataTagMap(DictEnum.SYS_OPER_TYPE)
    const access = useAccess();
    const renderBusinessType = (value: string | number) => {
        const tag = opreTypetagMap[String(value)];
        return tag?.render?.() ?? value;
    };

    const columns: ProColumns<API.SysOperLogVo>[] = [
        {
            title: '用户Id',
            dataIndex: 'operId',
            ...HIDE_COLUMN,
        },
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '模块标题',
            dataIndex: 'title',
            ellipsis: true,

        },
        {
            title: '操作业务',
            dataIndex: 'businessType',
            ellipsis: true,
            render: (_, record) => renderBusinessType(record.businessType || 0),
        },
        {
            disable: true,
            title: '方法名称',
            dataIndex: 'method',
            ...HIDE_COLUMN
        },
        {
            disable: true,
            title: '请求方式',
            dataIndex: 'requestMethod',
            ...HIDE_COLUMN
        },
        {
            title: '操作类别',
            dataIndex: 'operatorType',
            ellipsis: true,
            ...HIDE_COLUMN
        },
        {
            title: '操作人员',
            dataIndex: 'operName',
            ellipsis: true
        },
        {
            title: '部门',
            dataIndex: 'deptName',
            ellipsis: true,
            hideInSearch: true,
        },
        {
            title: '请求URL',
            dataIndex: 'operUrl',
            ...HIDE_COLUMN
        },
        {
            title: '主机地址',
            dataIndex: 'operIp',
            hideInSearch: true,
        },
        {
            title: '操作地点',
            dataIndex: 'operLocation',
            hideInSearch: true,
        },
        {
            title: '操作状态',
            dataIndex: 'status',
            valueType: 'select',
            valueEnum: statusEnum
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
            valueType: 'dateTime',
            sorter: true,
            defaultSortOrder: 'descend', // 默认降序
        },
        {
            title: '操作',
            valueType: 'option',
            key: 'option',
            hideInSearch: true,
            render: (text, record) => (
                <Space size="small">
                    <OpreLogDrawer
                        trigger={<a type="link">预览</a>}
                        record={record}
                        key={`edit-${record.operId}`}
                    />
                </Space>
            ),
        },
    ];
    const request = useTableRequest(sysOperLogList);
    return (
        <ProTable<API.SysOperLogVo>
            columns={columns}
            actionRef={actionRef}
            request={request}
            columnsState={{
                persistenceKey: 'sys-opre-log-pro-table',
                persistenceType: 'localStorage',
                defaultValue: {
                    option: { fixed: 'right', disable: true },
                },
            }}
            rowKey="operId"
            search={{ labelWidth: 'auto' }}
            pagination={{ pageSize: 10 }}
            headerTitle="操作日志"
            rowSelection={{
                // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
                // 注释该行则默认不显示下拉选项
                selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            }}
            tableAlertOptionRender={false}
            tableAlertRender={(props) => (
                <Access accessible={access.canAccess('system:operlog:remove')}>
                    <BatchDeleteAlert<API.SysOperLogVo>
                        {...props}
                        actionRef={actionRef}
                        onDelete={(keys) =>
                            sysOperLogRemove({ operIds: keys as number[] })
                        }
                    />
                </Access>
            )}

        />
    );
};