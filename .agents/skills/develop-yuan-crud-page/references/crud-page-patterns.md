# CRUD Page Patterns

The recurring Yuan administration-page structure is:

```text
PageContainer
└─ ProTable<API.XxxVo>
   ├─ ProColumns<API.XxxVo>[]
   ├─ actionRef
   ├─ useTableRequest(generatedListService)
   ├─ Access-protected row and toolbar actions
   └─ page-private DrawerForm or ModalForm
```

Use `useTableRequest` only when the service accepts `{ bo, pageQuery }` and returns `rows` and `total`. It maps ProTable's `current`, `pageSize`, and sorter into backend paging fields.

Use generated `API.XxxVo` for table rows and generated services from `src/services/yuan/`. Do not edit generated files to accommodate a page.

For a backend system dictionary, call `useDictDataValueEnum(DictEnum.Xxx)` and assign it to the column or form field's `valueEnum`. Use `useDictDataTagMap` when the cell needs the configured Tag renderer. Do not duplicate labels, values, or colors in the page.

Use confirmation for destructive and high-impact mutations. After success, reload the table and clear affected selection. Avoid capturing `actionRef.current?.reload` too early; `() => actionRef.current?.reload()` reads the current ref when invoked.
