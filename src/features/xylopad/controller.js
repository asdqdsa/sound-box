import { events } from '@/shared/event/event-broker';

import { loadXylophoneState, updateXylophoneState } from './state';

export function initXylophone() {
  // activeKey == prevKey

  events.on('xylophone:key', ({ detail }) => {
    const { activeKey } = loadXylophoneState();

    updateXylophoneState({ activeKey: detail });
    console.log('', activeKey, detail);
  });
}
