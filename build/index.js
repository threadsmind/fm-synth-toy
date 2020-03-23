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
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return SynthApp; });\n/* harmony import */ var _FMSynth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./FMSynth */ \"./src/FMSynth.js\");\n\r\n\r\nclass SynthApp {\r\n  constructor() {\r\n    this._init = false;\r\n    this._synth = null;\r\n    this._context = null;\r\n    this._error = false;\r\n  }\r\n\r\n  init() {\r\n    if (window.AudioContext || window.webkitAudioContext) {\r\n      this._context = new (window.AudioContext || window.webkitAudioContext);\r\n      this._synth = new _FMSynth__WEBPACK_IMPORTED_MODULE_0__[\"default\"](this._context);\r\n      this._synth.create();\r\n      this.buildInput();\r\n\r\n      this._init = true;\r\n      console.log('SynthToy ready!');\r\n    } else {\r\n      this._error = true;\r\n      console.log('SynthToy cannot start in this browser');\r\n    }\r\n  }\r\n\r\n  get isInit() {\r\n    return this._init;\r\n  }\r\n\r\n  buildInput() {\r\n    window.addEventListener('keydown', (e) => { this._synth.play() });\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/FMSynth.js":
/*!************************!*\
  !*** ./src/FMSynth.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return FMSynth; });\n/*\r\nTODO - what if we DID do the playv2 thing where oscs always play. Then when a note is played we set frequency and play the envelopes?\r\n\r\nTODO - live play\r\n*/\r\n\r\nclass FMSynth {\r\n  constructor(context) {\r\n    this._context = context;\r\n    this._output = null;\r\n    this._carrierGainEnvelope = null;\r\n    this._carrier = null;\r\n    this._modulator = null;\r\n    this._modulatorGainEnvelope = null;\r\n    this._basePitch = 55;\r\n  }\r\n\r\n  create() {\r\n    if (!this._context) {\r\n      console.log('synth error. no context');\r\n      return;\r\n    }\r\n    // output node\r\n    this._output = new GainNode(this._context, { gain: 0.7 });\r\n    this._output.connect(this._context.destination);\r\n    // carrier gain envelope\r\n    this._carrierGainEnvelope = new GainNode(this._context);\r\n    this._carrierGainEnvelope.connect(this._output);\r\n    this._carrierGainEnvelope.gain.setValueAtTime(0, this._context.currentTime);\r\n    // carrier osc\r\n    this._carrier = new OscillatorNode(this._context, { type: 'sine', frequency: this._basePitch, detune: Math.random() * 10 });\r\n    this._carrier.connect(this._carrierGainEnvelope);\r\n    this._carrier.start(this._context.currentTime);\r\n    // modulator gain envelope\r\n    this._modulatorGainEnvelope = new GainNode(this._context);\r\n    this._modulatorGainEnvelope.connect(this._carrier.frequency);\r\n    this._modulatorGainEnvelope.gain.setValueAtTime(0, this._context.currentTime);\r\n    //modulator osc\r\n    this._modulator = new OscillatorNode(this._context, { type: 'sine', frequency: this._basePitch * 3, detune: Math.random() * 10});\r\n    this._modulator.connect(this._modulatorGainEnvelope);\r\n    this._modulator.start(this._context.currentTime);\r\n  }\r\n\r\n  play(pitch) {\r\n    //randomize pitch for testing\r\n    pitch = (!pitch) ? (Math.random() * 1000) : pitch;\r\n    // set input / random pitch\r\n    this._carrier.frequency.linearRampToValueAtTime(pitch, this._context.currentTime + 0.01);\r\n    this._modulator.frequency.linearRampToValueAtTime(pitch * 3, this._context.currentTime + 0.01);\r\n    // carrier gain envelope\r\n    this._carrierGainEnvelope.gain.setValueAtTime(0, this._context.currentTime);\r\n    this._carrierGainEnvelope.gain.linearRampToValueAtTime(0.7, this._context.currentTime + 0.01);\r\n    this._carrierGainEnvelope.gain.linearRampToValueAtTime(0.4, this._context.currentTime + 0.12);\r\n    this._carrierGainEnvelope.gain.linearRampToValueAtTime(0.4, this._context.currentTime + 0.18);\r\n    this._carrierGainEnvelope.gain.linearRampToValueAtTime(0, this._context.currentTime + 0.20);\r\n    // modulator gain envelope\r\n    this._modulatorGainEnvelope.gain.setValueAtTime(0, this._context.currentTime);\r\n    this._modulatorGainEnvelope.gain.linearRampToValueAtTime(202, this._context.currentTime + 0.05);\r\n    this._modulatorGainEnvelope.gain.linearRampToValueAtTime(198, this._context.currentTime + 0.12);\r\n    this._modulatorGainEnvelope.gain.linearRampToValueAtTime(10, this._context.currentTime + 0.18);\r\n    this._modulatorGainEnvelope.gain.linearRampToValueAtTime(0, this._context.currentTime + 0.20);\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack:///./src/FMSynth.js?");

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