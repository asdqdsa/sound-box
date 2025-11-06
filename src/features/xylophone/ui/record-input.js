import { createElement } from '@/shared/dom/create-element';

import { getRecordState } from '../model/state';

export const Display = ({ events }) => {
  const record = getRecordState().sequence;

  const el = createElement('input', {
    id: 'display',
    className: 'input rounded my-10 text-center',
    placeholder: record || 'Type...',
    type: 'text',
    maxLength: '14',
    onInput: (e) => events.emit('record:input', e.target.value),
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
