import { createElement } from '@/shared/dom/create-element';

import { XylophoneKey } from './key-btn';
import { KEYBINDS, XYLOPHONE_KEYS } from '../constants';
import { getKeyByNote } from './play-record-btn';
import { EditPadKeybind } from './edit-keybind-input';
import { EditKeybindBtn } from './edit-keybind-btn';

// export const XYLOPHONE_KEYS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
export function Xylophone({ events }) {
  const keys = Array.from(XYLOPHONE_KEYS);

  const el = createElement(
    'div',
    { className: 'flex gap-2 flex-col items-center h-full' },
    ...keys.map((note, idx) => {
      const keyBind = getKeyByNote(note, KEYBINDS);
      return createElement(
        'div',
        { className: 'flex items-center gap-4 items-center' },
        XylophoneKey({
          events,
          note,
          keyBind,
          idx,
        }),
        EditPadKeybind({ events, note, keyBind }),
        EditKeybindBtn({ events, note })
      );
    })
  );

  return el;
}
