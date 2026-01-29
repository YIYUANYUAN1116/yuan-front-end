import React, {useMemo } from 'react';
import { ProCard } from '@ant-design/pro-components';
import { Space, Tag, Timeline, Typography } from 'antd';


const { Text } = Typography;

/** ====== 组件 Props ====== */
export interface WorkFlowDetailProps {
  bizNo?: string;
  wfData?: API.WfApprovalDetailVO;
  reverse?: boolean;
}

const WorkFlowHistory: React.FC<WorkFlowDetailProps> = (props) => {
  const { bizNo, wfData, reverse = true } = props;

  const timelineEvents = (wfData as any)?.timeline as API.WfTimelineEventVo[] | undefined;
  console.log(wfData)

  
  const toTimelineColor = (e: API.WfTimelineEventVo) => {
    if (e.result === 'FAIL') return 'red';
    if (e.action === 'REJECT') return 'red';
    if (e.action === 'ROLLBACK' || e.action === 'WITHDRAW') return 'orange';
    if (e.action === 'TRANSFER') return 'blue';
    if (e.action === 'GATEWAY') return 'gray';
    return 'green';
  }

  const actionText = (e: API.WfTimelineEventVo) => {
    const from = e.fromNodeName ? `【${e.fromNodeName}】` : '';
    const to = e.toNodeName ? `【${e.toNodeName}】` : '';
    switch (e.action) {
      case 'START':
        return '发起流程';
      case 'APPROVE':
        return `同意${from}`;
      case 'REJECT':
        return `拒绝${from}`;
      case 'ROLLBACK':
        return `从${from}退回至${to}`;
      case 'WITHDRAW':
        return `撤回流程${to ? `至${to}` : ''}`;
      case 'TRANSFER':
        return `转交${from}`;
      case 'GATEWAY':
        return `系统流转至${to}`;
      case 'END':
        return '流程结束';
      default:
        return e.action;
    }
  }

  const timelineItems = useMemo(() => {
    const list = (timelineEvents ?? []).slice();
    if (reverse) list.reverse();

    return list.map(e => ({
      color: toTimelineColor(e),
      children: (
        <div style={{ width: '100%' }}>
          <Space size={8} wrap>
            <Text strong>{actionText(e)}</Text>

            {e.operatorType === 'SYSTEM' ? (
              <Tag>系统</Tag>
            ) : (
              <Tag>{e.operatorName ?? '用户'}</Tag>
            )}

            {e.result === 'FAIL' ? <Tag color="red">失败</Tag> : <Tag color="green">成功</Tag>}

            <Text type="secondary">{e.time}</Text>
          </Space>

          {(e.comment || e.conditionExpr) && (
            <div style={{ marginTop: 6 }}>
              {e.comment && (
                <div>
                  <Text type="secondary">{e.action == 'START'?"申请理由：":"审批意见："}</Text>
                  <Text>{e.comment}</Text>
                </div>
              )}
              {e.conditionExpr && (
                <div style={{ marginTop: 4 }}>
                  <Text type="secondary">条件：</Text>
                  <Text code>{e.conditionExpr}</Text>
                </div>
              )}
            </div>
          )}
        </div>
      ),
    }))

  }, [timelineEvents, reverse])


  return (
    <ProCard
      title={'审批历史'}
      bordered
      style={{ marginTop: 12 }}
      extra={bizNo ? <Text type="secondary">No：{bizNo}</Text> : null}
    >
      {/* Timeline */}
      <ProCard
        title="操作时间线"
        size="small"
        bordered
        bodyStyle={{ paddingTop: 12 }}
      >
        <Timeline items={timelineItems} />
      </ProCard>
    </ProCard>
  );
};

export default WorkFlowHistory;
