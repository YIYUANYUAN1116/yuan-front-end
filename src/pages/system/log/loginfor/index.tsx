
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Modal, Space, Table } from 'antd';
import { useRef } from 'react';

import { HIDE_COLUMN } from '@/util/ColumsUtils';
import { createFetchList, createLoadingRequest } from '@/util/DataRequestUtils';
import { sysOperLogList, sysOperLogRemove } from '@/services/yuan/sysOperLogController';
import { useDictDataTagMap, useDictDataValueEnum } from '@/hook/DictHook';
import { DictEnum } from '@/const/dict-enum';
import LoginforDrawer from './components/LoginforDrawer';
import { sysLogininforList, sysLogininforRemove } from '@/services/yuan/sysLogininforController';
import BatchDeleteAlert from '@/components/ProTable/BatchDeleteAlert';

export default () => {
  const actionRef = useRef<ActionType | null>(null);
  const statusEnum = useDictDataValueEnum(DictEnum.SYS_OPRE_STATUS)
  const opreTypetagMap = useDictDataTagMap(DictEnum.SYS_OPER_TYPE)

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
      valueType: 'dateTime',
      width: 200
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

  const fetchDictData = createFetchList<
    Record<string, any>,
    API.SysLogininforVo
  >(sysLogininforList as any);

  return (
    <ProTable<API.SysLogininforVo>
      columns={columns}
      actionRef={actionRef}
      request={async (params, sort) => fetchDictData(params, sort)}
      columnsState={{
        persistenceKey: 'sys-loginfor-log-pro-table',
        persistenceType: 'localStorage',
        defaultValue: {
          option: { fixed: 'right', disable: true },
        },
      }}
      rowKey="infoId"
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
        <BatchDeleteAlert<API.SysLogininforVo>
          {...props}
          actionRef={actionRef}
          onDelete={(keys) =>
            sysLogininforRemove({ infoIds: keys as number[] })
          }
        />
      )}

    />
  );
};