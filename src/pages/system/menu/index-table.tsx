import { PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Space, Table, Tag, message } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import MenuModalForm from './components/MenuDrawer';
import { sysMenuListTree, sysMenuRemove } from '@/services/yuan/sysMenuController';
import { DictEnum } from '@/const/dict-enum';
import { useDictDataTagMap } from '@/hooks/dict/useDictDataTagMap';





/**
 * 高性能菜单树 antd Table 版本
 * - 去掉 ProTable 的二次封装
 * - 树形数据 + Drawer / Modal 编辑
 * - 展开性能更可控
 */

const RowActions = React.memo(
  ({ record, reload }: { record: API.SysMenuVo; reload: () => Promise<void> }) => {
    const [loading, setLoading] = useState(false);
    const handleDelete = async () => {
      try {
        setLoading(true);
        await sysMenuRemove({ menuIds: [record.menuId!] });
        message.success('删除成功');
        reload();
      } finally {
        setLoading(false);
      }
    };

    return (
      <Space size={8}>
        <MenuModalForm
          mode="edit"
          record={record}
          reload={reload}
          trigger={<a>编辑</a>}
        />
        <Popconfirm
          title={`确认删除 ${record.menuName} ?`}
          onConfirm={handleDelete}
          okButtonProps={{ loading }}
        >
          <a style={{ color: 'red' }}>删除</a>
        </Popconfirm>
      </Space>
    );
  },
);

export default () => {
  const [dataSource, setDataSource] = useState<API.SysMenuVo[]>([]);
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    const res = await sysMenuListTree({ bo: {} } as API.sysMenuListTreeParams);
    setDataSource(res.data || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);


  type menuTypeKey = keyof typeof menuTypeMap;
  const getStatusConfig = (key: string) => {
    if (key in menuTypeMap) {
      return menuTypeMap[key as menuTypeKey];
    }
    return { text: '未知', color: 'default' };
  };

  const statusMap =  useDictDataTagMap(DictEnum.STATUS_TYPE)

  const columns = useMemo<ColumnsType<API.SysMenuVo>>(() => [
    {
      title: '菜单名称',
      dataIndex: 'menuName',
      ellipsis: true,
    },
    {
      title: '路由地址',
      dataIndex: 'path',
      ellipsis: true,
    },
    {
      title: '顺序',
      dataIndex: 'orderNum',
    },
    {
      title: '菜单类型',
      dataIndex: 'menuType',
      render: (menuType: string) => {
        const config = getStatusConfig(menuType)
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: (status: string) => {
        const config = statusMap[status as keyof typeof statusMap] || { text: '未知', color: 'default' };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '操作',
      fixed: 'right',
      render: (_, record) => <RowActions record={record} reload={loadData} />,
    },
  ], [loadData]);

  return (
    <>
      <Space style={{ marginBottom: 16 }}>
        <MenuModalForm
          mode="add"
          reload={loadData}
          trigger={
            <Button type="primary" icon={<PlusOutlined />}>
              新建菜单
            </Button>
          }
        />
      </Space>

      <Table<API.SysMenuVo>
        rowKey="menuId"
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        size="middle"               // 👈 关键：紧凑行高
        bordered                    // 👈 关键：显示边框
        pagination={false}
        expandable={{
          rowExpandable: record => !!record.children?.length,
          expandRowByClick: false,
          indentSize: 16,
        }}
        scroll={{ x: 'max-content' }}
      />
    </>
  );
};
