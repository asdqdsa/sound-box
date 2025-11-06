import { createElement } from '@/shared/dom/create-element';

import { XylophoneKey } from './key-btn';
import { KEYBINDS, XYLOPHONE_KEYS } from '../constants';
import { getKeyByNote } from './play-record-btn';
import { EditPadKeybind } from './edit-keybind-input';
import { CloseKeybindBtn, EditKeybindBtn } from './edit-keybind-btn';

// export const XYLOPHONE_KEYS = ['c', 'd', 'e', 'f', 'g', 'a', 'b'];
export function Xylophone({ events }) {
  const keys = Array.from(XYLOPHONE_KEYS);
  const styleTokens = [
    'w-full',
    'w-xl4',
    'w-xl3',
    'w-xl2',
    'w-xl',
    'w-lg',
    'w-md',
  ];
  const el = createElement(
    'div',
    {
      className: 'flex flex-col gap-3 items-center h-full',
      id: 'xylopad',
    },
    ...keys.map((note, idx) => {
      const keyBind = getKeyByNote(note, KEYBINDS);

      return createElement(
        'div',
        { className: 'flex items-center gap-4 items-center' },
        CloseKeybindBtn({ events, note }),
        EditKeybindBtn({ events, note }),
        EditPadKeybind({ events, note, keyBind }),
        XylophoneKey({
          events,
          note,
          keyBind,
          idx,
          className: styleTokens[idx],
        })
      );
    })
  );

  events.on('record:start', () => {
    el.style.pointerEvents = 'none';
    el.classList.add('select-none');
  });

  events.on('record:end', () => {
    el.style.pointerEvents = '';
    el.classList.remove('select-none');
  });

  return el;
}
