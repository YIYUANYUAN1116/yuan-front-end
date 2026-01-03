import React from 'react';
import { Form, Input, InputNumber, Select, Switch } from 'antd';

type Props = {
  form: any; // antd FormInstance
};

export const RuleConfigFields: React.FC<Props> = ({ form }) => {
  return (
    <Form.Item shouldUpdate noStyle>
      {() => {
        const ruleType = form.getFieldValue(['assignee', 'ruleType']);

        // 通用兜底：找不到人时怎么办（可根据你业务裁剪）
        const FallbackFields = (
          <>
            <Form.Item
              label="兜底策略"
              name={['assignee', 'fallback', 'strategy']}
              tooltip="当规则解析不到审批人时的处理方式"
              initialValue="ERROR"
              rules={[{ required: true }]}
            >
              <Select
                options={[
                  { label: '报错阻断', value: 'ERROR' },
                  { label: '自动通过', value: 'AUTO_PASS' },
                  { label: '转交管理员', value: 'TO_ADMIN' },
                  { label: '转交指定人/角色', value: 'TO_FIXED' },
                ]}
              />
            </Form.Item>

            <Form.Item shouldUpdate noStyle>
              {() => {
                const strategy = form.getFieldValue(['assignee', 'fallback', 'strategy']);
                if (strategy !== 'TO_FIXED') return null;

                return (
                  <>
                    <Form.Item
                      label="兜底对象类型"
                      name={['assignee', 'fallback', 'by']}
                      rules={[{ required: true }]}
                      initialValue="USER"
                    >
                      <Select
                        options={[
                          { label: '人员', value: 'USER' },
                          { label: '角色', value: 'ROLE' },
                          { label: '部门', value: 'DEPT' },
                        ]}
                      />
                    </Form.Item>

                    <Form.Item
                      label="兜底对象"
                      name={['assignee', 'fallback', 'ids']}
                      rules={[{ required: true }]}
                      tooltip="这里也可以复用 RemoteSelect（示例里先占位）"
                    >
                      <Input placeholder="填 ids（或换成 RemoteSelect）" />
                    </Form.Item>
                  </>
                );
              }}
            </Form.Item>
          </>
        );

        if (!ruleType) return null;

        if (ruleType === 'STARTER') {
          return (
            <>
              <Form.Item
                label="包含发起人本人"
                name={['assignee', 'rule', 'includeStarter']}
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>

              {FallbackFields}
            </>
          );
        }

        if (ruleType === 'STARTER_MANAGER') {
          return (
            <>
              <Form.Item
                label="主管层级"
                name={['assignee', 'rule', 'level']}
                tooltip="1=直属主管，2=上上级..."
                initialValue={1}
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={10} style={{ width: '100%' }} />
              </Form.Item>

              <Form.Item
                label="允许同部门负责人兜底"
                name={['assignee', 'rule', 'fallbackToDeptLeader']}
                valuePropName="checked"
                initialValue={false}
              >
                <Switch />
              </Form.Item>

              {FallbackFields}
            </>
          );
        }

        if (ruleType === 'FORM_FIELD') {
          return (
            <>
              <Form.Item
                label="表单字段 Key"
                name={['assignee', 'rule', 'fieldKey']}
                tooltip="例如：applyUserId / deptId / approverIds"
                rules={[{ required: true, message: '请输入字段 Key' }]}
              >
                <Input placeholder="请输入表单字段 key（与后端变量一致）" />
              </Form.Item>

              <Form.Item
                label="字段值类型"
                name={['assignee', 'rule', 'fieldValueType']}
                initialValue="USER_IDS"
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { label: '用户ID列表（List）', value: 'USER_IDS' },
                    { label: '单个用户ID', value: 'USER_ID' },
                    { label: '角色ID列表', value: 'ROLE_IDS' },
                    { label: '部门ID列表', value: 'DEPT_IDS' },
                  ]}
                />
              </Form.Item>

              <Form.Item
                label="去重"
                name={['assignee', 'rule', 'distinct']}
                valuePropName="checked"
                initialValue={true}
              >
                <Switch />
              </Form.Item>

              {FallbackFields}
            </>
          );
        }

        if (ruleType === 'BIZ_RESOLVER') {
          return (
            <>
              <Form.Item
                label="解析器 Key"
                name={['assignee', 'rule', 'resolverKey']}
                tooltip="后端实现 AssigneeBizResolver 的唯一 key"
                rules={[{ required: true }]}
              >
                <Input placeholder="例如：PROJECT_OWNER / COST_CENTER_APPROVER" />
              </Form.Item>

              <Form.Item
                label="解析器参数(JSON)"
                name={['assignee', 'rule', 'paramsJson']}
                tooltip="透传给后端解析器的参数，可为空"
              >
                <Input.TextArea rows={4} placeholder='例如：{"scope":"xx","needManager":true}' />
              </Form.Item>

              {FallbackFields}
            </>
          );
        }

        if (ruleType === 'EXPR') {
          return (
            <>
              <Form.Item
                label="表达式"
                name={['assignee', 'rule', 'expr']}
                tooltip="支持 SpEL/自定义表达式，例如：${starter.manager(1)} 或 resolve('PROJECT_OWNER', projectId)"
                rules={[{ required: true }]}
              >
                <Input.TextArea rows={3} placeholder="输入表达式..." />
              </Form.Item>

              <Form.Item
                label="表达式变量提示"
                name={['assignee', 'rule', 'exprHint']}
              >
                <Input placeholder="可选：提示给配置人员看的说明" />
              </Form.Item>

              {FallbackFields}
            </>
          );
        }

        return null;
      }}
    </Form.Item>
  );
};
