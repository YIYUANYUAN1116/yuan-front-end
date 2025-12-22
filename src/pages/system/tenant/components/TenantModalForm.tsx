import { ActionType } from '@ant-design/pro-components';
import React from 'react'

interface TenantModalFormProps {
  mode: 'add' | 'edit';
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysUserVo;
}

export const TenantModalForm = (props:TenantModalFormProps) => {
  return (
    <div>TenantModalForm</div>
  )
}
