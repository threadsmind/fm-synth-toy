import FMSynth from './FMSynth';

export default class SynthApp {
  constructor() {
    this._init = false;
    this._synth = null;
    this._context = null;
    this._error = false;
  }

  init() {
    if (window.AudioContext || window.webkitAudioContext) {
      this._context = new (window.AudioContext || window.webkitAudioContext);
      this._synth = new FMSynth(this._context);
      this._synth.init();
      this.buildTestToneInput();

      this._init = true;
      console.log('SynthToy ready!');
    } else {
      this._error = true;
      console.log('SynthToy cannot start in this browser');
    }
  }

  get isInit() {
    return this._init;
  }

  buildTestToneInput() {
    window.addEventListener('keydown', (e) => { // TODO change this from 'window' to a UI element
      if (e.keyCode === 32 && !this._synth.isPlaying) { // TODO make this key code customizable
        console.log('gug');
        this._synth.play();
      }
    });
    window.addEventListener('keyup', (e) => { // TODO change this from 'window' to a UI element
    if (e.keyCode === 32) { // TODO make this customizable
      console.log('no gug');
      this._synth.stop();
    }
  });
  }
}
