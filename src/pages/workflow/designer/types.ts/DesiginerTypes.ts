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



export type EdgeCondition = {
  field: string
  operator: string
  value: any
}

export type GatewayBranchVM = {
  edgeId: string
  targetNodeId: string
  targetLabel: string
  name: string
  condition: EdgeCondition
}


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

type AssigneeKind = 'FIXED' | 'RULE';

type FixedAssignee = {
  kind: 'FIXED';
  by: 'ROLE' | 'USER' | 'DEPT';
  ids: string[];      // roleId/userId/deptId
};

type RuleAssignee = {
  kind: 'RULE';
  ruleType:
    | 'STARTER'              // 发起人
    | 'STARTER_MANAGER'      // 发起人主管
    | 'FORM_FIELD'           // 表单字段取值：比如 form.applyUserId / form.deptId / form.roleCode
    | 'BIZ_RESOLVER'         // 业务方自定义解析器：例如 “报销=财务审核”
    | 'EXPR';                // 表达式解析（可选）
  // 下面根据 ruleType 取不同字段
  fieldPath?: string;        // FORM_FIELD: "form.xxx"
  resolverKey?: string;      // BIZ_RESOLVER: "expense_finance_approver"
  expression?: string;       // EXPR: "amount > 5000 ? 'role:finance_mgr' : 'role:finance'"
  multi?: boolean;           // 是否多审批人
};

// type Assignee = FixedAssignee | RuleAssignee;

export type AssigneeUser = {
  userId: string;
  nickName: string;
  deptName?: string;
  postName?: string;
};

export type Assignee = {
  kind?: 'FIXED' | 'RULE';
  userIds?: string[];
  users?: AssigneeUser[]; // ✅ 这里存人名，后续打开流程能直接展示
  // ...你原来 assignee 里其它字段保持不变
};