import { createElement } from '@/shared/dom/create-element';

import { XylophoneKey } from './pad-key';
import { KEYBINDS, XYLOPHONE_KEYS } from '../constants';
import { getKeyByNote } from './play-record';

// export const XYLOPHONE_KEYS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
export function Xylophone({ events }) {
  const keys = Array.from(XYLOPHONE_KEYS);

  const el = createElement(
    'div',
    { className: 'flex gap-2 flex-col items-center h-full' },
    ...keys.map((note, idx) =>
      XylophoneKey({
        events,
        note,
        keyBind: getKeyByNote(note, KEYBINDS),
        idx,
      })
    )
  );

  return el;
}
