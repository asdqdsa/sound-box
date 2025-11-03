import { ThemeButton } from '@/features/theme-switcher';
import { initThemeSwitcher } from '@/features/theme-switcher/controller';
import { createElement } from '@/shared/dom/create-element';
import { mount, render } from '@/shared/dom/render';
import { events } from '@/shared/event/event-broker';

export function App() {
  return createElement('div', { id: 'app' });
}

export function Header() {
  return createElement('h1', { className: 'ty-h1' }, 'XXXX');
}

export function Xylopad() {
  const XELOKEYS = 12;
  const keys = Array.from({ length: XELOKEYS }, (_, i) => i);

  return createElement(
    'div',
    { className: 'flex gap-2 flex-col items-center' },
    ...keys.map(() => ThemeButton({ emit: events.emit }))
  );
}

const root = document.querySelector('#root');
initThemeSwitcher({ root });

const app = render(App, root);

mount(Header, app);
mount(Xylopad, app);
