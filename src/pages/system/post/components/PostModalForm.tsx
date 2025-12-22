import { ActionType } from '@ant-design/pro-components';
import React from 'react'

interface PostModalFormProps {
  mode: 'add' | 'edit';
  trigger?: React.ReactNode;
  reload?: ActionType['reload'];
  record?: API.SysUserVo;
}

export const PostModalForm = (props:PostModalFormProps) => {
  return (
    <div>PostModalForm</div>
  )
}
