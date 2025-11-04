import { events } from '@/shared/event/event-broker';

import { lock } from '../utils/async/lock';

window.addEventListener('keydown', (e) => {
  if (e.repeat || lock.status) return;
  console.log('keydown', e.key);
  events.emit('key:down', e.key);
});

window.addEventListener('keyup', (e) => {
  if (lock.status) return;
  events.emit('key:up', e.key);
});
