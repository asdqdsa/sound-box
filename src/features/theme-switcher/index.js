import { createElement } from '@/shared/dom/create-element';
import { events } from '@/shared/event/event-broker';

import { loadThemeState } from './state';

export function ThemeButton() {
  let { activeTheme } = loadThemeState();

  events.on('theme:changed', ({ detail }) => {
    el.textContent = `${detail}`;
  });

  const el = createElement(
    'button',
    {
      className: 'btn',
      onClick: () => events.emit('theme:next'),
    },
    `${activeTheme}`
  );

  return el;
}
