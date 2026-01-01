export type WfType = 'START' | 'END' | 'USER_TASK' | 'SYSTEM_TASK' | 'GATEWAY';

export const WfTypeConst = {
    START: 'START',
    END: 'END',
    USER_TASK: 'USER_TASK',
    SYSTEM_TASK: 'SYSTEM_TASK',
    GATEWAY: 'GATEWAY'
} as const;

export type AssigneeType = 'ROLE' | 'USER' | 'DEPT';
export const AssigneeTypeConst = {
    ROLE: 'ROLE',
    USER: 'USER',
    DEPT: 'DEPT'
} as const;


export type Assignee = {
  type: AssigneeType;
  roleIds?: string[];
  userIds?: string[];
  deptIds?: string[];
};

export type GatewayBranchVM = {
  edgeId: string;
  targetNodeId: string;
  targetLabel: string;
  name?: string;
  expression?: string;
};

export const initialFlowData = {
  nodes: [
    {
      id: 'start',
      type: 'circle',
      x: 140,
      y: 120,
      text: '开始',
      properties: {
        status: 'start',
        wfType: WfTypeConst.START,
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
        wfType: WfTypeConst.USER_TASK,
      },
    },
    {
      id: 'end',
      type: 'circle',
      x: 580,
      y: 120,
      text: '结束',
      properties: {
        status: 'end',
        wfType: WfTypeConst.END,
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
      targetNodeId: 'end',
      text: '同意',
    }
  ],
}


