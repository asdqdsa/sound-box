import { audioCtx, getAudio } from './loader';

export function playNote(note) {
  const sample = getAudio(note);
  if (!sample) return;

  const source = audioCtx.createBufferSource();
  source.buffer = sample;
  source.connect(audioCtx.destination);
  source.start();
}
