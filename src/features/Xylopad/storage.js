import { loadState, saveState } from '@/shared/storage';

import { LOCAL_STORAGE_KEY_XYLOPHONE } from './constants';

/**
 * @typedef {Object} XylophoneState
 * @property {string} activeKey
 * @property {boolean} [isFirstLoad]
 */

/**
 * @param {XylophoneState} state State
 * @returns {void}
 */

export function setXylophoneState(state) {
  saveState(LOCAL_STORAGE_KEY_XYLOPHONE, state);
}

/**
 * @returns {XylophoneState | null}
 */
export function getXylophoneState() {
  return /** @type {XylophoneState | null} */ (
    loadState(LOCAL_STORAGE_KEY_XYLOPHONE)
  );
}
