# LogicFlow Schema Boundaries

The designer in `src/pages/workflow/designer/` loads and renders saved graph data with LogicFlow, maintains selected-node configuration, then serializes graph data and version metadata for generated workflow services.

Before changing a field:

1. Find its generated API type.
2. Find every read and write in the main designer and its components.
3. Check demo code only as historical context; do not treat demos as the production contract.
4. Confirm whether existing saved versions may omit the field.
5. Preserve backward-compatible defaults when loading old graph JSON.
6. Verify a save-and-reload round trip.

Treat node ids and edge endpoints as stable persisted identifiers. Do not regenerate them during an unrelated edit.

Keep visual-only state outside persisted graph data unless the existing contract stores it. Map assignee rules, approval rules, and gateway branches explicitly rather than spreading unchecked objects into the DTO.

Published and historical versions are read-only. Editing must target a draft version, including drafts created from a historical source version.
