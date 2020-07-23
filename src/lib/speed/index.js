import Motion from '../core/index';
import Core from '../utiliy/core';

var Speed = function(config, events, x) {
    this._Config = Core.isArray(config) ? config : [config];
    this._Events = events;
    this._isFromeZero = true;
    this.Mframes = {
        '1': new Motion(config, events)
    };
    this.CurrentSpeed = 1;
    this.x(x);
};

Speed.prototype = {
    x: function(x) {
        if (Core.isArray(x) && x.length > 0) {
            this.xspeed(x);
        } else if(x) {
            this.xconfig(x);
        }
    },
    _xspeed: function(speed) {
        var _config = this._Config,
            events = this._u_event(this._Events, speed),
            config=[];
        for (var i = 0, l = _config.length; i < l; i++) {
            config.push(this._u_config(_config[i], speed));
        }
        return new Motion(config, events);
    },
    /*
    0.5 1 2
    */
    xspeed: function(x) {
        for (var i = 0, l = x.length; i < l; i++) {
            var speed = x[i];
            if (typeof speed === 'number' && speed!==1) {
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
    xconfig: function(config) {
        var speed,
            val;
        for (var name in config) {
            speed = parseFloat(name);
            if (speed.toString!=='NaN' && speed!==1) {
                val = config[name];
                if (val === true) {
                    this.Mframes[speed] = this._xspeed(speed);
                } else {
                    this.Mframes[speed] = new Motion(val, this._u_event(this._Events, speed));
                }
            }
        }
    },
    _u_time: function(key, base, speed) {
        return Math.ceil(key*speed/base);
    },
    _u_config: function(config, speed) {
        var ret = {},
            item;
        for (var name in config) {
            item = config[name];
            if (name === 'frames') {
                var _f = [];
                for (var i = 0, l = item.length; i < l; i++) {
                    var _item = {};
                    for(var name in item[i]) {
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
    _u_event: function(event, speed) {
        if (event) {
            var ret={};
            for (var key in event) {
                if (Core.isInt(key)) {
                    var n = this._u_time(parseInt(key),1,speed);
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
    current: function(val) {
        if(typeof val === 'number') {
            this.CurrentSpeed = val;
        } else {
            return this.CurrentSpeed;
        }
    },
    currentMframe: function() {
        return this.Mframes[this.CurrentSpeed];
    },
    speed: function(x) {
        if(typeof x === 'number' && x!=this.current()) {
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
            if(_isPlaying) {
                _mframe.run(undefined, undefined, true);
            }
            this.current(x);
        }
    },
    play: function() {
        var m = this.currentMframe();
        m.play.apply(m, arguments);
    },
    stop: function() {
        var m = this.currentMframe();
        m.stop.apply(m, arguments);
    },
    pause: function()  {
        var m = this.currentMframe();
        m.pause.apply(m, arguments);
    },
    repeat: function() {
        var m = this.currentMframe();
        m.repeat.apply(m, arguments);
    },
    reverse: function()  {
        var m = this.currentMframe();
        m.reverse.apply(m, arguments);
    },
    run: function()  {
        var m = this.currentMframe();
        m.run.apply(m, arguments);
    },
    state: function()  {
        var m = this.currentMframe();
        m.state.apply(m, arguments);
    }
}

export default Speed;