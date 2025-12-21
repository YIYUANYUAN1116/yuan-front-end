import { ActionType } from '@ant-design/pro-components';
import { useRequest } from 'ahooks';
import { message } from 'antd';

export const useActionRequest = <TParams, TResult>(
  service: (params: TParams) => Promise<TResult>,
  reload?: ActionType['reload'],
  options?: {
    successMessage?: string;
    errorMessage?: string;
  }
) => {
  const { successMessage, errorMessage } = options || {};
  return useRequest(service, {
    manual: true, /**不自动调用 service,✅ 仍然会创建 Hook 实例  点击操作可使用*/
    onSuccess: () => {
      successMessage ? message.success(successMessage) : '';
      reload?.();
    },
    onError: (error) => {
      console.error('接口出错:', error);
      errorMessage ? message.error(errorMessage) : '';
    },
    // defaultParams: [{ pageNum: 1, pageSize: 10 }],
    //debounceWait: 300 防抖 搜索框 自动补全
    //throttleWait: 1000 滚动加载 高频点击
    //pollingInterval: 5000 轮询
  });
};
