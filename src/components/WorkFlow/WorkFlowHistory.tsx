import React, { useMemo } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Badge, Empty, Space, Tag, Timeline, Typography } from 'antd';
import type { TimelineItemProps } from 'antd';
import dayjs from 'dayjs';

const { Text, Paragraph } = Typography;

/** ====== 类型：你后端接入时只要适配这份结构即可 ====== */
export type WfAction =
  | 'ANY_APPROVE' // 或签同意
  | 'ALL_APPROVE' // 会签同意
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

/** ====== 组件 Props ====== */
export interface WorkFlowDetailProps {
  bizNo?: string;

  /** 传入你自己的数据（如果你不想在组件内请求） */
  records?: WfHistoryRecord[];

  /**
   * 也可以传入 fetcher（你接接口时用）
   * - 这里为了“能预览”，我不强依赖 useRequest，你自己接时随便用 useRequest/ReactQuery
   */
  fetcher?: (bizNo: string) => Promise<WfHistoryRecord[]>;

  title?: React.ReactNode;
  style?: React.CSSProperties;

  /** 展示模式：compact 更紧凑，default 更易读 */
  density?: 'default' | 'compact';

  /** 是否倒序（最新在最上） */
  reverse?: boolean;
}

/** ====== 动作文案/样式映射（你后面可按需要改） ====== */
function actionMeta(action: WfAction) {
  switch (action) {
    case 'START':
      return { text: '发起', color: 'blue' as const, badge: 'processing' as const };
    case 'ANY_APPROVE':
      return { text: '或签同意', color: 'green' as const, badge: 'success' as const };
    case 'ALL_APPROVE':
      return { text: '会签同意', color: 'green' as const, badge: 'success' as const };
    case 'REJECT':
      return { text: '驳回', color: 'red' as const, badge: 'error' as const };
    case 'ROLLBACK':
      return { text: '退回', color: 'orange' as const, badge: 'warning' as const };
    case 'WITHDRAW':
      return { text: '撤回', color: 'default' as const, badge: 'default' as const };
    case 'TRANSFER':
      return { text: '转签', color: 'purple' as const, badge: 'processing' as const };
    case 'ADD_SIGN':
      return { text: '加签', color: 'cyan' as const, badge: 'processing' as const };
    case 'SYSTEM':
    default:
      return { text: '系统', color: 'default' as const, badge: 'default' as const };
  }
}

function fmtTime(t?: string) {
  if (!t) return '';
  const d = dayjs(t);
  if (!d.isValid()) return String(t);
  return d.format('YYYY-MM-DD HH:mm');
}

function pickShowTime(r: WfHistoryRecord) {
  return fmtTime(r.finishTime || r.startTime);
}

function buildTitle(r: WfHistoryRecord) {
  const meta = actionMeta(r.action);

  // 转签：from -> to
  if (r.action === 'TRANSFER') {
    const from = r.fromOperatorName || r.operatorName || '-';
    const to = r.toOperatorName || '-';
    return (
      <Space size={8} wrap>
        <Text strong>{r.nodeName}</Text>
        <Tag color={meta.color}>{meta.text}</Tag>
        <Text type="secondary">
          {from} → {to}
        </Text>
      </Space>
    );
  }

  // 会签：显示进度
  if (r.action === 'ALL_APPROVE' && (r.signTotal || r.signDone)) {
    const done = r.signDone ?? 0;
    const total = r.signTotal ?? 0;
    return (
      <Space size={8} wrap>
        <Text strong>{r.nodeName}</Text>
        <Tag color={meta.color}>{meta.text}</Tag>
        <Tag>
          会签进度 {done}/{total}
        </Tag>
        {r.operatorName ? <Text type="secondary">{r.operatorName}</Text> : null}
      </Space>
    );
  }

  // 默认：节点 + 动作 + 操作人
  return (
    <Space size={8} wrap>
      <Text strong>{r.nodeName}</Text>
      <Tag color={meta.color}>{meta.text}</Tag>
      {r.operatorName ? <Text type="secondary">{r.operatorName}</Text> : null}
    </Space>
  );
}

