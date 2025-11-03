import { events } from '@/shared/event/event-broker';

window.addEventListener('keydown', (e) => {
  if (e.repeat) return;
  console.log('key:down', e.key);
  events.emit('key:down', e.key);
});

window.addEventListener('keyup', (e) => {
  console.log('key:up:', e.key);
  events.emit('key:up', e.key);
});
