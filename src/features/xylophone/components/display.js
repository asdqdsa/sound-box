import { createElement } from '@/shared/dom/create-element';

import { getRecordState } from '../state';

export const Display = ({ events }) => {
  console.log(events);
  const record = getRecordState().sequence;
  const el = createElement(
    'input',
    {
      className: 'input rounded',
      placeholder: record || 'Type...',
      id: 'display',
    },
    ``
  );

  return el;
};
