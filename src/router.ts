import { findRoute, routes, type Route } from './routes';

/**
 * Hash-роутер: демо открывается как статика без настройки сервера.
 * В проекте с History API меняются только currentPath() и navigate().
 */
export type RouteListener = (route: Route) => void;

const DEFAULT_PATH = routes[0].path;

export function currentPath(): string {
  return location.hash.slice(1) || DEFAULT_PATH;
}

export function href(path: string): string {
  return `#${path}`;
}

export function navigate(path: string): void {
  if (path !== currentPath()) location.hash = path;
}

export function startRouter(onChange: RouteListener, signal: AbortSignal): void {
  const resolve = () => onChange(findRoute(currentPath()) ?? findRoute(DEFAULT_PATH)!);
  window.addEventListener('hashchange', resolve, { signal });
  resolve();
}
