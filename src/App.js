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
      this._synth.create();
      this.buildInput();

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

  buildInput() {
    window.addEventListener('keydown', (e) => { this._synth.play() });
  }
}
