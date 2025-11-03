import '@/shared/dom/keyboard';

import { ThemeButton } from '@/features/theme-switcher';
import { initTheme as initThemeStore } from '@/features/theme-switcher/controller';
import { createElement } from '@/shared/dom/create-element';
import { mount, render } from '@/shared/dom/render';
import { events } from '@/shared/event/event-broker';
import { initXylophone as initXylophoneStore } from '@/features/xylophone/controller';
import { Xylophone } from '@/features/xylophone';
import { PlayRecord } from '@/features/xylophone/components/play-record';
import { Display } from '@/features/xylophone/components/display';

const root = document.querySelector('#root');
initThemeStore({ root });
initXylophoneStore();

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

const app = render(App, root);
mount(Header, app);
mount(Title, app);
const xylophone = mount(Xylophone({ events }), app);
mount(Display({ events }), xylophone);
mount(PlayRecord({ events }), app);
mount(Footer, app);
mount(ThemeButton({ events }), app);
