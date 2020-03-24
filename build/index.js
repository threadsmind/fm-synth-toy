/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SynthApp; });\n/* harmony import */ var _FMSynth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FMSynth */ \"./src/FMSynth.js\");\n\n\nclass SynthApp {\n  constructor() {\n    this._init = false;\n    this._synth = null;\n    this._context = null;\n    this._error = false;\n  }\n\n  init() {\n    if (window.AudioContext || window.webkitAudioContext) {\n      this._context = new (window.AudioContext || window.webkitAudioContext);\n      this._synth = new _FMSynth__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._context);\n      this._synth.init();\n      this.buildTestToneInput();\n\n      this._init = true;\n      console.log('SynthToy ready!');\n    } else {\n      this._error = true;\n      console.log('SynthToy cannot start in this browser');\n    }\n  }\n\n  get isInit() {\n    return this._init;\n  }\n\n  buildTestToneInput() {\n    window.addEventListener('keydown', (e) => { // TODO change this from 'window' to a UI element\n      if (e.keyCode === 32 && !this._synth.isPlaying) { // TODO make this key code customizable\n        console.log('gug');\n        this._synth.play();\n      }\n    });\n    window.addEventListener('keyup', (e) => { // TODO change this from 'window' to a UI element\n    if (e.keyCode === 32) { // TODO make this customizable\n      console.log('no gug');\n      this._synth.stop();\n    }\n  });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/FMSynth.js":
/*!************************!*\
  !*** ./src/FMSynth.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FMSynth; });\nclass FMSynth {\n  constructor(context) {\n    this._context = context;\n    this._output = null;\n    this._carrier = {};\n    this._modulators = {};\n    this._testTone = 55; // in hertz - at least move a default to properties\n    this._glideTime = 0.01; // in seconds - move to properties\n    this._playing = false;\n  }\n\n  init() {\n    // check for a valid audio context\n    if (!this._context) {\n      console.log('synth error. no context');\n      return;\n    }\n\n    // build carrier\n    // TODO maybe have properties with defaults?\n    this._carrier = {\n      osc: new OscillatorNode(\n        this._context,\n        { type: 'sine', frequency: this._testTone }\n      ),\n      pitchDrift: 10, // to be used like: osc.detune.setValueAtTime((Math.random() * osc.pitchDrift), context.currentTime)\n      volume: new GainNode(this._context), // to be used with gain envelope\n      gainEnvelope: { // TODO there's probably a better way to represent this data\n        amp: [0.7, 0.4],\n        attack: 0.01,\n        decay: 0.12,\n        release: 0.20,\n      },\n    };\n\n    // build modulators\n    for (let i = 0; i < 5; i++) {\n      this._modulators[`modulator${i}`] = {\n        osc: new OscillatorNode(\n          this._context,\n          { type: 'sine', frequency: this._testTone }\n        ),\n        pitchDrift: 10, // to be used like: osc.detune.setValueAtTime((Math.random() * osc.pitchDrift), context.currentTime)\n        volume: new GainNode(this._context), // to be used with gain envelope\n        gainEnvelope: { // TODO there's probably a better way to represent this data\n          amp: [0.7, 0.4],\n          attack: 0.01,\n          decay: 0.12,\n          release: 0.20,\n        },\n      }\n    }\n\n    // build output node\n    // used to control master volume level for the synth\n    this._output = new GainNode(this._context, { gain: 0.7 });\n    this._output.connect(this._context.destination);\n    // carrier gain envelope\n    this._carrier.volume.connect(this._output);\n    this._carrier.volume.gain.setValueAtTime(0, this._context.currentTime);\n    // carrier osc\n    this._carrier.osc.connect(this._carrier.volume);\n    this._carrier.osc.start(this._context.currentTime);\n\n    // TODO just for test. Itterate over this\n    // modulator gain envelope\n    this._modulators.modulator0.volume.connect(this._carrier.osc.frequency);\n    this._modulators.modulator0.volume.gain.setValueAtTime(0, this._context.currentTime);\n    //modulator osc\n    this._modulators.modulator0.osc.connect(this._modulators.modulator0.volume);\n    this._modulators.modulator0.osc.start(this._context.currentTime);\n  }\n\n  // plays a test tone\n  play(pitch) {\n    // input pitch or test tone\n    pitch = (pitch) ? pitch : this._testTone;\n    // set input / random pitch\n    this._carrier.osc.frequency.linearRampToValueAtTime(pitch, this._context.currentTime + this._glideTime);\n    this._modulators.modulator0.osc.frequency.linearRampToValueAtTime(pitch * 3, this._context.currentTime + 0.01);\n    // carrier gain envelope\n    this._carrier.volume.gain.setValueAtTime(0, this._context.currentTime);\n    this._carrier.volume.gain.linearRampToValueAtTime(0.7, this._context.currentTime + 0.01);\n    this._carrier.volume.gain.linearRampToValueAtTime(0.4, this._context.currentTime + 0.12);\n    // modulator gain envelope\n    this._modulators.modulator0.volume.gain.setValueAtTime(0, this._context.currentTime);\n    this._modulators.modulator0.volume.gain.linearRampToValueAtTime(202, this._context.currentTime + 0.05);\n    this._modulators.modulator0.volume.gain.linearRampToValueAtTime(198, this._context.currentTime + 0.12);\n    // playing flag... maybe unneeded, but it's here for now\n    this._playing = true;\n  }\n\n  // stops the currently playing sound\n  stop() {\n    this._carrier.volume.gain.linearRampToValueAtTime(0, this._context.currentTime + 0.20);\n    // this._modulators.modulator0.volume.gain.linearRampToValueAtTime(0, this._context.currentTime + 0.20);\n    this._playing = false;\n  }\n\n  get isPlaying() {\n    return this._playing;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/FMSynth.js?");

/***/ }),

/***/ "./src/main.js":
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./App */ \"./src/App.js\");\n\n\nwindow.addEventListener('load', () => {\n  window.SynthApp = new _App__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n  ['mousedown', 'touchstart', 'keydown'].forEach(input => {\n    window.addEventListener(input, () => {\n      if (!window.SynthApp.isInit) {\n        window.SynthApp.init();\n      }\n    }, { once: true })\n  });\n}, { once: true });\n\n\n//# sourceURL=webpack:///./src/main.js?");

/***/ })

/******/ });