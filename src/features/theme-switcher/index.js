import { createElement } from '@/shared/dom/create-element';

export function ThemeButton({ emit }) {
  return createElement(
    'button',
    {
      className: 'btn',
      onClick: () => emit('theme:next'),
    },
    'Next Theme1'
  );
}
