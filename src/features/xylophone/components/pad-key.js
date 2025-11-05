import { createElement } from '@/shared/dom/create-element';

let isActive = false;
const path = (file) => `sounds/xylo/${file}`;
const SOUNDS = Object.fromEntries(
  Object.entries({
    C: 'C.wav',
    D: 'D.wav',
    E: 'E.wav',
    F: 'F.wav',
    G: 'G.wav',
    A: 'A.wav',
    B: 'B.wav',
  }).map(([note, file]) => {
    const audio = new Audio(path(file));
    audio.preload = 'auto';
    return [note, audio];
  })
);

export function XylophoneKey({ events, note, keyBind, idx }) {
  const play = () => {
    const sound = SOUNDS[note.toUpperCase()];
    sound.currentTime = 0;
    sound.play();
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
