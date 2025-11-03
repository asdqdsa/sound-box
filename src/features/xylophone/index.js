import { createElement } from '@/shared/dom/create-element';

import { XylophoneKey } from './components/pad-key';
import { XYLOPHONE_KEYS } from './constants';

export function Xylophone({ events }) {
  const keys = Array.from(XYLOPHONE_KEYS);

  const el = createElement(
    'div',
    { className: 'flex gap-2 flex-col items-center h-full' },
    ...keys.map((note, idx) =>
      XylophoneKey({
        emit: events.emit,
        on: events.on,
        note,
        key: note,
        idx,
      })
    )
  );

  return el;
}