function buildDescription(r: WfHistoryRecord, density: 'default' | 'compact') {
  const t = pickShowTime(r);
  const showComment = (r.comment ?? '').trim();

  return (
    <Space orientation="vertical" size={density === 'compact' ? 4 : 8} style={{ width: '100%' }}>
      <Space size={10} wrap>
        {t ? <Text type="secondary">{t}</Text> : null}
        {r.taskStatus ? (
          <Text type="secondary">
            状态：
            <Text code>{r.taskStatus}</Text>
          </Text>
        ) : null}
        {r.taskId ? (
          <Text type="secondary">
            taskId：<Text code>{r.taskId}</Text>
          </Text>
        ) : null}
      </Space>

      {showComment ? (
        <Paragraph style={{ marginBottom: 0 }} ellipsis={{ rows: 3, expandable: true }}>
          {showComment}
        </Paragraph>
      ) : null}
    </Space>
  );
}

function timelineDot(r: WfHistoryRecord) {
  const meta = actionMeta(r.action);

  // DONE/审批完成 → 绿
  if (r.taskStatus === 'DONE') return <Badge status="success" />;

  // TODO 当前处理中 → 蓝
  if (r.taskStatus === 'TODO') return <Badge status="processing" />;

  // CANCELED → 灰
  if (r.taskStatus === 'CANCELED') return <Badge status="default" />;

  // 如果没 taskStatus，用 action 的 badge
  return <Badge status={meta.badge} />;
}

/** ====== 默认 mock（为了你现在能预览） ====== */
const mockRecords: WfHistoryRecord[] = [
  {
    id: 1,
    nodeName: '发起申请',
    action: 'START',
    operatorName: '张三',
    taskStatus: 'DONE',
    finishTime: dayjs().subtract(2, 'day').toISOString(),
    comment: '请假 3 天，家里有事',
  },
  {
    id: 2,
    nodeName: '部门领导审批',
    action: 'TRANSFER',
    fromOperatorName: '李主管',
    toOperatorName: '王主管',
    operatorName: '系统',
    taskStatus: 'DONE',
    finishTime: dayjs().subtract(1, 'day').toISOString(),
    comment: '原审批人请假，转签给代班主管',
  },
  {
    id: 3,
    nodeName: '部门领导审批',
    action: 'ANY_APPROVE',
    operatorName: '王主管',
    taskStatus: 'DONE',
    finishTime: dayjs().subtract(20, 'hour').toISOString(),
    comment: '同意，注意交接',
  },
  {
    id: 4,
    nodeName: '会签：人事审批',
    action: 'ALL_APPROVE',
    operatorName: 'HR-赵',
    signDone: 1,
    signTotal: 2,
    taskStatus: 'DONE',
    finishTime: dayjs().subtract(3, 'hour').toISOString(),
    comment: '人事已确认',
  },
  {
    id: 5,
    nodeName: '会签：人事审批',
    action: 'ALL_APPROVE',
    operatorName: 'HR-钱',
    signDone: 2,
    signTotal: 2,
    taskStatus: 'DONE',
    finishTime: dayjs().subtract(2, 'hour').toISOString(),
    comment: '会签完成',
  },
  {
    id: 6,
    nodeName: '结束',
    action: 'SYSTEM',
    taskStatus: 'TODO',
    startTime: dayjs().subtract(10, 'minute').toISOString(),
    comment: '流程推进中（演示用）',
  },
];

const WorkFlowHistory: React.FC<WorkFlowDetailProps> = (props) => {
  const {
    bizNo,
    records,
    title = '审批历史',
    style,
    density = 'default',
    reverse = true,
  } = props;

  // 你接接口时：把 records 换成你请求得到的数据即可
  const data = records && records.length ? records : mockRecords;

  const items: TimelineItemProps[] = useMemo(() => {
    const list = reverse ? [...data].reverse() : data;
    return list.map((r) => ({
      dot: timelineDot(r),
      children: (
        <div style={{ paddingBottom: density === 'compact' ? 4 : 8 }}>
          {buildTitle(r)}
          <div style={{ marginTop: density === 'compact' ? 4 : 6 }}>
            {buildDescription(r, density)}
          </div>
        </div>
      ),
    }));
  }, [data, density, reverse]);

  return (
    <ProCard
      title={title}
      bordered
      style={{ marginTop: 12, ...style }}
      extra={bizNo ? <Text type="secondary">No：{bizNo}</Text> : null}
    >
      {items.length ? <Timeline items={items} /> : <Empty description="暂无审批历史" />}
    </ProCard>
  );
};

export default WorkFlowHistory;
