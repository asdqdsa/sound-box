import { XYLOPHONE_KEYS } from '../constants';

export function isValidNote(note) {
  return XYLOPHONE_KEYS.includes(note.toLowerCase());
}
