import { ProColumns } from '@ant-design/pro-components';
import { HIDE_COLUMN } from '@/util/ColumsUtils';

export const userBaseColumns: ProColumns<API.SysUserVo>[] = [

  {
    title: '用户Id',
    dataIndex: 'userId',
    ...HIDE_COLUMN,
  },
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 48,
  },
  {
    title: '用户名称',
    dataIndex: 'nickName',
    ellipsis: true,
  },
  {
    title: '登录名称',
    dataIndex: 'userName',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '用户邮箱',
    dataIndex: 'email',
    ellipsis: true,
  },
  {
    title: '手机号',
    dataIndex: 'phonenumber',
    hideInSearch: true,
  },
  {
    disable: true,
    title: '状态',
    dataIndex: 'status',
    filters: true,
    onFilter: true,
    valueType: 'select',
     valueEnum: {
      '0': { text: '启用', status: 'Success' },
      '1': { text: '禁用', status: 'Error' }
    },
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    ellipsis: true,
    hideInSearch: true,
  },
  {
    title: '岗位',
    dataIndex: 'postName',
    ellipsis: true,
    hideInSearch: true,
  }
];
