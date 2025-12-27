import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Space, Table } from 'antd';
import { useRef } from 'react';
import { Access, useAccess } from '@umijs/max';
import LoginforDrawer from './LoginforDrawer';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';
import { useTableRequest } from '@/hooks/table/useTableRequest';
import {
    sysLogininforList,
    sysLogininforRemove,
} from '@/services/yuan/sysLogininforController';
import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { useDictDataValueEnum } from '@/hooks/dict/useDictDataValueEnum';
import { DictEnum } from '@/const/dict-enum';

type Props = {
    /** 是否只看当前用户（Profile / DeviceForm 用） */
    onlySelf?: boolean;
    /** 是否展示批量操作 */
    showBatch?: boolean;
};

const LogininforTable = ({ onlySelf, showBatch = true }: Props) => {
    const actionRef = useRef<ActionType | null>(null);
    const statusEnum = useDictDataValueEnum(DictEnum.SYS_OPRE_STATUS);
    const access = useAccess();

    const columns: ProColumns<API.SysLogininforVo>[] = [
        {
            dataIndex: 'infoId',
            ...HIDE_COLUMN,
        },
        {
            title: '序号',
            dataIndex: 'index',
            valueType: 'indexBorder',
            width: 48,
        },
        {
            title: '用户账号',
            dataIndex: 'userName',
            ellipsis: true,
        },
        {

            title: '登录IP地址',
            dataIndex: 'ipaddr',
            hidden: onlySelf
        },
        {

            title: '登录地点',
            dataIndex: 'loginLocation',
            hidden: onlySelf
        },
        {
            title: '浏览器类型',
            dataIndex: 'browser',
            ellipsis: true,
            hidden: onlySelf
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
            valueType: 'dateTime',
            width: 200,
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
                    <LoginforDrawer
                        trigger={<a type="link">预览</a>}
                        record={record}
                        key={`edit-${record.infoId}`}
                    />
                </Space>
            ),
        },
    ];

    const request = useTableRequest((params) =>
        sysLogininforList({
            pageQuery: params.pageQuery,
            bo: {
                ...params,
                onlySelf,
            },
        }),
    );

    return (
        <ProTable<API.SysLogininforVo>
            columns={columns}
            actionRef={actionRef}
            request={request}
            columnsState={{
                persistenceKey: 'sys-loginfor-log-pro-table',
                persistenceType: 'localStorage',
                defaultValue: {
                    option: { fixed: 'right', disable: true },
                },
            }}
            rowKey="infoId"
            search={onlySelf ? false : { labelWidth: 'auto' }}
            pagination={{ pageSize: onlySelf ? 5 : 10 }}
            headerTitle="登录日志"
            rowSelection={
                showBatch
                    ? { selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT] }
                    : false
            }
            tableAlertRender={
                showBatch
                    ? (props) => (
                        <Access accessible={access.canAccess('system:loginfor:remove')}>
                            <BatchDeleteAlert
                                {...props}
                                actionRef={actionRef}
                                onDelete={(keys) =>
                                    sysLogininforRemove({ infoIds: keys as string[] })
                                }
                            />
                        </Access>
                    )
                    : false
            }
        />
    );
};

export default LogininforTable;
