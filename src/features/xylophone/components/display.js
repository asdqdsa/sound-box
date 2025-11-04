import { createElement } from '@/shared/dom/create-element';

import { getRecordState } from '../model/state';

export const Display = ({ events }) => {
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

  console.log(events);
  return el;
};
