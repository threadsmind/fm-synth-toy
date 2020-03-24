export default class FMSynth {
  constructor(context) {
    this._context = context;
    this._output = null;
    this._carrier = {};
    this._modulators = {};
    this._testTone = 55; // in hertz - at least move a default to properties
    this._glideTime = 0.01; // in seconds - move to properties
    this._playing = false;
  }

  init() {
    // check for a valid audio context
    if (!this._context) {
      console.log('synth error. no context');
      return;
    }

    // build carrier
    // TODO maybe have properties with defaults?
    this._carrier = {
      osc: new OscillatorNode(
        this._context,
        { type: 'sine', frequency: this._testTone }
      ),
      pitchDrift: 10, // to be used like: osc.detune.setValueAtTime((Math.random() * osc.pitchDrift), context.currentTime)
      volume: new GainNode(this._context), // to be used with gain envelope
      gainEnvelope: { // TODO there's probably a better way to represent this data
        amp: [0.7, 0.4],
        attack: 0.01,
        decay: 0.12,
        release: 0.20,
      },
    };

    // build modulators
    for (let i = 0; i < 5; i++) {
      this._modulators[`modulator${i}`] = {
        osc: new OscillatorNode(
          this._context,
          { type: 'sine', frequency: this._testTone }
        ),
        pitchDrift: 10, // to be used like: osc.detune.setValueAtTime((Math.random() * osc.pitchDrift), context.currentTime)
        volume: new GainNode(this._context), // to be used with gain envelope
        gainEnvelope: { // TODO there's probably a better way to represent this data
          amp: [0.7, 0.4],
          attack: 0.01,
          decay: 0.12,
          release: 0.20,
        },
      }
    }

    // build output node
    // used to control master volume level for the synth
    this._output = new GainNode(this._context, { gain: 0.7 });
    this._output.connect(this._context.destination);
    // carrier gain envelope
    this._carrier.volume.connect(this._output);
    this._carrier.volume.gain.setValueAtTime(0, this._context.currentTime);
    // carrier osc
    this._carrier.osc.connect(this._carrier.volume);
    this._carrier.osc.start(this._context.currentTime);

    // TODO just for test. Itterate over this
    // modulator gain envelope
    this._modulators.modulator0.volume.connect(this._carrier.osc.frequency);
    this._modulators.modulator0.volume.gain.setValueAtTime(0, this._context.currentTime);
    //modulator osc
    this._modulators.modulator0.osc.connect(this._modulators.modulator0.volume);
    this._modulators.modulator0.osc.start(this._context.currentTime);
  }

  // plays a test tone
  play(pitch) {
    // input pitch or test tone
    pitch = (pitch) ? pitch : this._testTone;
    // set input / random pitch
    this._carrier.osc.frequency.linearRampToValueAtTime(pitch, this._context.currentTime + this._glideTime);
    this._modulators.modulator0.osc.frequency.linearRampToValueAtTime(pitch * 3, this._context.currentTime + 0.01);
    // carrier gain envelope
    this._carrier.volume.gain.setValueAtTime(0, this._context.currentTime);
    this._carrier.volume.gain.linearRampToValueAtTime(0.7, this._context.currentTime + 0.01);
    this._carrier.volume.gain.linearRampToValueAtTime(0.4, this._context.currentTime + 0.12);
    // modulator gain envelope
    this._modulators.modulator0.volume.gain.setValueAtTime(0, this._context.currentTime);
    this._modulators.modulator0.volume.gain.linearRampToValueAtTime(202, this._context.currentTime + 0.05);
    this._modulators.modulator0.volume.gain.linearRampToValueAtTime(198, this._context.currentTime + 0.12);
    // playing flag... maybe unneeded, but it's here for now
    this._playing = true;
  }

  // stops the currently playing sound
  stop() {
    this._carrier.volume.gain.linearRampToValueAtTime(0, this._context.currentTime + 0.20);
    // this._modulators.modulator0.volume.gain.linearRampToValueAtTime(0, this._context.currentTime + 0.20);
    this._playing = false;
  }

  get isPlaying() {
    return this._playing;
  }
}
