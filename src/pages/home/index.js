import '@/shared/dom/keyboard-events';

import { ThemeButton } from '@/features/theme-switcher';
import { initTheme as initThemeStore } from '@/features/theme-switcher/controller';
import { createElement } from '@/shared/dom/create-element';
import { mount, render } from '@/shared/dom/render';
import { events } from '@/shared/event/event-broker';
import { initXylophone as initXylophoneStore } from '@/features/xylophone/controller';
import { Xylophone } from '@/features/xylophone';
import { PlayRecordButton } from '@/features/xylophone/components/play-record';
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

const FML =
  "I wasnt able to finish the task in time, please if you'd be so kind and check the work on the the last day, i'd appreciate it very much...";

export function Title() {
  return createElement('h1', { className: '' }, FML);
  // return createElement('h1', { className: '' }, 'Title');
}

const app = render(App, root);
mount(Header, app);
mount(Title, app);
const xylophone = mount(Xylophone({ events }), app);
mount(Display({ events }), xylophone);
mount(PlayRecordButton({ events }), app);
mount(Footer, app);
mount(ThemeButton({ events }), app);
