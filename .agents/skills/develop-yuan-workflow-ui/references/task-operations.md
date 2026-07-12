# Task Operations and Unified Detail

The unified detail page uses `bizNo` and `bizType` to combine a business detail component with workflow runtime data. Current shared components include the action panel, history timeline, and flow progress bar.

The backend-provided `ops` object controls which task actions are available. Never derive permission to approve, reject, rollback, transfer, withdraw, or add-sign solely from a frontend status.

For each action:

- use the current task or instance identifier required by the generated command type;
- validate required comments, targets, or candidates;
- confirm destructive or state-reversing actions;
- call the generated task service;
- reload the complete approval detail after success.

Rollback targets and transfer candidates come from backend endpoints. Do not reuse stale options after the current task changes.

Timeline and progress are server-result visualizations. Preserve event ordering and handle system operators, failures, gateway transitions, and missing optional fields. Keep business-specific fields in the business detail component selected by `bizType`, not in the shared workflow action panel.
