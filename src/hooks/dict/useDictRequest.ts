import { useEffect, useState } from 'react';
import { dictCache } from './dictCache';

export const useDictRequest = <T>(
  cacheKey: string,
  fetcher: () => Promise<T>
): T | undefined => {
  const [data, setData] = useState<T | undefined>(() =>
    dictCache.get(cacheKey)
  );

  useEffect(() => {
    if (dictCache.has(cacheKey)) return;

    let cancelled = false;

    fetcher().then((data) => {
      if (cancelled) return;
      dictCache.set(cacheKey, data);
      setData(data);
    });

    return () => {
      cancelled = true;
    };
  }, [cacheKey, fetcher]);

    // 订阅缓存变化
  useEffect(() => {
    const unsubscribe = dictCache.subscribe(cacheKey, () => {
      const cached = dictCache.get<T>(cacheKey);
      setData(cached);
    });
    return unsubscribe;
  }, [cacheKey]);

  return data;
};