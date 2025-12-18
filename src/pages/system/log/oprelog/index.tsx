
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Modal, Space, Table } from 'antd';
import { useRef } from 'react';

import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { createFetchList, createLoadingRequest } from '@/util/DataRequestUtils';
import { sysOperLogList, sysOperLogRemove } from '@/services/yuan/sysOperLogController';
import { useDictDataTagMap, useDictDataValueEnum } from '@/hook/DictHook';
import { DictEnum } from '@/const/dict-enum';
import OpreLogDrawer from './components/OpreLogDrawer';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
export default () => {
    const actionRef = useRef<ActionType | null>(null);
    const statusEnum = useDictDataValueEnum(DictEnum.SYS_OPRE_STATUS)
    const opreTypetagMap = useDictDataTagMap(DictEnum.SYS_OPER_TYPE)

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
            title: '业务类型',
            dataIndex: 'businessType',
            ellipsis: true,
            render: (_, record) =>
                opreTypetagMap[record.businessType || 0]?.render() ?? record.businessType,
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
            valueType: 'dateTime'
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

    const fetchDictData = createFetchList<
        Record<string, any>,
        API.SysOperLogVo
    >(sysOperLogList as any);

    return (
        <ProTable<API.SysOperLogVo>
            columns={columns}
            actionRef={actionRef}
            request={async (params, sort) => fetchDictData(params, sort)}
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
                <BatchDeleteAlert<API.SysOperLogVo>
                    {...props}
                    actionRef={actionRef}
                    onDelete={(keys) =>
                        sysOperLogRemove({ operIds: keys as number[] })
                    }
                />
            )}

        />
    );
};