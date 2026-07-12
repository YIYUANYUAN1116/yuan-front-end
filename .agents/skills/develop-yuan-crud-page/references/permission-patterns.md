# Permission Patterns

Yuan frontend permission behavior spans four places:

1. `config/routes.ts` static route `access` keys.
2. `src/access.ts` named access values and generic `canAccess(permission)`.
3. Backend `/system/sysMenu/menuRouters` data transformed in `src/app.tsx`.
4. Page actions guarded by `useAccess()` and `<Access>`.

When adding or changing a protected feature, verify every applicable layer. Use the exact backend permission string; never copy a nearby module's code without checking it.

Button visibility is a user-experience control, not the security boundary. The backend must still authorize every request.

```tsx
const access = useAccess();

<Access accessible={access.canAccess('module:resource:add')}>
  <Button type="primary">新增</Button>
</Access>
```

For routes using a named access key, ensure the key exists in `src/access.ts` and maps to the intended backend permission.
