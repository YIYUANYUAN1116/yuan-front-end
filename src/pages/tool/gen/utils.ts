import {
  schemaGetCurrentDataSourceTableNameList,
  schemaList,
} from '@/services/yuan/schemaController';
import { schemaGroupSelect } from '@/services/yuan/schemaGroupController';

export const yesNoOptions = [
  { label: '是', value: '1' },
  { label: '否', value: '0' },
];

export const statusOptions = [
  { label: '启用', value: '0' },
  { label: '停用', value: '1' },
];

export const queryTypeOptions = [
  { label: '=', value: 'EQ' },
  { label: '!=', value: 'NE' },
  { label: '>', value: 'GT' },
  { label: '>=', value: 'GE' },
  { label: '<', value: 'LT' },
  { label: '<=', value: 'LE' },
  { label: '模糊', value: 'LIKE' },
  { label: '范围', value: 'BETWEEN' },
];

export const htmlTypeOptions = [
  { label: '文本框', value: 'input' },
  { label: '文本域', value: 'textarea' },
  { label: '下拉框', value: 'select' },
  { label: '单选框', value: 'radio' },
  { label: '复选框', value: 'checkbox' },
  { label: '日期', value: 'date' },
  { label: '日期时间', value: 'datetime' },
  { label: '时间', value: 'time' },
  { label: '数字', value: 'number' },
  { label: '开关', value: 'switch' },
];

export const fieldTypeOptions = [
  'varchar',
  'char',
  'text',
  'longtext',
  'int',
  'bigint',
  'decimal',
  'double',
  'float',
  'datetime',
  'date',
  'time',
  'timestamp',
  'boolean',
].map((value) => ({ label: value, value }));

export const querySchemaGroupOptions = async () => {
  const res = await schemaGroupSelect();
  return (res.data || []).map((item) => ({
    label: item.name || item.code || item.id,
    value: item.id,
  }));
};

export const querySchemaOptions = async () => {
  const res = await schemaList({
    bo: {} as API.SchemaBo,
    pageQuery: { pageNum: 1, pageSize: 1000 },
  });
  return (res.rows || []).map((item) => ({
    label: `${item.name || item.tableName || item.id}${item.tableName ? `（${item.tableName}）` : ''}`,
    value: item.id,
    tableName: item.tableName,
    name: item.name,
  }));
};

export const queryTableNameOptions = async () => {
  const res = await schemaGetCurrentDataSourceTableNameList();
  const data = res.data as any;
  const list = Array.isArray(data)
    ? data
    : Array.isArray(data?.rows)
      ? data.rows
      : Array.isArray(data?.records)
        ? data.records
        : Array.isArray(data?.data)
          ? data.data
          : Object.values(data || {}).find(Array.isArray) || [];

  return (list as any[]).map((item) => {
    const value =
      typeof item === 'string'
        ? item
        : item.tableName || item.name || item.value || item.label;
    return {
      label: value,
      value,
    };
  });
};
