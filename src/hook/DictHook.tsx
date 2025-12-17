import { dictDictType } from "@/services/yuan/sysDictDataController";
import { useRequest } from "@umijs/max";
import {  Tag } from 'antd';
import React from 'react'

export const useDictDataValueEnum = (dictType: string) => {
  const { data } = useRequest(() => dictDictType({ dictType }), {
    refreshDeps: [dictType], // dictType 变化时重新请求
  })
  // 转成 valueEnum 结构
  const valueEnum = data?.reduce<Record<string, { text: string; status?: string; color?: string }>>((acc, item) => {
    const dictValue = item.dictValue as string
    if (item.listClass?.startsWith('#')) {
      acc[dictValue] = { text: item.dictLabel || '', color: item.listClass }
    } else {
      acc[dictValue] = { text: item.dictLabel || '', status: item.listClass }
    }
    return acc
  }, {}) || {}
  return valueEnum
}

type DictTagMap = Record<
  string,
  {
    label: string
    render: () => React.ReactNode
  }
>

export const useDictDataTagMap = (dictType: string) => {
  const { data } = useRequest(() => dictDictType({ dictType }), {
    refreshDeps: [dictType],
  })

  const tagMap: DictTagMap =
    data?.reduce((acc, item) => {
      const value = String(item.dictValue)
      const label = item.dictLabel || ''

      acc[value] = {
        label,
        render: () => {
          if (item.listClass?.startsWith('#')) {
            return <Tag color={item.listClass}>{label}</Tag>
          }

          if (item.listClass) {
            return <Tag color={item.listClass.toLowerCase()}>{label}</Tag>
          }

          return <Tag>{label}</Tag>
        },
      }

      return acc
    }, {} as DictTagMap) || {}

  return tagMap
}





//缓存版的字典
// const cache: Record<string, Record<string, any>> = {};
// export const useDictDataValueEnum = (dictType: string) => {
//     const { data } = useRequest(
//         () => dictDictType({ dictType }),
//         {
//             formatResult: (res) => {
//                 const enumData: Record<string, any> = {};

//                 res.data?.forEach(item => {
//                     const dictValue = item.dictValue as string
//                     enumData[dictValue] = {
//                         text: item.dictLabel,
//                         status: item.listClass?.startsWith('#') ? undefined : item.listClass,
//                         color: item.listClass?.startsWith('#') ? item.listClass : undefined,
//                     };
//                 });
//                 cache[dictType] = enumData;
//                 return enumData;
//             },
//             cacheKey: dictType,
//             refreshDeps: [], // dictType 变更时刷新
//         }
//     );

//     return cache[dictType] || data || {};
// }