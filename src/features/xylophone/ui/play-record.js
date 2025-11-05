import { createElement } from '@/shared/dom/create-element';
import { sleep } from '@/shared/utils/async/sleep';
import { lock } from '@/shared/utils/async/lock';

import { loadXylophoneState } from '../model/state';
import { KEYBINDS } from '../constants';

export function PlayRecordButton({ events }) {
  // const defaultSeq = getRecordState().sequence;
  // const { record } = loadXylophoneState();

  const playSequens = async (record) => {
    lock.run(async () => {
      for (const note of record) {
        const key = getKeyByNote(note, KEYBINDS);
        events.emit('record:start', note);
        events.emit('key:down', key);
        await sleep(300);
        events.emit('key:up', key);
        await sleep(100);
        events.emit('record:end');
      }
    });
  };

  events.on('record:confirm', () => {
    const { record } = loadXylophoneState();
    playSequens(record);
  });

  events.on('record:start', ({ detail }) => {
    el.textContent = `Playing: ${detail}`;
  });

  events.on('record:end', () => {
    el.textContent = `PLAY`;
  });

  const el = createElement(
    'button',
    {
      className: 'btn',
      id: 'start',
      onClick: () => {
        const { record } = loadXylophoneState();
        playSequens(record);
      },
    },
    `PLAY${''}`
  );

  return el;
}

export const getKeyByNote = (note, keyMap) => {
  const key = keyMap.get(note.toUpperCase()).toLowerCase();
  console.log('key: ', key);
  return key;
};
