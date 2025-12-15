import { ActionType } from "@ant-design/pro-components";
import { useRequest } from "@umijs/max";
import { message } from "antd";
import { SortOrder } from "antd/es/table/interface";
import { log } from "console";

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
    const { successMessage, errorMessage} = options || {};
    return useRequest(apiFn, {
        manual: true,
        onSuccess: () => {
            successMessage?message.success(successMessage):'';
            reload?.();
        },
        onError: (error) => {
            console.error('接口出错:', error);
            errorMessage?message.error(errorMessage):'';
        },
    });
};