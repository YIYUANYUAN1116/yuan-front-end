import React, { useEffect, useMemo } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Badge, Empty, Space, Tag, Timeline, Typography } from 'antd';
import type { TimelineItemProps } from 'antd';
import dayjs from 'dayjs';
import { useRequest } from '@umijs/max';
import { wfInstanceDetail } from '@/services/yuan/wfInstanceController';
import { WfAction, WfHistoryRecord, WfRecordStatus } from './types';

const { Text, Paragraph } = Typography;

/** ====== 组件 Props ====== */
export interface WorkFlowDetailProps {
  bizNo?: string;

  /** 外部直接传入 UI records（不想组件内请求时使用） */
  records?: WfHistoryRecord[];

  title?: React.ReactNode;
  style?: React.CSSProperties;

  /** 展示模式：compact 更紧凑，default 更易读 */
  density?: 'default' | 'compact';

  /** 是否倒序（最新在最上） */
  reverse?: boolean;
}

/** ====== 动作文案/样式映射 ====== */
function actionMeta(action: WfAction) {
  switch (action) {
    case 'START':
      return { text: '发起', color: 'blue' as const, badge: 'processing' as const };
    case 'ANY_APPROVE':
      return { text: '或签同意', color: 'green' as const, badge: 'success' as const };
    case 'ALL_APPROVE':
      return { text: '会签同意', color: 'green' as const, badge: 'success' as const };
    case 'APPROVE':
      return { text: '通过', color: 'green' as const, badge: 'success' as const };
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
            状态：<Text code>{r.taskStatus}</Text>
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

  if (r.taskStatus === 'DONE') return <Badge status="success" />;
  if (r.taskStatus === 'TODO') return <Badge status="processing" />;
  if (r.taskStatus === 'CANCELED') return <Badge status="default" />;

  return <Badge status={meta.badge} />;
}

/**
 * ====== 核心：把后端 WfApprovalDetailVO 转成 Timeline 扁平 records ======
 * 约定 wfData 结构 ：
 * - wfData.timeline: NodeTimelineVO[]
 * - NodeTimelineVO: { nodeInstanceId, nodeKey, nodeName, status, orderNo, operatorId, operatorName, finishedTime, tasks }
 * - TaskTimelineVO: { taskId, status, lastAction, lastComment, lastOperatorId, lastOperatorName, createTime, finishTime, logs }
 * - TaskLogVO: { id, action, operatorId, operatorName, comment, operateTime }
 */
function mapApprovalDetailToRecords(wfData: API.WfApprovalDetailVO): WfHistoryRecord[] {
  const timeline = wfData?.timeline ?? [];
  if (!Array.isArray(timeline) || timeline.length === 0) return [];

  const bizNo: string | undefined = wfData?.biz?.bizNo; // bizRef 有 bizNo 字段可带上
  const records: WfHistoryRecord[] = [];

  // 排序：按 orderNo 升序
  const nodes = [...timeline].sort((a: API.WfNodeInstanceVo, b: API.WfNodeInstanceVo) => (a?.orderNo ?? 0) - (b?.orderNo ?? 0));

  for (const node of nodes) {
    const nodeKey = node?.nodeKey;
    const nodeName = node?.nodeName || nodeKey || '节点';

    const tasks: any[] = Array.isArray(node?.tasks) ? node.tasks : [];

    // 1) 有任务：优先用 task.logs（动作事实最完整）
    if (tasks.length > 0) {
      for (const task of tasks) {
        const taskId = task?.taskId;
        const taskStatus: WfRecordStatus | undefined = task?.status;

        const logs: any[] = Array.isArray(task?.logs) ? task.logs : [];

        if (logs.length > 0) {
          for (const log of logs) {
            const action = (log?.action || 'SYSTEM') as WfAction;

            // 转交：如果你后端 log.extra 里带了 from/to，这里可以映射
            const extra = log?.extra || {};

            records.push({
              id: log?.id ?? `${taskId}-${log?.operateTime ?? Math.random()}`,
              bizNo,
              nodeKey,
              nodeName,

              taskId,
              taskStatus,

              action,
              operatorId: log?.operatorId,
              operatorName: log?.operatorName,

              fromOperatorName: extra?.fromOperatorName,
              toOperatorName: extra?.toOperatorName,

              signDone: extra?.signDone,
              signTotal: extra?.signTotal,

              finishTime: log?.operateTime,
              comment: log?.comment,
              extra,
            });
          }
        } else if (task?.lastAction) {
          // 2) 没有 logs：降级用 task 的 lastAction/lastComment
          records.push({
            id: `${taskId}-last`,
            bizNo,
            nodeKey,
            nodeName,

            taskId,
            taskStatus,

            action: (task?.lastAction as WfAction) || 'SYSTEM',
            operatorId: task?.lastOperatorId,
            operatorName: task?.lastOperatorName,

            startTime: task?.createTime,
            finishTime: task?.finishTime,
            comment: task?.lastComment,
          });
        } else {
          // 3) 任务存在但无动作（极少见）：给个占位
          records.push({
            id: `${taskId}-placeholder`,
            bizNo,
            nodeKey,
            nodeName,
            taskId,
            taskStatus,
            action: 'SYSTEM',
            startTime: task?.createTime,
          });
        }
      }
    } else {
      // 4) 节点没有任务：例如 START/GATEWAY/END 自动节点
      // 用 node.status 映射一个展示状态
      const nodeStatus = node?.status;
      const taskStatus: WfRecordStatus =
        nodeStatus === 'WAIT' ? 'TODO' : nodeStatus === 'CANCELED' ? 'CANCELED' : 'DONE';

      records.push({
        id: `node-${node?.id ?? nodeKey ?? Math.random()}`,
        bizNo,
        nodeKey,
        nodeName,
        taskStatus,
        action: node?.nodeType === 'START' ? 'START' : 'SYSTEM',
        operatorId: node?.operatorId,
        operatorName: node?.operatorName,
        finishTime: node?.finishedTime,
        extra: {
          nodeType: node?.nodeType,
          // cancelReason: node?.cancelReason,
          // selectedTargetKey: node?.selectedTargetKey, // 如果后面加了网关命中字段
        },
      });
    }
  }

  return records;
}

const WorkFlowHistory: React.FC<WorkFlowDetailProps> = (props) => {
  const { bizNo, records, title = '审批历史', style, density = 'default', reverse = true } = props;

  const {
    data: wfData,
    loading,
    run: fetchWFDetail,
    error,
  } = useRequest(wfInstanceDetail, { manual: true });

  useEffect(() => {
    if (bizNo) {
      fetchWFDetail({ bizNo });
    }
  }, [bizNo]); // eslint-disable-line react-hooks/exhaustive-deps

  const data: WfHistoryRecord[] = useMemo(() => {
    if (records?.length) return records;
    if (wfData) return mapApprovalDetailToRecords(wfData);
    return [];
  }, [records, wfData]);

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
      loading={loading}
      style={{ marginTop: 12, ...style }}
      extra={bizNo ? <Text type="secondary">No：{bizNo}</Text> : null}
    >
      {error ? (
        <Empty description="加载失败" />
      ) : items.length ? (
        <Timeline items={items} />
      ) : (
        <Empty description="暂无审批历史" />
      )}
    </ProCard>
  );
};

export default WorkFlowHistory;
