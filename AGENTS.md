# Yuan Frontend Agent Guide

## 项目技术栈

- 使用 React 19、TypeScript 5、Umi Max 4、Ant Design 6 和 Ant Design Pro Components。
- 构建、路由、initialState、access、request 和 locale 由 Umi Max 提供；项目不使用 Vite。
- Workflow 设计器使用 LogicFlow；AI Chat 使用原生 `fetch` 读取 SSE，并使用 XMarkdown 渲染 Markdown。
- 样式使用 Less、`antd-style` 和必要的局部 inline style。
- 代码质量工具为 TypeScript、Biome、Jest、Testing Library、Husky 和 commitlint。
- 常规开发脚本使用 npm；仓库同时存在 `package-lock.json` 与 `yarn.lock`，修改依赖前必须先确认锁文件策略。

## 目录职责

- `config/`：Umi、路由、代理、布局和 OpenAPI 配置。
- `src/pages/`：路由页面及页面私有组件。
- `src/components/`：跨页面通用组件。
- `src/services/yuan/`：OpenAPI 生成的 Yuan API client 和全局 `API` 类型。
- `src/hooks/`：通用请求、表格、动作和字典 hooks。
- `src/locales/`：国际化资源。
- `src/const/`：项目枚举和字典编码。
- `src/util/`：不持有业务状态的通用工具。
- `tests/`：Jest 全局测试配置。
- 页面专用组件放在对应页面的 `components/`；只有被多个业务模块复用时才提升到 `src/components/`。

## 通用编码规则

- 使用函数组件和 React Hooks，不新增 Class Component。
- 使用 TypeScript；复杂外部数据先以 `unknown` 接收并做类型收窄，不新增无理由的 `any`。
- 使用 `@/` 路径别名引用 `src` 下模块。
- 路由页面默认导出；可复用组件、hooks 和类型使用有意义的命名导出。
- 页面局部交互状态保留在页面或组件中。只有当前用户、权限、布局等跨应用状态使用 Umi initialState。
- 不为普通页面状态引入新的全局状态管理库。
- 新增业务文案时检查对应 locale 约定，不继续扩大菜单文案与 locale key 的混用。
- 修改含中文的旧文件前先确认实际文件编码，避免整文件编码变化。
- 避免对无关文件执行批量格式化。

## API 调用规则

- 常规后端接口使用 `src/services/yuan/` 中的生成式 service，不在页面重复手写已有 Controller 接口。
- 列表接口优先通过 `useTableRequest` 适配 ProTable；写操作优先复用 `useActionRequest`，并确保成功后的 reload 回调有效。
- 普通响应从 `data` 读取，分页响应从 `rows` 和 `total` 读取。
- token 由全局请求拦截器处理；除 SSE 等无法使用 Umi Request 的场景外，不手工拼接 Authorization。
- 不在业务代码中硬编码新的后端 host；使用 `/api`、代理或统一环境配置。
- 不重复显示已由全局请求层处理的错误，除非页面需要补充明确的业务上下文。
- 不直接修改 OpenAPI 生成的 Controller 和 `src/services/yuan/typings.d.ts`；需要更新接口时重新生成并审查 diff。
- API DTO 与页面 View Model/Form Model 不一致时创建显式映射，不向生成 DTO 强塞 UI 字段。

## 组件规范

- 页面入口位于 `src/pages/<module>/<feature>/index.tsx`。
- 页面私有 Drawer、Modal、Form、Columns 等放在当前页面的 `components/`。
- 通用组件使用 PascalCase 文件名和组件名；Props 和 callback 必须声明明确类型。
- ProTable 使用稳定且真实唯一的 `rowKey`。
- 删除、发布、提交、审批等不可逆或高影响操作使用确认交互。
- 按钮权限使用 `useAccess()` 和 `<Access>`，权限码必须与路由、动态菜单和后端权限定义一致。
- 表格、表单中的状态、类型、分类等系统字典字段统一使用 `useDictDataValueEnum(DictEnum.Xxx)` 获取 `valueEnum`，不得在页面重复硬编码枚举映射。
- 需要自定义 Tag 展示时复用 `useDictDataTagMap`；筛选项、表单选项和标准状态展示仍以 `useDictDataValueEnum` 为主。
- 公共组件修改前搜索所有调用方，并检查默认行为是否影响现有页面。
- 复杂页面应拆分展示组件、状态逻辑、数据适配和协议解析，避免继续扩大现有超大文件。

## 类型规范

- 后端 BO、DTO、VO 使用生成的 `API.*` 类型。
- UI 表单存在后端 DTO 之外的字段时定义独立 Form 类型，并在提交前转换为 API DTO。
- 对象和 Props 遵循所在模块的 `interface` 风格；union 和状态集合使用 `type`。
- API 数据转换函数明确输入和输出类型；对 SSE、JSON、`metaJson` 等运行时数据先校验再断言。
- 后端状态、类型等字典字段沿用生成类型，页面映射通过 `useDictDataValueEnum(DictEnum.Xxx)` 处理，不为展示用途重复定义本地枚举。
- 只有非后端字典、具有前端状态机语义的字段，才定义本地 union type 或 enum。
- 不随意改变生成类型字段的可选性，不新增全局 declaration 来掩盖局部类型错误。

## 测试要求

- 修改完成后至少运行 `npm run tsc` 和与改动文件相关的 Biome 检查。
- 修改 hooks、数据转换、SSE 解析、Workflow graph 序列化时补充 Jest 单元测试。
- 修改登录、权限、路由或请求拦截时覆盖未登录、无权限、超级权限和 401 场景。
- 修改表单时覆盖 UI Form 到 API DTO 的转换。
- 修改 Workflow 操作时覆盖后端 `ops` 对按钮展示的控制。
- 不通过更新 snapshot 掩盖非预期 UI 变化。
- 若仓库已有与本次修改无关的失败项，记录基线，并确认本次修改没有新增失败。

## 修改前检查要求

- 先查看 `git status`，不得覆盖用户已有改动。
- 修改路由前同时检查 `config/routes.ts`、`src/access.ts`、后端动态菜单和 locale。
- 修改 API 前确认文件是否为 OpenAPI 生成文件。
- 修改公共 hook 或组件前搜索所有调用方。
- 修改 Workflow graph 字段前检查设计器、生成 API 类型和后端保存 DTO。
- 修改 AI Chat 前检查会话持久化、SSE event、消息分页和 RAG hit 数据结构。
- 修改 OA 页面前检查业务单据状态与 Workflow 状态的边界。
- 修改依赖前确认唯一包管理器和锁文件策略。
- 提交前审查 diff，排除生成文件、格式化和编码造成的无关变化。

## 禁止事项

- 禁止手工修改 OpenAPI 生成文件来规避接口或类型问题。
- 禁止在页面硬编码新的后端地址、token 或租户/用户标识。
- 禁止仅隐藏按钮来代替后端权限控制。
- 禁止绕过后端返回的 Workflow 可操作集合自行开放审批动作。
- 禁止把页面临时状态无理由放入全局 initialState。
- 禁止为 UI 临时字段修改全局 API DTO。
- 禁止为已有系统字典重复硬编码状态、类型、标签颜色或下拉选项；使用 `DictEnum`、`useDictDataValueEnum`，必要时配合 `useDictDataTagMap`。
- 禁止对超大文件执行无关全量格式化。
- 禁止删除或覆盖用户未提交的改动。
- 禁止在未验证图数据兼容性的情况下修改 Workflow JSON schema。
- 禁止把单个页面的详细开发步骤或组件使用手册写入本文件。
