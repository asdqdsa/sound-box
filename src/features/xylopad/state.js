/**
 * @typedef {Object} XylophoneState
 * @property {string} activeKey
 * @property {boolean} [isFirstLoad]
 */
import { getXylophoneState, setXylophoneState } from './storage';

function initXylophoneState() {
  /** @type {XylophoneState} Theme State */
  const initialState = {
    activeKey: 'null',
    isFirstLoad: true,
  };

  setXylophoneState(initialState);
  return initialState;
}

export function loadXylophoneState() {
  const stale = getXylophoneState();
  const fresh = stale ? { ...stale, isFirstLoad: false } : initXylophoneState();
  return fresh;
}

export function updateXylophoneState({ activeKey }) {
  const stale = loadXylophoneState();
  const fresh = { ...stale, activeKey };
  setXylophoneState(fresh);
  return fresh;
}
