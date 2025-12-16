import React from 'react'
import {
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormGroup,
  ProFormItem,
} from '@ant-design/pro-components'
import { ColorPicker, Space, Tag } from 'antd'

interface DictLabelStyleFormItemProps {
  name?: string
  record?: {
    listClass?: string
  }
}

const PRESET_OPTIONS = [
  {
    label: <Tag color="success">成功: Success</Tag>,
    value: 'Success',
  },
  {
    label: <Tag color="error">禁用: Error</Tag>,
    value: 'Error',
  },
  {
    label: <Tag color="warning">警告: Warning</Tag>,
    value: 'Warning',
  },
  {
    label: <Tag color="processing">处理中: Processing</Tag>,
    value: 'Processing',
  },
  {
    label: <Tag>默认: Default</Tag>,
    value: 'default',
  },
]

const DictLabelStyleFormItem: React.FC<DictLabelStyleFormItemProps> = ({
  name = 'listClass',
  record,
}) => {
  const isColor = record?.listClass?.startsWith('#')

  return (
    <ProFormGroup>
      {/* 左：样式类型 */}
      <ProFormRadio.Group
        name="__listClassType"
        label="标签样式"
        initialValue={isColor ? 'color' : 'preset'}
        options={[
          { label: '系统样式', value: 'preset' },
          { label: '自定义颜色', value: 'color' },
        ]}
        fieldProps={{
          optionType: 'button',
          buttonStyle: 'solid',
        }}
      />

      {/* 右：联动区域（核心） */}
      <ProFormItem
        noStyle
        shouldUpdate={(prev, cur) =>
          prev?.__listClassType !== cur?.__listClassType ||
          prev?.[name] !== cur?.[name]
        }
      >
        {(form) => {
          const type = form.getFieldValue('__listClassType')
          if (type === 'preset') {
            return (
              <ProFormSelect
                name={name}
                width="md"
                placeholder="系统标签样式"
                options={PRESET_OPTIONS}
              />
            )
          }

          const value = form.getFieldValue(name)

          return (
            <ProFormText
              name={name}
              width="md"
              placeholder="#1890ff"
              fieldProps={{
                suffix: (
                  <ColorPicker
                    value={value}
                    showText
                    onChange={(color) =>
                      form.setFieldValue(name, color.toHexString())
                    }
                  />
                ),
              }}
            />
          )
        }}
      </ProFormItem>
    </ProFormGroup>
  )
}

export default DictLabelStyleFormItem

