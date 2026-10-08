import type { Page } from './types';

export const profilePage: Page = (container) => {
  container.innerHTML = `
    <h1 class="h3 mb-3" tabindex="-1">Профиль</h1>
    <form class="card card-body" style="max-width: 32rem" novalidate>
      <div class="mb-3">
        <label class="form-label" for="name">Имя</label>
        <input class="form-control" id="name" autocomplete="name" value="Дмитрий" />
      </div>
      <div class="mb-3">
        <label class="form-label" for="email">Email</label>
        <input class="form-control" id="email" type="email" autocomplete="email" />
      </div>
      <button class="btn btn-primary align-self-start" type="submit">Сохранить</button>
    </form>`;

  const controller = new AbortController();
  container.querySelector('form')!.addEventListener('submit', (e) => e.preventDefault(), {
    signal: controller.signal,
  });

  return () => controller.abort();
};
