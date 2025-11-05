import { createElement } from '@/shared/dom/create-element';

import { playNote } from '../audio/player';

let isActive = false;

export function XylophoneKey({ events, note, keyBind, idx }) {
  const play = () => {
    playNote(note.toUpperCase());
    console.log('Playing note:', note);
    events.emit('xylophone:key', note);
  };

  const mouseDownHandler = () => {
    isActive = true;
    play();
    el.classList.add('active');
  };
  const mouseUpHandler = () => {
    isActive = false;
    el.classList.remove('active');
  };
  const mouseOverHandler = () => {
    if (isActive) {
      play();
      el.classList.add('active');
    }
  };

  const mouseOutHandler = () => {
    el.classList.remove('active');
  };

  events.on('key:down', ({ detail }) => {
    if (detail.toLowerCase() === keyBind.toLowerCase()) {
      play();
      el.classList.add('active');
      setTimeout(() => {
        // el.classList.remove('active');
        isActive = false;
      }, 150);
    }
  });

  events.on('key:up', ({ detail }) => {
    if (detail.toLowerCase() === keyBind.toLowerCase()) {
      el.classList.remove('active');
    }
  });
  const el = createElement(
    'button',
    {
      className: 'btn',
      id: idx,
      onMouseDown: mouseDownHandler,
      onMouseUp: mouseUpHandler,
      onMouseOver: mouseOverHandler,
      onMouseOut: mouseOutHandler,
    },
    `${note.toUpperCase()} :: [ ${keyBind} ]`
  );

  return el;
}
