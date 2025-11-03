import { createElement } from '@/shared/dom/create-element';
import { events } from '@/shared/event/event-broker';

let isActive = false;

export function XylophoneKey({ emit, note, key }) {
  const play = () => {
    // const audio = new Audio(`sounds/${note}.mp3`);
    // audio.play();
    console.log('Playing note:', note);
    emit('xylophone:key', note);
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
    if (detail.toLowerCase() === key.toLowerCase()) {
      play();
      el.classList.add('active');
      setTimeout(() => {
        // el.classList.remove('active');
        isActive = false;
      }, 150);
    }
  });

  events.on('key:up', ({ detail }) => {
    if (detail.toLowerCase() === key.toLowerCase()) {
      el.classList.remove('active');
    }
  });
  const el = createElement(
    'button',
    {
      className: 'btn',
      onMouseDown: mouseDownHandler,
      onMouseUp: mouseUpHandler,
      onMouseOver: mouseOverHandler,
      onMouseOut: mouseOutHandler,
    },
    `${note} - key: ${key}`
  );

  return el;
}
