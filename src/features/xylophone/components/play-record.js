import { createElement } from '@/shared/dom/create-element';
import { sleep } from '@/shared/utils/async/sleep';
import { lock } from '@/shared/utils/async/lock';

import { getRecordState } from '../model/state';

export function PlayRecord({ events }) {
  const record = getRecordState().sequence;

  const playSequens = async () => {
    lock.run(async () => {
      for (const note of record) {
        events.emit('record:start', note);
        events.emit('key:down', note.toLowerCase());
        await sleep(300);
        events.emit('key:up', note.toLowerCase());
        events.emit('record:end');
      }
    });
  };

  events.on('record:start', ({ detail }) => {
    el.textContent = `Playing: ${detail}`;
  });

  events.on('record:end', () => {
    el.textContent = `PLAY`;
  });

  const el = createElement(
    'button',
    { className: 'btn', id: 'start', onClick: playSequens },
    `PLAY${''}`
  );

  return el;
}
