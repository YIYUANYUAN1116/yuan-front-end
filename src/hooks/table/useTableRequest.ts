import { useCallback } from 'react';

/**
 * 后台管理系统通用 Table Request
 */
export const useTableRequest = <
  TBo extends Record<string, any>,
  TRow
>(
  service: (params: {
    bo: TBo;
    pageQuery: {
      pageNum: number;
      pageSize: number;
      orderByColumn?: string;
      isAsc?: 'asc' | 'desc';
    };
  }) => Promise<any>,
  options?: {
    defaultSort?: {
      column: string;
      order: 'asc' | 'desc';
    };
  }
) => {
  return useCallback(
    async (params: any, sort: Record<string, 'ascend' | 'descend' | null>) => {
      /** 1️⃣ 排序处理 */
      let orderByColumn: string | undefined;
      let isAsc: 'asc' | 'desc' | undefined;

      const sortField = Object.keys(sort || {})[0];
      const sortOrder = sortField && sort[sortField];

      if (sortField && sortOrder) {
        orderByColumn = sortField;
        isAsc = sortOrder === 'ascend' ? 'asc' : 'desc';
      } else if (options?.defaultSort) {
        orderByColumn = options.defaultSort.column;
        isAsc = options.defaultSort.order;
      }
      

      /** 2️⃣ 请求参数拼装 */
      const requestParams = {
        bo: params,
        pageQuery: {
          pageNum: params.current,
          pageSize: params.pageSize,
          orderByColumn,
          isAsc,
        },
      };

      /** 3️⃣ 调接口 */
      const res = await service(requestParams);

      /** 4️⃣ 统一返回结构 */
      return {
        data: res?.rows || [],
        success: true,
        total: res?.total || 0,
      };
    },
    [service]
  );
};
