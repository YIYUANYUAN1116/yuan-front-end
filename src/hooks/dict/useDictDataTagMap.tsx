import { Tag } from 'antd';
import { useDictRequest } from './useDictRequest';
import { dictDictType } from '@/services/yuan/sysDictDataController';
import { DictTagMap } from '../DictHook';

export const useDictDataTagMap = (dictType: string) => {
  const data = useDictRequest(
    `dict-tag-map-${dictType}`,
    () => dictDictType({ dictType }).then(res => res.data)
  );

  if (!data) return {};

  return data.reduce((acc, item) => {
    acc[String(item.dictValue)] = {
      label: item.dictLabel || '',
      render: () => (
        <Tag color={item.listClass || 'default'}>
          {item.dictLabel}
        </Tag>
      ),
    };
    return acc;
  }, {} as DictTagMap);
};
