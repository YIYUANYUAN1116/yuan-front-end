import { dictDictType } from "@/services/yuan/sysDictDataController";
import { ActionType } from "@ant-design/pro-components";
import { useRequest } from "@umijs/max";
import { message } from "antd";
import { SortOrder } from "antd/es/table/interface";

type ListRequestFn<P, R> = (params: P) => Promise<R>;

/**
 * 通用ProTable 查询
 * @param requestFn 请求接口
 * @returns 
 */
export const createFetchList = <
    P extends Record<string, any>,
    T
>(
    requestFn: ListRequestFn<P, { rows: T[]; total: number }>
) => {
    return async (
        params: P,
        sort?: Record<string, SortOrder>
    ) => {
        const requestParams: any = { ...params };
        // if (sort && Object.keys(sort).length > 0) {
        //     const [orderByColumn] = Object.keys(sort);
        //     requestParams.orderByColumn = orderByColumn;
        //     requestParams.isAsc = sort[orderByColumn];
        // }
        if (sort && Object.keys(sort).length > 0) {
            requestParams.orderByColumn = Object.keys(sort)[0];
            requestParams.isAsc = sort[Object.keys(sort)[0]];
        }

        const res = await requestFn(requestParams);

        return {
            data: res.rows || [],
            total: res.total || 0,
            success: true,
        };
    };
};


/**
 * 通用loading接口
 * @param apiFn 接口函数
 * @param actionRef ProTable 的 actionRef，用于刷新
 * @param options 可选配置
 */
export const createLoadingRequest = <T extends (...args: any[]) => Promise<any>>(
    apiFn: T,
    reload?: ActionType['reload'],
    options?: {
        successMessage?: string;
        errorMessage?: string;
    }
) => {
    const { successMessage, errorMessage } = options || {};
    return useRequest(apiFn, {
        manual: true,
        onSuccess: () => {
            successMessage ? message.success(successMessage) : '';
            reload?.();
        },
        onError: (error) => {
            console.error('接口出错:', error);
            errorMessage ? message.error(errorMessage) : '';
        },
    });
};

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
