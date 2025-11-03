import { createElement } from '@/shared/dom/create-element';

let isActive = false;

export function ThemeButton({ emit }) {
  const mouseDownHandler = () => {
    console.log('Mouse down');
    isActive = true;
    emit('theme:next');
  };
  const mouseUpHandler = () => {
    isActive = false;
    console.log('Mouse up');
  };
  const mouseLeaveHandler = () => {
    console.log('Mouse leave');
  };
  const mouseOverHandler = () => {
    if (isActive) emit('theme:next');
    console.log('Mouse over');
  };

  console.log('isActive: ', isActive);
  return createElement(
    'button',
    {
      className: 'btn',
      onMouseDown: mouseDownHandler,
      onMouseUp: mouseUpHandler,
      onMouseLeave: mouseLeaveHandler,
      onMouseOver: mouseOverHandler,
    },

    'Next Theme1'
  );
}
