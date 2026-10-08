import { startRouter } from '../router';
import { renderNav, updateChrome } from './chrome';
import { mountMobileNav } from './mobile-nav';

function byId<T extends HTMLElement = HTMLElement>(id: string): T {
  const el = document.getElementById(id);
  if (!el) throw new Error(`#${id} not found`);
  return el as T;
}

/** Монтирует shell и возвращает функцию полного демонтажа. */
export function mountShell(): () => Promise<void> {
  const controller = new AbortController();
  const sidebar = byId('sidebar');
  const navList = byId('sidebar-nav');
  const breadcrumbs = byId('breadcrumbs');
  const view = byId('view');

  renderNav(navList);
  const mobileNav = mountMobileNav(sidebar);

  let cleanupPage: (() => void) | null = null;
  let isInitial = true;
  let navigationId = 0;

  startRouter(async (route) => {
    const id = ++navigationId;

    // Слушатели предыдущей страницы снимаются до рендера следующей
    cleanupPage?.();
    cleanupPage = route.page(view);
    updateChrome(route, navList, breadcrumbs);

    // При первой загрузке фокус не перехватываем
    if (isInitial) {
      isInitial = false;
      return;
    }

    // Новая страница уже под панелью; фокус переносим только после окончания анимации.
    // Bootstrap на hidden возвращает фокус на бургер — наш код выполняется после него и перекрывает.
    // Срабатывает и для ссылок в меню, и для «Назад» в браузере при открытой панели.
    await mobileNav.close();
    if (id !== navigationId) return; // пока панель закрывалась, начался другой переход

    window.scrollTo({ top: 0 });
    view.querySelector<HTMLElement>('h1')?.focus({ preventScroll: true });
  }, controller.signal);

  return async () => {
    controller.abort();
    cleanupPage?.();
    cleanupPage = null;
    await mobileNav.destroy();
  };
}
