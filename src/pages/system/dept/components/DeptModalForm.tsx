import { ActionType } from '@ant-design/pro-components';
import React from 'react'

interface DeptModalFormProps {
  mode: 'add' | 'edit';
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysUserVo;
}

export const DeptModalForm = (props:DeptModalFormProps) => {
  return (
    <div>DeptModalForm</div>
  )
}
