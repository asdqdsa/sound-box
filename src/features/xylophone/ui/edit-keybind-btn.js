import { createElement } from '@/shared/dom/create-element';

export function EditKeybindBtn({ events, note }) {
  const el = createElement(
    'div',
    {
      className: 'keybind-edit-btn h-full flex items-center pointer',
      title: 'Edit',
      id: note,
      onClick: (e) => {
        events.emit('keybind:edit-start', { note, id: e.target.id });
      },
    },
    '✎..'
  );

  return el;
}
