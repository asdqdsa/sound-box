import { events } from '@/shared/event/event-broker';

import { loadXylophoneState, updateXylophoneState } from './model/state';
import { MAX_RECORD_LENGTH } from './constants';
import { preLoadAudio } from './audio/loader';

export async function initXylophone() {
  await preLoadAudio();
  events.on('xylophone:key', ({ detail }) => {
    const state = loadXylophoneState();
    updateXylophoneState({ ...state, activeKey: detail });
  });

  function updateRecord(detail) {
    const state = loadXylophoneState();
    const record = detail.slice(0, MAX_RECORD_LENGTH);
    updateXylophoneState({ ...state, record });
  }
  events.on('record:input', ({ detail }) => updateRecord(detail));
  events.on('record:confirm', ({ detail }) => updateRecord(detail));
}
