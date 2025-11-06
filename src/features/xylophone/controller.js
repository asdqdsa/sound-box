import { events } from '@/shared/event/event-broker';

import { loadXylophoneState, updateXylophoneState } from './model/state';
import { KEYBINDS, MAX_RECORD_LENGTH } from './constants';
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

  events.on('keybind:edit-confirm', ({ detail }) => {
    const { keyBind, newKeyBind } = detail;

    if (!newKeyBind || KEYBINDS.has(newKeyBind.toUpperCase())) return;

    const note = KEYBINDS.get(keyBind.toUpperCase());
    if (!note) return;

    const entries = Array.from(KEYBINDS.entries()).map(([k, v]) =>
      k.toUpperCase() === keyBind.toUpperCase()
        ? [newKeyBind.toUpperCase(), note]
        : [k, v]
    );

    KEYBINDS.clear();
    for (const [k, v] of entries) KEYBINDS.set(k, v);

    console.log(`Keybind updated: ${keyBind} -> ${newKeyBind}`);
    console.table(KEYBINDS);

    events.emit('keybind:updated', { keyBind: newKeyBind, note });
  });
}
