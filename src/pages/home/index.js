import '@/shared/dom/keyboard';

import { XylophoneKey } from '@/features/xylopad';
import { XYLOPHONE_KEYS } from '@/features/xylopad/constants';
import { ThemeButton } from '@/features/theme-switcher';
import { initTheme as initThemeStore } from '@/features/theme-switcher/controller';
import { createElement } from '@/shared/dom/create-element';
import { mount, render } from '@/shared/dom/render';
import { events } from '@/shared/event/event-broker';
import { initXylophone as initXylophoneStore } from '@/features/xylopad/controller';

export function App() {
  return createElement('div', {
    className: 'flex flex-col flex-1',
    id: 'app',
  });
}

export function Header() {
  return createElement('div', { className: 'header' }, 'HEADER');
}

export function Footer() {
  return createElement('div', { className: 'footer' }, 'FOOTER');
}

export function Title() {
  return createElement('h1', { className: 'ty-h1' }, 'XXXX');
}

export function Xylophone() {
  const keys = Array.from(XYLOPHONE_KEYS);

  return createElement(
    'div',
    { className: 'flex gap-2 flex-col items-center h-full' },
    ...keys.map((note) => XylophoneKey({ emit: events.emit, note, key: note }))
  );
}

const root = document.querySelector('#root');
initThemeStore({ root });
initXylophoneStore();

const app = render(App, root);

mount(Header, app);
mount(Title, app);
mount(Xylophone, app);
mount(Footer, app);
mount(ThemeButton, app);
