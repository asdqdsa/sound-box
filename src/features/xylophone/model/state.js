/**
 * @typedef {Object} XylophoneState
 * @property {string} activeKey
 * @property {boolean} [isFirstLoad]
 */
import { SEQUENCE } from '../constants';
import { getXylophoneState, setXylophoneState } from './storage';

function initXylophoneState() {
  /** @type {XylophoneState} Xylophone State */
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

const recordState = {
  sequence: SEQUENCE,
  index: 0,
};

export const getRecordState = () => recordState;
