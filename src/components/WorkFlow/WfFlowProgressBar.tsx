import React, { useMemo } from "react";
import { Card, Steps, Tooltip, Tag, Space, Typography } from "antd";

const { Text } = Typography;

export type LfNode = API.LfNode

export type WfTimelineEventVo = API.WfTimelineEventVo

export type WfFlowProgressBarProps = {
  layers?: LfNode[][];
  timeline?: WfTimelineEventVo[];
  title?: string;
};

function nodeLabel(n?: LfNode): string {
  const v = n?.text?.value?.trim();
  return v ? v : (n?.id || "-");
}

function actionLabel(a?: WfTimelineEventVo["action"]): string {
  switch (a) {
    case "START": return "发起";
    case "APPROVE": return "同意";
    case "REJECT": return "驳回";
    case "ROLLBACK": return "退回";
    case "WITHDRAW": return "撤回";
    case "TRANSFER": return "转交";
    case "ADD_SIGN": return "加签";
    case "GATEWAY": return "网关";
    case "END": return "结束";
    default: return a || "操作";
  }
}

function parseTimeMs(t?: string): number | undefined {
  if (!t) return undefined;
  const ms = Date.parse(t);
  return Number.isFinite(ms) ? ms : undefined;
}

function formatDuration(ms?: number): string {
  if (ms == null || ms < 0) return "";
  const min = Math.floor(ms / 60000);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const mm = min % 60;
  const hh = hour % 24;
  if (day > 0) return `${day}天${hh}小时${mm}分钟`;
  if (hour > 0) return `${hour}小时${mm}分钟`;
  return `${Math.max(1, min)}分钟`;
}

function isStartNode(n?: LfNode) {
  const t = (n?.type || "").toLowerCase();
  return t.includes("start");
}
function isEndNode(n?: LfNode) {
  const t = (n?.type || "").toLowerCase();
  return t.includes("end");
}

type TimelineIndex = {
  events: WfTimelineEventVo[];
  // 节点“到达过”判定：toNodeKey 出现过
  visitedByTo: Set<string>;
  // 节点“处理过”事件：fromNodeKey -> 最新事件（谁在这个节点操作）
  latestByFrom: Map<string, WfTimelineEventVo>;
  // 节点“进入”事件：toNodeKey -> 最新事件（谁把流程推到这个节点）
  latestByTo: Map<string, WfTimelineEventVo>;
  // 近似耗时：按事件序列相邻时间差，绑定到 toNodeKey（进入某节点的耗时）
  durationByTo: Map<string, number>;
  // START 事件（用于开始节点显示）
  firstStart?: WfTimelineEventVo;
};

function buildIndex(timeline: WfTimelineEventVo[]): TimelineIndex {
  const events = [...(timeline || [])].sort((a, b) => (a.time || "").localeCompare(b.time || ""));

  const visitedByTo = new Set<string>();
  const latestByFrom = new Map<string, WfTimelineEventVo>();
  const latestByTo = new Map<string, WfTimelineEventVo>();
  const durationByTo = new Map<string, number>();

  let prevMs: number | undefined;
  let firstStart: WfTimelineEventVo | undefined;

  for (const e of events) {
    if (!firstStart && e.action === "START") firstStart = e;

    if (e.fromNodeKey) {
      latestByFrom.set(e.fromNodeKey, e);
    }
    if (e.toNodeKey) {
      visitedByTo.add(e.toNodeKey);
      latestByTo.set(e.toNodeKey, e);

      const ms = parseTimeMs(e.time);
      if (ms != null && prevMs != null && !durationByTo.has(e.toNodeKey)) {
        durationByTo.set(e.toNodeKey, ms - prevMs);
      }
      if (ms != null) prevMs = ms;
    } else {
      const ms = parseTimeMs(e.time);
      if (ms != null) prevMs = ms;
    }
  }

  return { events, visitedByTo, latestByFrom, latestByTo, durationByTo, firstStart };
}

type LayerMeta = {
  idx: number;
  layer: LfNode[];
  mainNode?: LfNode;
  visited: boolean;
  // 用于“下面显示的名字/时间”
  showEvent?: WfTimelineEventVo;
  // tooltip 里显示的耗时（近似）
  durMs?: number;
};

type StepItem = {
  key: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  status?: "finish" | "process" | "wait" | "error";
};

