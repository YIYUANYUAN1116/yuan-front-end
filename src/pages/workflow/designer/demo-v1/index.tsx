import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Input, Space, Typography } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import '@logicflow/core/dist/index.css';
import './index.less';
import LogicFlow from '@logicflow/core';
import { Menu } from '@logicflow/extension';

const { Paragraph, Text } = Typography;

const FlowEditor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lfRef = useRef<LogicFlow | null>(null);
  const [dataPreview, setDataPreview] = useState('');

  const initialData = useMemo(
    () => ({
      nodes: [
        {
          id: 'start',
          type: 'circle',
          x: 140,
          y: 120,
          text: '开始',
          properties: {
            status: 'start',
          },
        },
        {
          id: 'approve-1',
          type: 'rect',
          x: 360,
          y: 120,
          text: '部门主管审批',
          properties: {
            role: 'manager',
          },
        },
        {
          id: 'approve-2',
          type: 'rect',
          x: 580,
          y: 120,
          text: '人事审批',
          properties: {
            role: 'hr',
          },
        },
        {
          id: 'end',
          type: 'circle',
          x: 800,
          y: 120,
          text: '结束',
          properties: {
            status: 'end',
          },
        },
      ],
      edges: [
        {
          id: 'edge-1',
          type: 'polyline',
          sourceNodeId: 'start',
          targetNodeId: 'approve-1',
        },
        {
          id: 'edge-2',
          type: 'polyline',
          sourceNodeId: 'approve-1',
          targetNodeId: 'approve-2',
          text: '同意',
        },
        {
          id: 'edge-3',
          type: 'polyline',
          sourceNodeId: 'approve-2',
          targetNodeId: 'end',
          text: '归档',
        },
      ],
    }),
    [],
  );

  useEffect(() => {
    if (!containerRef.current || lfRef.current) {
      return;
    }

    const lf = new LogicFlow({
      container: containerRef.current,
      grid: {
        size: 12,
        visible: true,
      },
      keyboard: {
        enabled: true,
      },
      edgeType: 'polyline',
      plugins: [Menu]
    });

    lf.render(initialData);
    lfRef.current = lf;
    setDataPreview(JSON.stringify(lf.getGraphData(), null, 2));

    return () => {
      lfRef.current?.destroy();
      lfRef.current = null;
    };
  }, [initialData]);

  const handleAddNode = (type: 'rect' | 'circle', label: string) => {
    const lf = lfRef.current;
    if (!lf) {
      return;
    }

    const baseX = 220 + Math.random() * 400;
    const baseY = 180 + Math.random() * 260;

    lf.addNode({
      type,
      x: baseX,
      y: baseY,
      text: label,
    });
  };

  const handleExport = () => {
    const lf = lfRef.current;
    if (!lf) {
      return;
    }
    setDataPreview(JSON.stringify(lf.getGraphData(), null, 2));
  };

  const handleReset = () => {
    const lf = lfRef.current;
    if (!lf) {
      return;
    }
    lf.render(initialData);
    setDataPreview(JSON.stringify(lf.getGraphData(), null, 2));
  };

  return (
    <PageContainer
      title="审批流编辑器"
      content="拖拽并配置审批节点，生成审批流程草稿。"
    >
      <div className="flowEditor">
        <Card>
          <Space orientation="vertical" size={4}>
            <Text strong>快捷操作</Text>
            <Text type="secondary">支持拖动节点、连接线、键盘删除。</Text>
          </Space>
          <Space style={{ marginTop: 16 }} wrap>
            <Button onClick={() => handleAddNode('circle', '发起人')}>
              新增发起节点
            </Button>
            <Button onClick={() => handleAddNode('rect', '审批人')}>
              新增审批节点
            </Button>
            <Button onClick={() => handleAddNode('rect', '抄送人')}>
              新增抄送节点
            </Button>
            <Button onClick={handleReset}>重置示例</Button>
            <Button type="primary" onClick={handleExport}>
              导出流程数据
            </Button>
          </Space>
        </Card>
        <div className="editorLayout">
          <Card className="paletteCard" title="节点说明">
            <Space orientation="vertical" size={12}>
              <Paragraph>
                <Text strong>圆形节点：</Text>
                <Text type="secondary">表示开始/结束与发起人节点。</Text>
              </Paragraph>
              <Paragraph>
                <Text strong>矩形节点：</Text>
                <Text type="secondary">用于审批、抄送等业务处理。</Text>
              </Paragraph>
              <Paragraph>
                <Text strong>连线：</Text>
                <Text type="secondary">表示流转方向，可点击编辑文案。</Text>
              </Paragraph>
              <Paragraph>
                <Text type="secondary">
                  建议：为关键审批节点补充角色、条件等属性。
                </Text>
              </Paragraph>
            </Space>
          </Card>
          <Card
            className="canvasCard"
            title="流程画布"
            styles={{
              body:{
                padding : 0
              }
            }}
          >
            <div className="canvasContainer" ref={containerRef} />
          </Card>
          <Card title="流程数据" className="sidePanel">
            <Paragraph type="secondary">
              点击“导出流程数据”即可更新右侧 JSON。
            </Paragraph>
            <Input.TextArea
              className="dataPreview"
              value={dataPreview}
              autoSize={{ minRows: 20 }}
              readOnly
            />
          </Card>
        </div>
      </div>
    </PageContainer>
  );
};

export default FlowEditor;