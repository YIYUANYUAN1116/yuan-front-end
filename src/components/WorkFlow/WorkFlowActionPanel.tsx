import { ActionType } from '@ant-design/pro-components';
import { Button, Modal, Space } from 'antd'
import TextArea from 'antd/es/input/TextArea';
import React, { useMemo, useState } from 'react'

interface WorkFlowActionPanelProps {
    bizNo?: string
    reload?: ActionType['reload'];
    task?: API.WfTaskVo;
}
export type WfActionKey =
    | 'APPROVE'
    | 'REJECT'
    | 'ROLLBACK_PREV'
    | 'ROLLBACK_TO'
    | 'TRANSFER'
    | 'WITHDRAW'
    | 'ADD_SIGN';
const ALL_ACTIONS: WfActionKey[] = [
    'APPROVE',
    'REJECT',
    'ROLLBACK_PREV',
    'ROLLBACK_TO',
    'TRANSFER',
    'WITHDRAW',
    'ADD_SIGN',
];




const WorkFlowActionPanel = (props: WorkFlowActionPanelProps) => {
    const { bizNo } = props;
    const [comment, setComment] = useState('');

    const allowedSet = useMemo(() => {
        return new Set(ALL_ACTIONS); // 先全部展示
    }, []);

    const confirm = (actionText: string, onOk: () => void) => {
        Modal.confirm({
            title: `确认${actionText}？`,
            content: comment ? `审批意见：${comment.slice(0, 30)}` : '未填写审批意见',
            okText: '确认',
            cancelText: '取消',
            onOk,
        });
    };

    return (
        <div
            style={{
                display: 'flex',
                gap: 12,
                alignItems: 'flex-end',   // ✅ 底对齐，count 不会顶歪
                width: '100%',
            }}
        >
            {/* 左侧：审批意见 */}
            <TextArea
                placeholder="审批意见（可选）"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={300}
                showCount
                rows={1}
                style={{
                    flex: 1,               // ✅ 吃掉剩余空间
                    minWidth: 360,         // 防止过窄
                    marginBottom:20,
                    marginTop:20
                }}
            />

            {/* 右侧：操作按钮 */}
            <Space wrap size={8}>
                {allowedSet.has('APPROVE') && (
                    <Button
                        type="primary"
                        onClick={() =>
                            confirm('同意', () => {
                                console.log('approve', { bizNo, comment });
                            })
                        }
                    >
                        同意
                    </Button>
                )}

                {allowedSet.has('REJECT') && (
                    <Button
                        danger
                        onClick={() =>
                            confirm('拒绝', () => {
                                console.log('reject', { bizNo, comment });
                            })
                        }
                    >
                        拒绝
                    </Button>
                )}

                {allowedSet.has('ROLLBACK_TO') && (
                    <Button
                        onClick={() =>
                            confirm('退回至指定节点', () => {
                                console.log('rollback_to', { bizNo, comment });
                            })
                        }
                    >
                        退回至指定节点
                    </Button>
                )}

                {allowedSet.has('TRANSFER') && (
                    <Button
                        onClick={() =>
                            confirm('转交', () => {
                                console.log('transfer', { bizNo, comment });
                            })
                        }
                    >
                        转交
                    </Button>
                )}

                {allowedSet.has('WITHDRAW') && (
                    <Button
                        onClick={() =>
                            confirm('撤销', () => {
                                console.log('withdraw', { bizNo, comment });
                            })
                        }
                    >
                        撤销
                    </Button>
                )}

                {allowedSet.has('ADD_SIGN') && (
                    <Button
                        onClick={() =>
                            confirm('加签', () => {
                                console.log('add_sign', { bizNo, comment });
                            })
                        }
                    >
                        加签
                    </Button>
                )}
            </Space>
        </div>
    );
};

export default WorkFlowActionPanel;
