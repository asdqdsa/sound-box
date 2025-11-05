const audioCtx = new AudioContext();

const files = {
  C: '/sounds/xylo/C.wav',
  D: '/sounds/xylo/D.wav',
  E: '/sounds/xylo/E.wav',
  F: '/sounds/xylo/F.wav',
  G: '/sounds/xylo/G.wav',
  A: '/sounds/xylo/A.wav',
  B: '/sounds/xylo/B.wav',
};

const decodedAudioData = {};

export async function preLoadAudio() {
  try {
    await Promise.all(
      Object.keys(files).map(async (note) => {
        const response = await fetch(files[note]);
        const data = await response.arrayBuffer();
        const buffer = await audioCtx.decodeAudioData(data);
        console.log(`Loaded: ${note}`, buffer.duration);
        decodedAudioData[note] = buffer;
      })
    );
  } catch (err) {
    console.error('Audio preload failed with: ', err);
  }
}

export function getAudio(note) {
  return decodedAudioData[note.toUpperCase()];
}

export { audioCtx };
