import { dictDictType } from '@/services/yuan/sysDictDataController'
import { useRequest } from '@umijs/max'
import { Tag } from 'antd'
import React, { useMemo } from 'react'


interface DictItem {
  dictValue: string
  dictLabel: string
  listClass?: string
}

export const useDictView = (dictType: string) => {
  const { data } = useRequest(() => dictDictType({ dictType }), {
    refreshDeps: [dictType],
  })

  return useMemo(() => {
    const valueEnum: Record<
      string,
      { text: string; status?: string; color?: string }
    > = {}

    const options: { label: string; value: string }[] = []

    // 🔥 关键：用 ReactNode
    const tagMap: Record<string, React.ReactNode> = {}

    data?.forEach((item: DictItem) => {
      const value = String(item.dictValue)
      const label = item.dictLabel || ''

      options.push({ label, value })

      if (item.listClass?.startsWith('#')) {
        valueEnum[value] = { text: label, color: item.listClass }
        tagMap[value] = <Tag color={item.listClass}>{label}</Tag>
      } else if (item.listClass) {
        valueEnum[value] = { text: label, status: item.listClass }
        tagMap[value] = (
          <Tag color={item.listClass.toLowerCase()}>{label}</Tag>
        )
      } else {
        valueEnum[value] = { text: label }
        tagMap[value] = <Tag>{label}</Tag>
      }
    })

    const renderTag = (value?: string) =>
      value != null ? tagMap[value] ?? value : '-'

    return {
      valueEnum,
      options,
      renderTag,
    }
  }, [data])
}