import { createElement } from '@/shared/dom/create-element';

import { getRecordState } from '../model/state';
import { isValidNote } from '../lib/isValidNote';

export const Display = ({ events }) => {
  const record = getRecordState().sequence;

  const el = createElement('input', {
    id: 'display',
    className: 'input rounded my-10 text-center',
    placeholder: record || 'Type...',
    type: 'text',
    maxLength: '14',
    onInput: (e) => {
      const char = e.target.value.trim().toUpperCase().at(-1);
      if (!isValidNote(char)) {
        e.target.value = e.target.value.slice(0, -1);
      } else {
        events.emit('record:input', e.target.value);
      }
    },

    onKeyDown: (e) => {
      if (e.key === 'Enter') {
        events.emit('record:confirm', e.target.value);
      }
    },
  });

  events.on('record:start', () => (el.disabled = true));
  events.on('record:end', () => (el.disabled = false));

  return el;
};
// onInput: (e) => {
//     const newKeyBind = e.target.value.trim().toUpperCase();
//     e.target.value = newKeyBind;
//     if (!isValidKeybind(newKeyBind)) {
//       e.target.value = '';
//     }
//   },
