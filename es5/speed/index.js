"use strict";

require("core-js/modules/es.array.reverse");

require("core-js/modules/es.regexp.to-string");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _index = _interopRequireDefault(require("../core/index"));

var _core = _interopRequireDefault(require("../utiliy/core"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Speed = function Speed(config, events, x) {
  this._Config = _core.default.isArray(config) ? config : [config];
  this._Events = events;
  this._isFromeZero = true;
  this.Mframes = {
    '1': new _index.default(config, events)
  };
  this.CurrentSpeed = 1;
  this.x(x);
};

Speed.prototype = {
  x: function x(_x) {
    if (_core.default.isArray(_x) && _x.length > 0) {
      this.xspeed(_x);
    } else if (_x) {
      this.xconfig(_x);
    }
  },
  _xspeed: function _xspeed(speed) {
    var _config = this._Config,
        events = this._u_event(this._Events, speed),
        config = [];

    for (var i = 0, l = _config.length; i < l; i++) {
      config.push(this._u_config(_config[i], speed));
    }

    return new _index.default(config, events);
  },

  /*
  0.5 1 2
  */
  xspeed: function xspeed(x) {
    for (var i = 0, l = x.length; i < l; i++) {
      var speed = x[i];

      if (typeof speed === 'number' && speed !== 1) {
        this.Mframes[speed] = this._xspeed(speed);
      }
    }
  },

  /*
  {
      1: {},
      2: {},
      1.5: true
  }
  */
  xconfig: function xconfig(config) {
    var speed, val;

    for (var name in config) {
      speed = parseFloat(name);

      if (speed.toString !== 'NaN' && speed !== 1) {
        val = config[name];

        if (val === true) {
          this.Mframes[speed] = this._xspeed(speed);
        } else {
          this.Mframes[speed] = new _index.default(val, this._u_event(this._Events, speed));
        }
      }
    }
  },
  _u_time: function _u_time(key, base, speed) {
    return Math.ceil(key * speed / base);
  },
  _u_config: function _u_config(config, speed) {
    var ret = {},
        item;

    for (var name in config) {
      item = config[name];

      if (name === 'frames') {
        var _f = [];

        for (var i = 0, l = item.length; i < l; i++) {
          var _item = {};

          for (var name in item[i]) {
            _item[name] = item[i][name];
          }

          _item.time = this._u_time(_item.time, 1, speed);

          _f.push(_item);
        }

        ret.frames = _f;
      } else if (name === 'events') {
        ret.events = this._u_event(item, speed);
      } else {
        ret[name] = item;
      }
    }

    return ret;
  },
  _u_event: function _u_event(event, speed) {
    if (event) {
      var ret = {};

      for (var key in event) {
        if (_core.default.isInt(key)) {
          var n = this._u_time(parseInt(key), 1, speed);

          ret[n] = event[key];
        } else {
          ret[key] = event[key];
        }
      }

      return ret;
    } else {
      return event;
    }
  },
  current: function current(val) {
    if (typeof val === 'number') {
      this.CurrentSpeed = val;
    } else {
      return this.CurrentSpeed;
    }
  },
  currentMframe: function currentMframe() {
    return this.Mframes[this.CurrentSpeed];
  },
  speed: function speed(x) {
    if (typeof x === 'number' && x != this.current()) {
      if (this.Mframes[x] === undefined) {
        this.xspeed([x]);
      }

      var _pre = this.currentMframe(),
          _preFrame = _pre.CurrentFrame,
          _mframe = this.Mframes[x],
          _currentFrame = this._u_time(_preFrame, this.current(), x),
          _isPlaying = _pre.isPlaying();

      _pre.pause();

      _mframe.state(_currentFrame, this._isFromeZero);

      _mframe.Repeat = _pre.Repeat;

      if (_isPlaying) {
        _mframe.run(undefined, undefined, true);
      }

      this.current(x);
    }
  },
  play: function play() {
    var m = this.currentMframe();
    m.play.apply(m, arguments);
  },
  stop: function stop() {
    var m = this.currentMframe();
    m.stop.apply(m, arguments);
  },
  pause: function pause() {
    var m = this.currentMframe();
    m.pause.apply(m, arguments);
  },
  repeat: function repeat() {
    var m = this.currentMframe();
    m.repeat.apply(m, arguments);
  },
  reverse: function reverse() {
    var m = this.currentMframe();
    m.reverse.apply(m, arguments);
  },
  run: function run() {
    var m = this.currentMframe();
    m.run.apply(m, arguments);
  },
  state: function state() {
    var m = this.currentMframe();
    m.state.apply(m, arguments);
  }
};
var _default = Speed;
exports.default = _default;