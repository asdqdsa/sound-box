import { createElement } from '@/shared/dom/create-element';

import { getKeyByNote } from './play-record-btn';
import { KEYBINDS } from '../constants';

export function isValidKeybind(code) {
  return /^[A-Z]$/.test(code);
}

export function EditPadKeybind({ events, note, keyBind }) {
  const el = createElement('input', {
    id: keyBind,
    className: 'input rounded h-full text-left hidden',
    placeholder: 'Enter keybind',
    type: 'text',
    maxLength: '1',

    onInput: (e) => {
      const newKeyBind = e.target.value.trim().toUpperCase();
      e.target.value = newKeyBind;
      if (!isValidKeybind(newKeyBind)) {
        e.target.value = '';
      }
    },

    onKeyDown: (e) => {
      if (e.key === 'Enter') {
        const currentKey = getKeyByNote(note, KEYBINDS);
        events.emit('keybind:edit-confirm', {
          keyBind: currentKey,
          newKeyBind: e.target.value.toLowerCase(),
        });

        e.target.value = '';
      }
    },
  });

  events.on('keybind:edit-start', ({ detail }) => {
    if (detail.id.toLowerCase() === note.toLowerCase()) {
      el.classList.remove('hidden');
    }
  });

  // events.on('keybind:edit-confirm', ({ detail }) => {
  //   el.classList.add('hidden');
  // });

  events.on('keybind:updated', ({ detail }) => {
    if (detail.note.toLowerCase() === note.toLowerCase()) {
      el.classList.add('hidden');
    }
  });

  return el;
}
