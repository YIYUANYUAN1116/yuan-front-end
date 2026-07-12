---
name: develop-yuan-crud-page
description: Develop or modify Yuan Project frontend CRUD pages built with React, Umi Max, Ant Design ProTable and ProForm. Use when adding or changing list pages, search fields, columns, paging, sorting, drawers, modal forms, batch actions, dictionary-backed status/type fields, generated Yuan API integration, or button permissions in system, AI management, knowledge-base, code-generation, and similar administration modules.
---

# Develop Yuan CRUD Page

Follow the repository's established ProTable/ProForm pattern without turning generated API types into UI state models.

## Inspect before editing

1. Read the target route, page, sibling pages, generated Controller, and relevant `API.*` types.
2. Search for permission codes in routes, `src/access.ts`, dynamic-menu handling, and existing buttons.
3. Identify whether each status, type, or category field is a system dictionary. Locate its `DictEnum` value when it is.
4. Read [references/crud-page-patterns.md](references/crud-page-patterns.md) for page structure.
5. Read [references/permission-patterns.md](references/permission-patterns.md) when adding routes or actions.
6. Read [references/form-dto-mapping.md](references/form-dto-mapping.md) when the form shape differs from the generated BO.

## Implement the page

1. Keep the route entry in `config/routes.ts` and the page under `src/pages/<module>/<feature>/`.
2. Keep page-private forms and drawers in the page's `components/` directory.
3. Type columns with `ProColumns<API.XxxVo>[]` and use a stable domain identifier as `rowKey`.
4. Use `useTableRequest` for the standard `{ bo, pageQuery } -> { rows, total }` contract.
5. Use `useActionRequest` for mutations when its reload and message behavior fits. Pass a callback that reads `actionRef.current` at execution time when necessary.
6. Use `useDictDataValueEnum(DictEnum.Xxx)` for dictionary-backed status, type, or category fields. Use `useDictDataTagMap` only when custom Tag rendering is needed.
7. Wrap protected actions in `<Access>` and use the exact backend permission code.
8. Confirm destructive, publish, submit, and other high-impact actions.
9. Convert UI-only form values into an API BO explicitly before calling the generated service.

## Verify

1. Test initial load, search reset, paging, sorting, create, edit, delete, batch selection, permission-hidden actions, and reload after mutation as applicable.
2. Run relevant tests, `npm run tsc`, and a targeted Biome check.
3. If the repository has unrelated baseline failures, confirm the change adds no new failure and report the baseline separately.
4. Review the diff for generated-service edits, hard-coded dictionaries, copied permission codes, encoding changes, and unrelated formatting.
