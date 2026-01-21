/** ====== UI 扁平记录类型（Timeline 一条条展示） ====== */
export type WfAction =
  | 'ANY_APPROVE' // 或签同意
  | 'ALL_APPROVE' // 会签同意
  | 'APPROVE' // 单人通过（兼容）
  | 'REJECT' // 驳回
  | 'ROLLBACK' // 退回
  | 'WITHDRAW' // 撤回
  | 'TRANSFER' // 转签
  | 'ADD_SIGN' // 加签
  | 'START' // 发起
  | 'SYSTEM'; // 系统动作

export type WfRecordStatus = 'TODO' | 'DONE' | 'CANCELED';

export interface WfHistoryRecord {
  id: string | number;

  /** 业务标识 */
  bizNo?: string;

  /** 节点信息 */
  nodeKey?: string;
  nodeName: string;

  /** 任务信息 */
  taskId?: string | number;
  taskStatus?: WfRecordStatus;

  /** 操作信息 */
  action: WfAction;
  operatorId?: string | number;
  operatorName?: string;

  /** 转签：from -> to */
  fromOperatorName?: string;
  toOperatorName?: string;

  /** 会签：总数/完成数（可选） */
  signTotal?: number;
  signDone?: number;

  /** 时间 */
  startTime?: string;
  finishTime?: string;

  /** 意见 */
  comment?: string;

  /** 其它扩展字段 */
  extra?: Record<string, any>;
}