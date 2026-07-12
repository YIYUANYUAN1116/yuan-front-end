# Form and DTO Mapping

Generated BO types model backend payloads; ProForm values may also contain ranges, upload lists, display-only selections, or temporary flags. Do not add those fields to generated declarations.

Define a page-local form model when shapes differ:

```ts
type ExampleFormValues = Omit<API.ExampleBo, 'startTime' | 'endTime'> & {
  timeRange?: [Dayjs, Dayjs];
};
```

Convert explicitly before the request:

```ts
function toExampleBo(values: ExampleFormValues): API.ExampleBo {
  const { timeRange, ...rest } = values;
  return {
    ...rest,
    startTime: timeRange?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
    endTime: timeRange?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
  };
}
```

Use the reverse mapper when loading edit data. Keep conversion functions pure where practical so they can be unit tested.

Do not use a type assertion merely to silence a mismatch. Confirm required fields, date formats, numeric conversions, identifier types, and omitted UI-only fields.
