import { createElement } from '@/shared/dom/create-element';

export function EditKeybindBtn({ events, note }) {
  events.on('keybind:edit-start', ({ detail }) => {
    if (note === detail.note) {
      el.classList.add('hidden');
    }
  });
  events.on('keybind:edit-close', ({ detail }) => {
    if (detail.id.toLowerCase() === note.toLowerCase()) {
      el.classList.remove('hidden');
    }
  });

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

export function CloseKeybindBtn({ events, note }) {
  events.on('keybind:edit-start', ({ detail }) => {
    if (note === detail.note) {
      el.classList.remove('hidden');
    }
  });

  events.on('keybind:edit-close', ({ detail }) => {
    if (detail.id.toLowerCase() === note.toLowerCase()) {
      el.classList.add('hidden');
    }
  });

  const el = createElement(
    'div',
    {
      className: 'keybind-edit-btn h-full flex items-center pointer hidden',
      title: 'Edit',
      id: note,
      onClick: (e) => {
        events.emit('keybind:edit-close', { note, id: e.target.id });
      },
    },
    '[X]'
  );

  return el;
}
