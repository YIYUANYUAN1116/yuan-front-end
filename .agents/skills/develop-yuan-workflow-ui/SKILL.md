---
name: develop-yuan-workflow-ui
description: Develop or modify Yuan Project workflow frontend features. Use when working on workflow definitions, definition versions, LogicFlow designer nodes or edges, assignee and rule configuration, graph JSON persistence, publishing or archiving, workflow instances, workbench applications or tasks, approval detail composition, timeline and progress rendering, or approve, reject, rollback, transfer, withdraw, and add-sign operations.
---

# Develop Yuan Workflow UI

Preserve the boundary between business forms, workflow definitions, graph persistence, runtime instances, and backend-authorized task operations.

## Classify the change

- For definition or version management, read [references/version-lifecycle.md](references/version-lifecycle.md).
- For LogicFlow nodes, edges, gateway branches, or saved design JSON, read [references/logicflow-schema.md](references/logicflow-schema.md).
- For approval buttons, timeline, progress, tasks, or unified detail, read [references/task-operations.md](references/task-operations.md).
- For cross-layer changes, first read [references/workflow-data-flow.md](references/workflow-data-flow.md).

## Inspect before editing

1. Trace the route, page, generated Controller method, `API.*` request and response types, and backend-derived status fields.
2. Inspect both the workflow shell and the business detail component identified by `bizType` and `bizNo`.
3. Determine whether the graph version is a writable draft or a read-only published/history version.
4. Treat backend `ops` as authoritative for available approval actions.
5. Search all readers and writers before changing a graph JSON field.

## Implement safely

1. Keep definition metadata separate from definition-version design data.
2. Preserve unknown compatible graph fields when mapping or saving unless the backend contract explicitly removes them.
3. Build UI-only node configuration as typed view models, then map it explicitly to the generated DTO.
4. Do not implement workflow-engine decisions in the browser. Submit commands and render the instance, candidates, timeline, layers, and `ops` returned by the backend.
5. Keep business detail rendering selected by `bizType`; do not copy workflow controls into each OA page.
6. Reload approval detail after a successful task mutation so current task, `ops`, progress, and timeline stay consistent.
7. Confirm publish, archive, delete, reject, rollback, transfer, and withdraw actions as appropriate.

## Verify

1. Cover draft edit and save, published read-only behavior, graph reload compatibility, and version transitions affected by the change.
2. Cover task states with and without each backend `ops` flag.
3. Cover the relevant business detail, timeline ordering, progress rendering, candidates, comments, and post-action reload.
4. Add focused Jest tests for graph mappers and nontrivial timeline or operation logic.
5. Run relevant tests, `npm run tsc`, and a targeted Biome check. Separate existing baseline failures from regressions.
6. Review the diff for generated API edits, graph schema drift, hard-coded permissions, and unrelated formatting.
