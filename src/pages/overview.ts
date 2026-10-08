import type { Page } from './types';

export const overviewPage: Page = (container) => {
  container.innerHTML = `
    <h1 class="h3 mb-3" tabindex="-1">Обзор</h1>
    <div class="row g-3">
      ${['Задачи', 'Контексты', 'Уведомления']
        .map(
          (t, i) => `
        <div class="col-sm-6 col-xl-4">
          <div class="card h-100"><div class="card-body">
            <div class="text-body-secondary small">${t}</div>
            <div class="fs-3 fw-semibold">${[12, 3, 5][i]}</div>
          </div></div>
        </div>`,
        )
        .join('')}
    </div>
    <p class="text-body-secondary small mt-3 mb-0">
      Ширина окна: <span data-width></span>px (слушатель resize снимается при уходе со страницы)
    </p>`;

  const controller = new AbortController();
  const out = container.querySelector<HTMLElement>('[data-width]')!;
  const update = () => (out.textContent = String(window.innerWidth));
  window.addEventListener('resize', update, { signal: controller.signal });
  update();

  return () => controller.abort();
};