const WfFlowProgressBar: React.FC<WfFlowProgressBarProps> = ({ layers = [], timeline = [], title = "流程进度" }) => {
  const idx = useMemo(() => buildIndex(timeline || []), [timeline]);

  const layerMeta: LayerMeta[] = useMemo(() => {
    return (layers || []).map((layer, i) => {
      const safeLayer = layer || [];
      const mainNode = safeLayer[0];

      // 到达判定：只要层内任一节点 id 出现在 toNodeKey 就算到达
      const visited = safeLayer.some((n) => idx.visitedByTo.has(n.id)) || (i === 0 && idx.firstStart != null);

      // 关键：下面显示的人/时间怎么取？
      // - start：用 START 事件 operator/time
      // - end：用 “进入 end(toNodeKey=end)” 的事件 operator/time
      // - 其他：优先用 “处理该节点(fromNodeKey=nodeId)” 的事件 operator/time
      // - 并行层：取层内节点里“最新处理事件(from)”（谁最后在这一层动过手）
      let showEvent: WfTimelineEventVo | undefined;

      if (isStartNode(mainNode)) {
        showEvent = idx.firstStart;
      } else if (isEndNode(mainNode)) {
        if (mainNode?.id) showEvent = idx.latestByTo.get(mainNode.id);
      } else {
        // 并行层：取层内 from 事件里时间最大的一条
        for (const n of safeLayer) {
          const e = idx.latestByFrom.get(n.id);
          if (!e) continue;
          if (!showEvent) showEvent = e;
          else if ((e.time || "").localeCompare(showEvent.time || "") > 0) showEvent = e;
        }
        // 兜底：如果该节点还没人处理过，至少拿进入事件(to)作为展示
        if (!showEvent) {
          for (const n of safeLayer) {
            const e = idx.latestByTo.get(n.id);
            if (e) {
              showEvent = e;
              break;
            }
          }
        }
      }

      // 耗时：仍然按“进入该节点(to)”的首次差值近似
      let durMs: number | undefined;
      if (mainNode?.id) durMs = idx.durationByTo.get(mainNode.id);
      if (durMs == null) {
        for (const n of safeLayer) {
          const d = idx.durationByTo.get(n.id);
          if (d != null) {
            durMs = d;
            break;
          }
        }
      }

      return { idx: i, layer: safeLayer, mainNode, visited, showEvent, durMs };
    });
  }, [layers, idx]);

  const currentIndex = useMemo(() => {
    const i = layerMeta.findIndex((x) => !x.visited);
    return i >= 0 ? i : Math.max(0, layerMeta.length - 1);
  }, [layerMeta]);

  const stepItems: StepItem[] = useMemo(() => {
    return layerMeta.map((m) => {
      const isParallel = m.layer.length > 1;
      const titleText = isParallel ? `会签(${m.layer.length})` : nodeLabel(m.mainNode);

      const desc = (
        <div style={{ marginTop: 6, lineHeight: 1.4 }}>
          <div>
            <Text type="secondary">{m.showEvent?.operatorName || "—"}</Text>
          </div>
          {m.showEvent?.time ? (
            <div>
              <Text type="secondary">{m.showEvent.time}</Text>
            </div>
          ) : null}
        </div>
      );

      const status: "finish" | "process" | "wait" =
        m.visited ? "finish" : (m.idx === currentIndex ? "process" : "wait");

      return { key: `layer-${m.idx}`, title: titleText, description: desc, status };
    });
  }, [layerMeta, currentIndex]);

  return (
    <Card title={title} bordered>
      <Steps
        orientation="horizontal"
        responsive
        current={currentIndex}
        items={stepItems as any}
        type={'dot'}

        iconRender={(dot, info) => {
          const i = typeof info.index === "number" ? info.index : 0;
          const m = layerMeta[i];
          if (!m) return dot;

          const e = m.showEvent;
          const durText = formatDuration(m.durMs);

          const tooltipContent = (
            <div style={{ maxWidth: 520 }}>
              <div style={{ marginBottom: 6 }}>
                <Text strong>阶段：</Text><Text>{i + 1}</Text>
                {m.visited ? <Tag style={{ marginLeft: 8 }}>已到达</Tag> : <Tag style={{ marginLeft: 8 }}>未到达</Tag>}
                {durText ? <Tag style={{ marginLeft: 8 }}>耗时：{durText}</Tag> : null}
              </div>

              <div style={{ marginBottom: 6 }}>
                <Text strong>节点：</Text>
                <Space size={[6, 6]} wrap style={{ marginLeft: 6 }}>
                  {m.layer.map((n) => <Tag key={n.id}>{nodeLabel(n)}</Tag>)}
                </Space>
              </div>

              {e ? (
                <>
                  <div style={{ marginBottom: 6 }}>
                    <Text strong>动作：</Text>
                    <Text style={{ marginLeft: 6 }}>
                      {actionLabel(e.action)}{e.result ? ` · ${e.result}` : ""}
                    </Text>
                  </div>

                  <div style={{ marginBottom: 6 }}>
                    <Text strong>执行：</Text>
                    <Text style={{ marginLeft: 6 }}>
                      {e.operatorName || "系统"}{e.time ? ` · ${e.time}` : ""}
                    </Text>
                  </div>

                  <div style={{ marginBottom: 6 }}>
                    <Text strong>路径：</Text>
                    <Text style={{ marginLeft: 6 }}>
                      {(e.fromNodeName || e.fromNodeKey || "-") + " → " + (e.toNodeName || e.toNodeKey || "-")}
                    </Text>
                  </div>

                  {e.comment ? (
                    <div style={{ marginBottom: 6 }}>
                      <Text strong>说明：</Text><Text style={{ marginLeft: 6 }}>{e.comment}</Text>
                    </div>
                  ) : null}

                  {e.conditionExpr ? (
                    <div style={{ marginBottom: 6 }}>
                      <Text strong>命中条件：</Text><Text style={{ marginLeft: 6 }}>{e.conditionExpr}</Text>
                    </div>
                  ) : null}
                </>
              ) : (
                <Text type="secondary">暂无该阶段轨迹</Text>
              )}
            </div>
          );

          // ✅ 白底 tooltip：Antd v5 支持 color / overlayInnerStyle
          return (
            <Tooltip
              title={tooltipContent}
              placement="top"
              color="#fff"
              styles={{ container: { color: "rgba(0,0,0,0.88)" } }}
            >
              <span>{dot}</span>
            </Tooltip>
          );
        }}
      />
    </Card>
  );
};

export default WfFlowProgressBar;
