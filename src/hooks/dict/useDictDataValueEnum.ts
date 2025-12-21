import { dictDictType } from '@/services/yuan/sysDictDataController';
import { useDictRequest } from './useDictRequest';

export const useDictDataValueEnum = (dictType: string) => {
  const data = useDictRequest(
    `dict-value-enum-${dictType}`,
    () => dictDictType({ dictType }).then(res => res.data)
  );

  if (!data) return {};

  return data.reduce((acc, item) => {
    acc[String(item.dictValue)] = {
      text: item.dictLabel,
      status: item.listClass,
    };
    return acc;
  }, {} as Record<string, any>);
};
