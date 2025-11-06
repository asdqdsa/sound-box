import { createElement } from '@/shared/dom/create-element';
import { lock } from '@/shared/utils/async/lock';

import { playNote } from '../audio/player';

let isActive = false;

export function XylophoneKey({ events, note, keyBind, idx, className }) {
  const play = () => {
    playNote(note.toUpperCase());
    console.log('Playing note:', note);
    events.emit('xylophone:key', note);
  };

  const mouseDownHandler = () => {
    if (lock.status) return;
    isActive = true;
    play();
    el.classList.add('active');
  };

  const mouseUpHandler = () => {
    if (lock.status) return;
    isActive = false;
    el.classList.remove('active');
  };

  const mouseOverHandler = () => {
    if (isActive && !lock.status) {
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

  events.on('keybind:updated', ({ detail }) => {
    const { keyBind: newKeyBind, note: updatedNote } = detail;
    if (updatedNote.toLowerCase() !== note.toLowerCase()) return;
    keyBind = newKeyBind;
    el.textContent = `${note.toUpperCase()} :: [ ${keyBind} ]`;
  });

  const el = createElement(
    'button',
    {
      className: `btn ${className}`,
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
