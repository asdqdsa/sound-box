import { createElement } from '@/shared/dom/create-element';
import { isValidKeybind } from '@/shared/utils/lib';

import { getKeyByNote } from './play-record-btn';
import { KEYBINDS } from '../constants';

export function EditPadKeybind({ events, note, keyBind }) {
  const el = createElement('input', {
    id: keyBind,
    className: 'input rounded h-full text-left keybind-input-hidden',
    placeholder: 'Enter keybind',
    type: 'text',
    maxLength: '1',
    value: keyBind,

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

        e.target.value = e.target.value.toLowerCase();
        events.emit('keybind:edit-close', { note, id: e.target.id });
      }
    },
  });

  events.on('keybind:edit-start', ({ detail }) => {
    if (detail.id.toLowerCase() === note.toLowerCase()) {
      el.classList.add('keybind-input-shown');
      el.classList.remove('keybind-input-hidden');
    }
  });

  events.on('keybind:edit-close', ({ detail }) => {
    if (detail.id.toLowerCase() === note.toLowerCase()) {
      el.classList.add('keybind-input-hidden');
      el.classList.remove('keybind-input-shown');
    }
  });

  // events.on('keybind:edit-confirm', ({ detail }) => {
  //   el.classList.add('hidden');
  // });

  events.on('keybind:updated', ({ detail }) => {
    if (detail.note.toLowerCase() === note.toLowerCase()) {
      el.classList.add('keybind-input-hidden');
      el.classList.remove('keybind-input-shown');
    }
  });

  return el;
}
