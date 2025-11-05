import { createElement } from '@/shared/dom/create-element';

import { getRecordState } from '../model/state';

export const Display = ({ events }) => {
  const record = getRecordState().sequence;

  const el = createElement('input', {
    id: 'display',
    className: 'input rounded',
    placeholder: record || 'Type...',
    onInput: (e) => events.emit('record:input', e.target.value),
    onChange: (e) => events.emit('record:confirm', e.target.value),
  });

  events.on('record:start', () => (el.disabled = true));
  events.on('record:end', () => (el.disabled = false));

  return el;
};
