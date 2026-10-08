import type { Page } from './pages/types';
import { overviewPage } from './pages/overview';
import { profilePage } from './pages/profile';
import { settingsPage } from './pages/settings';

export interface Route {
  path: string;
  title: string;
  /** Путь родителя для breadcrumbs; undefined — корень */
  parent?: string;
  /** Показывать в sidebar */
  nav: boolean;
  page: Page;
}

export const routes: Route[] = [
  { path: '/dashboard', title: 'Обзор', nav: true, page: overviewPage },
  { path: '/dashboard/profile', title: 'Профиль', parent: '/dashboard', nav: true, page: profilePage },
  { path: '/dashboard/settings', title: 'Настройки', parent: '/dashboard', nav: true, page: settingsPage },
];

export function findRoute(path: string): Route | undefined {
  return routes.find((r) => r.path === path);
}

export function trail(route: Route): Route[] {
  const chain: Route[] = [];
  let current: Route | undefined = route;
  while (current) {
    chain.unshift(current);
    current = current.parent ? findRoute(current.parent) : undefined;
  }
  return chain;
}
