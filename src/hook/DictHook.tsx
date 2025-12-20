import { dictDictType } from "@/services/yuan/sysDictDataController";
import { useRequest } from "@umijs/max";
import { Tag } from 'antd';
import { JSX, useState } from 'react'

export interface ValueEnumItem {
  text: string;
  status?: string;
  color?: string;
}
export const valueEnumCacheMap: Record<string, Record<string, ValueEnumItem>> = {};
export const useDictDataValueEnum = (dictType: string) => {
  const [valueEnum, setValueEnum] = useState<Record<string, ValueEnumItem>>(valueEnumCacheMap[dictType] || {});
  useRequest(
    () => dictDictType({ dictType }),
    {
      refreshDeps: [dictType],
      manual: !!valueEnumCacheMap[dictType],
      onSuccess(res) {
        if (!res) return;
        const enumMap: Record<string, ValueEnumItem> = res.reduce((acc, item) => {
          const dictValue = String(item.dictValue);
          acc[dictValue] = {
            text: item.dictLabel || '',
            color: item.listClass?.startsWith('#') ? item.listClass : undefined,
            status: !item.listClass?.startsWith('#') ? item.listClass : undefined,
          };
          return acc;
        }, {} as Record<string, ValueEnumItem>);

        valueEnumCacheMap[dictType] = enumMap;
        setValueEnum(enumMap);
      },
    }
  );

  return valueEnum;
};

/**
 * 获取 tag 渲染的字典 tagCacheMap 为缓存
 */
export type DictTagItem = {
  label: string;
  render: () => JSX.Element;
};

export type DictTagMap = Record<string, DictTagItem>;

// 全局缓存，每种 dictType 只请求一次
export const tagCacheMap: Record<string, DictTagMap> = {};

export const useDictDataTagMap = (dictType: string) => {
  const [map, setMap] = useState<DictTagMap>(tagCacheMap[dictType] || {});

  // 顶层调用 useRequest，遵守 Hook 规则
  const { data } = useRequest(
    () => dictDictType({ dictType }),
    {
      refreshDeps: [dictType],
      manual: !!tagCacheMap[dictType], // 已缓存则不触发请求
      onSuccess(res) {
        if (!res) return;
        const tagMap: DictTagMap = res.reduce((acc: DictTagMap, item: any) => {
          const value = String(item.dictValue);
          const label = item.dictLabel || '';
          acc[value] = {
            label,
            render: () => {
              // 优先使用 listClass，如果是颜色码直接用
              if (item.listClass?.startsWith('#')) {
                return <Tag color={item.listClass}>{label}</Tag>;
              }
              if (item.listClass) {
                return <Tag color={item.listClass.toLowerCase()}>{label}</Tag>;
              }
              return <Tag>{label}</Tag>;
            },
          };
          return acc;
        }, {});
        tagCacheMap[dictType] = tagMap;
        setMap(tagMap);
      },
    },
  );

  return map;
};



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