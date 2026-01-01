import { PageContainer } from '@ant-design/pro-components';
import { DndPanel, Menu, SelectionSelect } from '@logicflow/extension';
import { Button, Card, Form, Input, message, Select, Space, Typography } from 'antd';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import '@logicflow/extension/lib/style/index.css';
import "@logicflow/core/lib/style/index.css";
import './index.less';
import LogicFlow from '@logicflow/core';
import { useSearchParams } from '@umijs/max';
import { Assignee, GatewayBranchVM, initialFlowData, WfType } from '../types.ts/DesiginerTypes';
const { Text } = Typography;

const roleOptions = [
  { label: '部门主管', value: 'manager' },
  { label: '人事', value: 'hr' },
];

const userOptions = [
  { label: '张三', value: '1001' },
  { label: '李四', value: '1002' },
];

const deptOptions = [
  { label: '研发部', value: 'dept_rd' },
  { label: '财务部', value: 'dept_fin' },
];

const FlowEditor: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const lfRef = useRef<LogicFlow | null>(null);
  const [dataPreview, setDataPreview] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [form] = Form.useForm();
  const [gatewayBranches, setGatewayBranches] = useState<GatewayBranchVM[]>([]);

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');
  const definitionName = searchParams.get('definitionName');



  const loadGatewayBranches = (lf: LogicFlow, nodeId: string): GatewayBranchVM[] => {
    const graph = lf.getGraphData();
    const nodeMap = new Map<string, any>();
    graph.nodes?.forEach((n: any) => nodeMap.set(n.id, n));
    return (graph.edges ?? [])
      .filter((e: any) => e.sourceNodeId === nodeId)
      .map((e: any) => ({
        edgeId: e.id,
        targetNodeId: e.targetNodeId,
        targetLabel: nodeMap.get(e.targetNodeId)?.text?.value ?? e.targetNodeId,
        name: e.text?.value ?? '',
        expression: e.properties?.condition?.expression ?? '',
      }));
  };

  const handleSaveNode = async () => {
    const lf = lfRef.current;
    if (!lf || !selectedNodeId) return;

    const values = await form.validateFields();

    // 更新节点名称
    lf.updateNodeText(selectedNodeId, values.label);

    // 更新节点 properties
    lf.setProperties(selectedNodeId, {
      wfType: values.wfType,
      assignee: values.wfType === 'USER_TASK' ? values.assignee : undefined,
    });

    // 如果是网关：批量更新出边
    if (values.wfType === 'GATEWAY' && Array.isArray(values.branches)) {
      values.branches.forEach((b: GatewayBranchVM) => {
        lf.updateEdgeText(b.edgeId, b.name ?? '');
        lf.setProperties(b.edgeId, {
          condition: {
            expression: b.expression ?? '',
          },
        });
      });
    }

    message.success('节点配置已保存');
  };

  const initialData = useMemo(
    () => (
      initialFlowData
    ),
    [],
  );

  useEffect(() => {
    if (!containerRef.current || lfRef.current) {
      return;
    }


    LogicFlow.use(DndPanel);
    LogicFlow.use(SelectionSelect);
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
      plugins: [Menu],
    });

    lf.extension.dndPanel.setPatternItems([
      {
        label: '选区',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAOVJREFUOBGtVMENwzAIjKP++2026ETdpv10iy7WFbqFyyW6GBywLCv5gI+Dw2Bluj1znuSjhb99Gkn6QILDY2imo60p8nsnc9bEo3+QJ+AKHfMdZHnl78wyTnyHZD53Zzx73MRSgYvnqgCUHj6gwdck7Zsp1VOrz0Uz8NbKunzAW+Gu4fYW28bUYutYlzSa7B84Fh7d1kjLwhcSdYAYrdkMQVpsBr5XgDGuXwQfQr0y9zwLda+DUYXLaGKdd2ZTtvbolaO87pdo24hP7ov16N0zArH1ur3iwJpXxm+v7oAJNR4JEP8DoAuSFEkYH7cAAAAASUVORK5CYII=',
        callback: () => {
          lf.extension.selectionSelect.openSelectionSelect();
          lf.once('selection:selected', () => {
            lf.extension.selectionSelect.closeSelectionSelect();
          });
        }
      },
      {
        type: 'circle',
        text: '开始',
        label: '开始节点',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAAnBJREFUOBGdVL1rU1EcPfdGBddmaZLiEhdx1MHZQXApraCzQ7GKLgoRBxMfcRELuihWKcXFRcEWF8HBf0DdDCKYRZpnl7p0svLe9Zzbd29eQhTbC8nv+9zf130AT63jvooOGS8Vf9Nt5zxba7sXQwODfkWpkbjTQfCGUd9gIp3uuPP8bZ946g56dYQvnBg+b1HB8VIQmMFrazKcKSvFW2dQTxJnJdQ77urmXWOMBCmXM2Rke4S7UAW+/8ywwFoewmBps2tu7mbTdp8VMOkIRAkKfrVawalJTtIliclFbaOBqa0M2xImHeVIfd/nKAfVq/LGnPss5Kh00VEdSzfwnBXPUpmykNss4lUI9C1ga+8PNrBD5YeqRY2Zz8PhjooIbfJXjowvQJBqkmEkVnktWhwu2SM7SMx7Cj0N9IC0oQXRo8xwAGzQms+xrB/nNSUWVveI48ayrFGyC2+E2C+aWrZHXvOuz+CiV6iycWe1Rd1Q6+QUG07nb5SbPrL4426d+9E1axKjY3AoRrlEeSQo2Eu0T6BWAAr6COhTcWjRaYfKG5csnvytvUr/WY4rrPMB53Uo7jZRjXaG6/CFfNMaXEu75nG47X+oepU7PKJvvzGDY1YLSKHJrK7vFUwXKkaxwhCW3u+sDFMVrIju54RYYbFKpALZAo7sB6wcKyyrd+aBMryMT2gPyD6GsQoRFkGHr14TthZni9ck0z+Pnmee460mHXbRAypKNy3nuMdrWgVKj8YVV8E7PSzp1BZ9SJnJAsXdryw/h5ctboUVi4AFiCd+lQaYMw5z3LGTBKjLQOeUF35k89f58Vv/tGh+l+PE/wG0rgfIUbZK5AAAAABJRU5ErkJggg==',
      },
      {
        type: 'rect',
        label: '用户任务',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
        className: 'important-node'
      },
      {
        type: 'rect',
        label: '系统任务',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABMAAAATCAYAAAEFVwZaAAAABGdBTUEAALGPC/xhBQAAAqlJREFUOBF9VM9rE0EUfrMJNUKLihGbpLGtaCOIR8VjQMGDePCgCCIiCNqzCAp2MyYUCXhUtF5E0D+g1t48qAd7CCLqQUQKEWkStcEfVGlLdp/fm3aW2QQdyLzf33zz5m2IsAZ9XhDpyaaIZkTS4ASzK41TFao88GuJ3hsr2pAbipHxuSYyKRugagICGANkfFnNh3HeE2N0b3nN2cgnpcictw5veJIzxmDamSlxxQZicq/mflxhbaH8BLRbuRwNtZp0JAhoplVRUdzmCe/vO27wFuuA3S5qXruGdboy5/PRGFsbFGKo/haRtQHIrM83bVeTrOgNhZReWaYGnE4aUQgTJNvijJFF4jQ8BxJE5xfKatZWmZcTQ+BVgh7s8SgPlCkcec4mGTmieTP4xd7PcpIEg1TX6gdeLW8rTVMVLVvb7ctXoH0Cydl2QOPJBG21STE5OsnbweVYzAnD3A7PVILuY0yiiyDwSm2g441r6rMSgp6iK42yqroI2QoXeJVeA+YeZSa47gZdXaZWQKTrG93rukk/l2Al6Kzh5AZEl7dDQy+JjgFahQjRopSxPbrbvK7GRe9ePWBo1wcU7sYrFZtavXALwGw/7Dnc50urrHJuTPSoO2IMV3gUQGNg87IbSOIY9BpiT9HV7FCZ94nPXb3MSnwHn/FFFE1vG6DTby+r31KAkUktB3Qf6ikUPWxW1BkXSPQeMHHiW0+HAd2GelJsZz1OJegCxqzl+CLVHa/IibuHeJ1HAKzhuDR+ymNaRFM+4jU6UWKXorRmbyqkq/D76FffevwdCp+jN3UAN/C9JRVTDuOxC/oh+EdMnqIOrlYteKSfadVRGLJFJPSB/ti/6K8f0CNymg/iH2gO/f0DwE0yjAFO6l8JaR5j0VPwPwfaYHqOqrCI319WzwhwzNW/aQAAAABJRU5ErkJggg==',
        className: 'import_icon'
      },
      {
        type: 'diamond',
        label: '条件判断',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABUAAAAVCAYAAAHeEJUAAAAABGdBTUEAALGPC/xhBQAAAvVJREFUOBGNVEFrE0EU/mY3bQoiFlOkaUJrQUQoWMGePLX24EH0IIoHKQiCV0G8iE1covgLiqA/QTzVm1JPogc9tIJYFaQtlhQxqYjSpunu+L7JvmUTU3AgmTfvffPNN++9WSA1DO182f6xwILzD5btfAoQmwL5KJEwiQyVbSVZ0IgRyV6PTpIJ81E5ZvqfHQR0HUOBHW4L5Et2kQ6Zf7iAOhTFAA8s0pEP7AXO1uAA52SbqGk6h/6J45LaLhO64ByfcUzM39V7ZiAdS2yCePPEIQYvTUHqM/n7dgQNfBKWPjpF4ISk8q3J4nB11qw6X8l+FsF3EhlkEMfrjIer3wJTLwS2aCNcj4DbGxXTw00JmAuO+Ni6bBxVUCvS5d9aa04+so4pHW5jLTywuXAL7jJ+D06sl82Sgl2JuVBQn498zkc2bGKxULHjCnSMadBKYDYYHAtsby1EQ5lNGrQd4Y3v4Zo0XdGEmDno46yCM9Tk+RiJmUYHS/aXHPNTcjxcbTFna000PFJHIVZ5lFRqRpJWk9/+QtlOUYJj9HG5pVFEU7zqIYDVsw2s+AJaD8wTd2umgSCCyUxgGsS1Y6TBwXQQTFuZaHcd8gAGioE90hlsY+wMcs30RduYtxanjMGal8H5dMW67dmT1JFtYUEe8LiQLRsPZ6IIc7A4J5tqco3T0pnv/4u0kyzrYUq7gASuEyI8VXKvB9Odytv6jS/PNaZBln0nioJG/AVQRZvApOdhjj3Jt8QC8Im09SafwdBdvIpztpxWxpeKCC+EsFdS8DCyuCn2munFpL7ctHKp+Xc5cMybeIyMAN33SPL3ZR9QV1XVwLyzHm6Iv0/yeUuUb7PPlZC4D4HZkeu6dpF4v9j9MreGtMbxMMRLIcjJic9yHi7WQ3yVKzZVWUr5UrViJvn1FfUlwe/KYVfYyWRLSGNu16hR01U9IacajXPei0wx/5BqgInvJN+MMNtNme7ReU9SBbgntovn0kKHpFg7UogZvaZiOue/q1SBo9ktHzQAAAAASUVORK5CYII=',
      },
      {
        type: 'circle',
        text: '结束',
        label: '结束节点',
        icon: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAAH6ji2bAAAABGdBTUEAALGPC/xhBQAAA1BJREFUOBFtVE1IVUEYPXOf+tq40Y3vPcmFIdSjIorWoRG0ERWUgnb5FwVhYQSl72oUoZAboxKNFtWiwKRN0M+jpfSzqJAQclHo001tKkjl3emc8V69igP3znzfnO/M9zcDcKT67azmjYWTwl9Vn7Vumeqzj1DVb6cleQY4oAVnIOPb+mKAGxQmKI5CWNJ2aLPatxWa3aB9K7/fB+/Z0jUF6TmMlFLQqrkECWQzOZxYGjTlOl8eeKaIY5yHnFn486xBustDjWT6dG7pmjHOJd+33t0iitTPkK6tEvjxq4h2MozQ6WFSX/LkDUGfFwfhEZj1Auz/U4pyAi5Sznd7uKzznXeVHlI/Aywmk6j7fsUsEuCGADrWARXXwjxWQsUbIupDHJI7kF5dRktg0eN81IbiZXiTESic50iwS+t1oJgL83jAiBupLDCQqwziaWSoAFSeIR3P5Xv5az00wyIn35QRYTwdSYbz8pH8fxUUAtxnFvYmEmgI0wYXUXcCCSpeEVpXlsRhBnCEATxWylL9+EKCAYhe1NGstUa6356kS9NVvt3DU2fd+Wtbm/+lSbylJqsqkSm9CRhvoJVlvKPvF1RKY/FcPn5j4UfIMLn8D4UYb54BNsilTDXKnF4CfTobA0FpoW/LSp306wkXM+XaOJhZaFkcNM82ASNAWMrhrUbRfmyeI1FvRBTpN06WKxa9BK0o2E4Pd3zfBBEwPsv9sQBnmLVbLEIZ/Xe9LYwJu/Er17W6HYVBc7vmuk0xUQ+pqxdom5Fnp55SiytXLPYoMXNM4u4SNSCFWnrVIzKG3EGyMXo6n/BQOe+bX3FClY4PwydVhthOZ9NnS+ntiLh0fxtlUJHAuGaFoVmttpVMeum0p3WEXbcll94l1wM/gZ0Ccczop77VvN2I7TlsZCsuXf1WHvWEhjO8DPtyOVg2/mvK9QqboEth+7pD6NUQC1HN/TwvydGBARi9MZSzLE4b8Ru3XhX2PBxf8E1er2A6516o0w4sIA+lwURhAON82Kwe2iDAC1Watq4XHaGQ7skLcFOtI5lDxuM2gZe6WFIotPAhbaeYlU4to5cuarF1QrcZ/lwrLaCJl66JBocYZnrNlvm2+MBCTmUymPrYZVbjdlr/BxlMjmNmNI3SAAAAAElFTkSuQmCC',
      }
    ]);

    lf.render(initialData);
    lfRef.current = lf;
    setDataPreview(JSON.stringify(lf.getGraphData(), null, 2));
    
    lf.on('node:click', ({ data }) => {
      const nodeId = data.id as string;
      setSelectedNodeId(nodeId);

      const props = data.properties ?? {};
      const label = data.text?.value ?? '';

      const wfType: WfType =
        props.wfType ??
        (data.type === 'diamond'
          ? 'GATEWAY'
          : data.id === 'start'
            ? 'START'
            : data.id === 'end'
              ? 'END'
              : 'USER_TASK');

      const assignee: Assignee =
        props.assignee ?? { type: 'ROLE', roleIds: [] };

      const branches =
        wfType === 'GATEWAY'
          ? loadGatewayBranches(lf, nodeId)
          : [];

      setGatewayBranches(branches);

      form.setFieldsValue({
        label,
        wfType,
        assignee,
        branches,
      });
    });

    lf.on('blank:click', () => {
      setSelectedNodeId(null);
      setGatewayBranches([]);
      form.resetFields();
    });

    return () => {
      lfRef.current?.destroy();
      lfRef.current = null;
    };
  }, [initialData, form]);

  const handleApplyNode = async () => {
    const lf = lfRef.current;
    if (!lf || !selectedNodeId) {
      return;
    }

    try {
      const values = await form.validateFields();
      const parsedParams = values.params
        ? JSON.parse(values.params)
        : undefined;
      if (values.label) {
        lf.updateNodeText(selectedNodeId, values.label);
      }
      lf.setProperties(selectedNodeId, parsedParams ?? {});
      message.success('节点信息已更新');
      setDataPreview(JSON.stringify(lf.getGraphData(), null, 2));
    } catch (error) {
      if (error instanceof SyntaxError) {
        message.error('节点参数必须是有效的 JSON');
      }
    }
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
        <div className="editorLayout">
          <Card
            className="canvasCard"
            title={"流程画布" + (definitionName ? ` - ${definitionName}` : '')}
            styles={{
              body: {
                padding: 0
              }
            }}
          >
            <div className="canvasContainer" ref={containerRef}>
              <div className="canvasActions">
                <Text strong>操作</Text>
                <Space orientation="vertical" size={8}>
                  <Button onClick={handleReset}>重置示例</Button>
                  <Button type="primary" onClick={handleExport}>
                    导出流程数据
                  </Button>
                </Space>
              </div>
            </div>
          </Card>
          <Card title="节点配置" className="sidePanel">
            {!selectedNodeId ? (
              <Text type="secondary">请点击流程中的节点进行配置</Text>
            ) : (
              <Form layout="vertical" form={form}>
                {/* 节点名称 */}
                <Form.Item
                  label="节点名称"
                  name="label"
                  rules={[{ required: true, message: '请输入节点名称' }]}
                >
                  <Input />
                </Form.Item>

                {/* 节点类型 */}
                <Form.Item
                  label="节点类型"
                  name="wfType"
                  rules={[{ required: true }]}
                >
                  <Select
                    options={[
                      { label: '开始', value: 'START' },
                      { label: '结束', value: 'END' },
                      { label: '用户任务（审批）', value: 'USER_TASK' },
                      { label: '系统任务', value: 'SYSTEM_TASK' },
                      { label: '条件网关', value: 'GATEWAY' },
                    ]}
                  />
                </Form.Item>

                {/* ========== Assignee 面板 ========== */}
                <Form.Item shouldUpdate noStyle>
                  {() => {
                    const wfType = form.getFieldValue('wfType');
                    if (wfType !== 'USER_TASK') return null;

                    return (
                      <Card size="small" title="审批人配置">
                        <Form.Item
                          label="指派方式"
                          name={['assignee', 'type']}
                          rules={[{ required: true }]}
                        >
                          <Select
                            options={[
                              { label: '按角色', value: 'ROLE' },
                              { label: '按人员', value: 'USER' },
                              { label: '按部门', value: 'DEPT' },
                            ]}
                          />
                        </Form.Item>

                        <Form.Item shouldUpdate noStyle>
                          {() => {
                            const type = form.getFieldValue(['assignee', 'type']);
                            if (type === 'ROLE') {
                              return (
                                <Form.Item
                                  label="角色"
                                  name={['assignee', 'roleIds']}
                                  rules={[{ required: true }]}
                                >
                                  <Select mode="multiple" options={roleOptions} />
                                </Form.Item>
                              );
                            }
                            if (type === 'USER') {
                              return (
                                <Form.Item
                                  label="人员"
                                  name={['assignee', 'userIds']}
                                  rules={[{ required: true }]}
                                >
                                  <Select mode="multiple" options={userOptions} />
                                </Form.Item>
                              );
                            }
                            return (
                              <Form.Item
                                label="部门"
                                name={['assignee', 'deptIds']}
                                rules={[{ required: true }]}
                              >
                                <Select mode="multiple" options={deptOptions} />
                              </Form.Item>
                            );
                          }}
                        </Form.Item>
                      </Card>
                    );
                  }}
                </Form.Item>

                {/* ========== Gateway 分支编辑器 ========== */}
                <Form.Item shouldUpdate noStyle>
                  {() => {
                    const wfType = form.getFieldValue('wfType');
                    if (wfType !== 'GATEWAY') return null;

                    return (
                      <Card size="small" title="条件分支">
                        {gatewayBranches.length === 0 ? (
                          <Text type="secondary">
                            当前网关没有出边，请先从该节点拉出连线
                          </Text>
                        ) : (
                          <Form.List name="branches">
                            {(fields) => (
                              <Space direction="vertical" style={{ width: '100%' }}>
                                {fields.map((f) => (
                                  <Card key={f.key} size="small" type="inner">
                                    <Form.Item name={[f.name, 'edgeId']} hidden />
                                    <Form.Item label="目标节点" name={[f.name, 'targetLabel']}>
                                      <Input disabled />
                                    </Form.Item>
                                    <Form.Item
                                      label="分支名称"
                                      name={[f.name, 'name']}
                                      rules={[{ required: true }]}
                                    >
                                      <Input placeholder="例如：金额 > 5000" />
                                    </Form.Item>
                                    <Form.Item
                                      label="条件表达式"
                                      name={[f.name, 'expression']}
                                    >
                                      <Input placeholder="例如：amount > 5000" />
                                    </Form.Item>
                                  </Card>
                                ))}
                              </Space>
                            )}
                          </Form.List>
                        )}
                      </Card>
                    );
                  }}
                </Form.Item>

                <Button type="primary" onClick={handleSaveNode} block>
                  保存配置
                </Button>
              </Form>
            )}
          </Card>
          {/* <Card title="流程数据" className="sidePanel">
            <Paragraph type="secondary">
              选中节点后可编辑名称与参数，点击导出更新 JSON。
            </Paragraph>
            <Card size="small" className="nodeEditor" title="节点信息">
              {selectedNodeId ? (
                <Form layout="vertical" form={form} onFinish={handleApplyNode}>
                  <Form.Item
                    label="节点名称"
                    name="label"
                    rules={[{ required: true, message: '请输入节点名称' }]}
                  >
                    <Input placeholder="例如：部门经理审批" />
                  </Form.Item>
                  <Form.Item label="节点参数(JSON)" name="params">
                    <TextArea
                      rows={6}
                      placeholder={initialParams}
                      spellCheck={false}
                    />
                  </Form.Item>
                  <Button type="primary" onClick={handleApplyNode}>
                    保存节点信息
                  </Button>
                </Form>
              ) : (
                <Text type="secondary">请先点击画布中的节点。</Text>
              )}
            </Card>
            <TextArea
              className="dataPreview"
              value={dataPreview}
              autoSize={{ minRows: 16 }}
              readOnly
            />
          </Card> */}
        </div>
      </div>
    </PageContainer>
  );
};

export default FlowEditor;