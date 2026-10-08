# Bootstrap 5 dashboard shell — Offcanvas navigation

Небольшой пример на Vite + TypeScript + Bootstrap 5: одна разметка навигации
(sidebar на `lg+`, Offcanvas ниже), route registry, breadcrumbs, корректный
фокус и очистка обработчиков.

```bash
npm install
npm run dev      # или npm run build && npm run preview
```

## Сценарий: переход из открытого мобильного Offcanvas

| Что | Где |
| --- | --- |
| Закрытие панели при смене маршрута (ссылка в меню, «Назад» в браузере) | `src/shell/shell.ts` → `await mobileNav.close()` |
| Закрытие при клике на ссылку текущей страницы | `src/shell/mobile-nav.ts`, обработчик `click` |
| Ожидание конца анимации, гонка с `showing`/`hiding` | `src/shell/mobile-nav.ts` → `close()` |
| Итоговый фокус на `h1` новой страницы | `src/shell/shell.ts`, после `await mobileNav.close()` |
| Очистка слушателей страницы | `Page` возвращает cleanup (`src/pages/types.ts`), вызывается перед рендером следующей |
| Демонтаж shell (`AbortController` + `Offcanvas.dispose()`) | `mountShell()` / `MobileNav.destroy()`, используется в HMR (`src/main.ts`) |
