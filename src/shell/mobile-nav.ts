import Offcanvas from 'bootstrap/js/dist/offcanvas';

export interface MobileNav {
  /** Закрывает панель; промис резолвится после hidden.bs.offcanvas (или сразу, если она закрыта). */
  close(): Promise<void>;
  /** Дожидается закрытия, снимает обработчики и уничтожает инстанс Offcanvas. */
  destroy(): Promise<void>;
}

/**
 * Обёртка над Offcanvas для навигации shell.
 * На lg+ элемент — обычный sidebar (.offcanvas-lg), и close() ничего не делает.
 */
export function mountMobileNav(el: HTMLElement): MobileNav {
  const controller = new AbortController();
  const { signal } = controller;
  const offcanvas = Offcanvas.getOrCreateInstance(el);

  const waitFor = (type: string) =>
    new Promise<void>((resolve) => el.addEventListener(type, () => resolve(), { once: true, signal }));

  async function close(): Promise<void> {
    // hide() во время анимации открытия даёт гонку классов show/hiding — сначала дожидаемся shown
    if (el.classList.contains('showing')) await waitFor('shown.bs.offcanvas');
    if (el.classList.contains('hiding')) return waitFor('hidden.bs.offcanvas');
    if (!el.classList.contains('show')) return;

    // Подписываемся до hide(): при отключённых анимациях hidden приходит синхронно
    const hidden = waitFor('hidden.bs.offcanvas');
    offcanvas.hide();
    return hidden;
  }

  // Клик по ссылке текущей страницы не меняет маршрут — панель закрываем вручную
  el.addEventListener(
    'click',
    (event) => {
      const link = (event.target as Element).closest('a[aria-current="page"]');
      if (!link) return;
      event.preventDefault();
      void close();
    },
    { signal },
  );

  return {
    close,
    async destroy() {
      await close();
      controller.abort();
      offcanvas.dispose();
    },
  };
}
