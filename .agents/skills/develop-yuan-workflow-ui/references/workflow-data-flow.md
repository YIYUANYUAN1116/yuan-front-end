# Workflow Data Flow

The implemented frontend flow is:

```text
workflow definition
→ draft definition version
→ LogicFlow graph and node configuration
→ save version design
→ publish version
→ submit an OA/business record identified by bizNo and bizType
→ backend creates and advances instances and tasks
→ workbench lists applications, todo tasks, and completed approvals
→ unified workflow detail loads business detail, instance, layers, timeline, current task, and ops
→ task command executes
→ detail reloads from backend state
```

Frontend responsibilities are graph editing, typed DTO mapping, business-detail composition, command submission, and rendering server results.

Backend responsibilities are version lifecycle enforcement, persistence, condition evaluation, assignee resolution, task and instance transitions, authorization, candidate calculation, available `ops`, and timeline generation.

Do not duplicate backend workflow-engine decisions in React state.
