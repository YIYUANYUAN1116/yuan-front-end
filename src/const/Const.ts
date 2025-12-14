export type OperationMode = 'edit' | 'add';
export const OperationModes = {
    EDIT: 'edit',
    ADD: 'add'
} as const;

export const statusMap = {
    '0': { text: '启用', color: 'success' },
    '1': { text: '禁用', color: 'error' },
} as const;

export const menuTypeMap = {
    'M': { text: '目录',color: 'gray'},
    'C': { text: '菜单',color: 'geekblue'},
    'F': { text: '按钮',color: 'volcano'},
} as const;