import SynthApp from './App';

window.addEventListener('load', () => {
  window.SynthApp = new SynthApp();
  ['mousedown', 'touchstart', 'keydown'].forEach(input => {
    window.addEventListener(input, () => {
      if (!window.SynthApp.isInit) {
        window.SynthApp.init();
      }
    }, { once: true })
  });
}, { once: true });
