import { dictDictType } from "@/services/yuan/sysDictDataController";


// 全局缓存对象（关键！）
export const dictCache = new Map<string, Record<string, { text: string; status?: string; color?: string }>>();

// 获取字典数据（带缓存）
export const getDictData = async (dictType: string) => {
  // 检查缓存
  if (dictCache.has(dictType)) {
    return dictCache.get(dictType)!;
  }

  // 没有缓存才请求
  const res = await dictDictType({ dictType });
  const enumData = convertDictToValueEnum(res.data||[]);
  
  // 缓存结果
  dictCache.set(dictType, enumData);
  return enumData;
};

// 转换字典数据（和你之前逻辑一致）
const convertDictToValueEnum = (data: API.SysDictDataVo[]) => {
  const enumData: Record<string, { text: string; status?: string; color?: string }> = {};
  data.forEach(item => {
    const dictValue = item.dictValue as string;
    const text = item.dictLabel || dictValue; // 关键：避免空text
    
    if (item.listClass?.startsWith("#")) {
      enumData[dictValue] = { text, color: item.listClass };
    } else {
      enumData[dictValue] = { text, status: item.listClass };
    }
  });
  return enumData;
};