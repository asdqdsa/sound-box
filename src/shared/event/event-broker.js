export const events = {
  emit(event, data) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },

  on(event, cb) {
    document.addEventListener(event, cb);
  },

  off(event, cb) {
    document.removeEventListener(event, cb);
  },
};
