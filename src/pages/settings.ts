import type { Page } from './types';

export const settingsPage: Page = (container) => {
  container.innerHTML = `
    <h1 class="h3 mb-3" tabindex="-1">Настройки</h1>
    <div class="card card-body" style="max-width: 32rem">
      <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" role="switch" id="notify" checked />
        <label class="form-check-label" for="notify">Уведомления по email</label>
      </div>
    </div>`;

  return () => {};
};
