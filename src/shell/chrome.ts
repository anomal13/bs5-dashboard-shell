import { routes, trail, type Route } from '../routes';
import { href } from '../router';

const APP_TITLE = 'Dashboard';

export function renderNav(list: HTMLElement): void {
  list.innerHTML = routes
    .filter((r) => r.nav)
    .map((r) => `<li class="nav-item"><a class="nav-link" href="${href(r.path)}" data-path="${r.path}">${r.title}</a></li>`)
    .join('');
}

/** Синхронизирует sidebar, breadcrumbs и document.title с текущим маршрутом. */
export function updateChrome(route: Route, nav: HTMLElement, breadcrumbs: HTMLElement): void {
  nav.querySelectorAll<HTMLAnchorElement>('a[data-path]').forEach((link) => {
    const active = link.dataset.path === route.path;
    link.classList.toggle('active', active);
    if (active) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });

  const items = trail(route);
  breadcrumbs.innerHTML = items
    .map((r, i) =>
      i === items.length - 1
        ? `<li class="breadcrumb-item active" aria-current="page">${r.title}</li>`
        : `<li class="breadcrumb-item"><a href="${href(r.path)}">${r.title}</a></li>`,
    )
    .join('');

  document.title = `${route.title} — ${APP_TITLE}`;
}
