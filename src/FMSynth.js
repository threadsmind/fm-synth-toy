/*
TODO - what if we DID do the playv2 thing where oscs always play. Then when a note is played we set frequency and play the envelopes?

TODO - live play
*/

export default class FMSynth {
  constructor(context) {
    this._context = context;
    this._output = null;
    this._carrierGainEnvelope = null;
    this._carrier = null;
    this._modulator = null;
    this._modulatorGainEnvelope = null;
    this._basePitch = 55;
  }

  create() {
    if (!this._context) {
      console.log('synth error. no context');
      return;
    }
    // output node
    this._output = new GainNode(this._context, { gain: 0.7 });
    this._output.connect(this._context.destination);
    // carrier gain envelope
    this._carrierGainEnvelope = new GainNode(this._context);
    this._carrierGainEnvelope.connect(this._output);
    this._carrierGainEnvelope.gain.setValueAtTime(0, this._context.currentTime);
    // carrier osc
    this._carrier = new OscillatorNode(this._context, { type: 'sine', frequency: this._basePitch, detune: Math.random() * 10 });
    this._carrier.connect(this._carrierGainEnvelope);
    this._carrier.start(this._context.currentTime);
    // modulator gain envelope
    this._modulatorGainEnvelope = new GainNode(this._context);
    this._modulatorGainEnvelope.connect(this._carrier.frequency);
    this._modulatorGainEnvelope.gain.setValueAtTime(0, this._context.currentTime);
    //modulator osc
    this._modulator = new OscillatorNode(this._context, { type: 'sine', frequency: this._basePitch * 3, detune: Math.random() * 10});
    this._modulator.connect(this._modulatorGainEnvelope);
    this._modulator.start(this._context.currentTime);
  }

  play(pitch) {
    //randomize pitch for testing
    pitch = (!pitch) ? (Math.random() * 1000) : pitch;
    // set input / random pitch
    this._carrier.frequency.linearRampToValueAtTime(pitch, this._context.currentTime + 0.01);
    this._modulator.frequency.linearRampToValueAtTime(pitch * 3, this._context.currentTime + 0.01);
    // carrier gain envelope
    this._carrierGainEnvelope.gain.setValueAtTime(0, this._context.currentTime);
    this._carrierGainEnvelope.gain.linearRampToValueAtTime(0.7, this._context.currentTime + 0.01);
    this._carrierGainEnvelope.gain.linearRampToValueAtTime(0.4, this._context.currentTime + 0.12);
    this._carrierGainEnvelope.gain.linearRampToValueAtTime(0.4, this._context.currentTime + 0.18);
    this._carrierGainEnvelope.gain.linearRampToValueAtTime(0, this._context.currentTime + 0.20);
    // modulator gain envelope
    this._modulatorGainEnvelope.gain.setValueAtTime(0, this._context.currentTime);
    this._modulatorGainEnvelope.gain.linearRampToValueAtTime(202, this._context.currentTime + 0.05);
    this._modulatorGainEnvelope.gain.linearRampToValueAtTime(198, this._context.currentTime + 0.12);
    this._modulatorGainEnvelope.gain.linearRampToValueAtTime(10, this._context.currentTime + 0.18);
    this._modulatorGainEnvelope.gain.linearRampToValueAtTime(0, this._context.currentTime + 0.20);
  }
}
