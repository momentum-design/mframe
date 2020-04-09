import Timeline from './timeline';
import Events from '../utiliy/events';
import Core from '../utiliy/core';

var Motion = function (configs, events) {
    this.Timelines = [];
    this.LastFrame = 0;
    this._AnimationID;
    this.CurrentFrame = 0;
    this.Repeat = 1;
    this.Events = new Events();
    this.Events.binds(events);
    this.add(configs);
};
Motion.prototype = {
    add: function (configs, ifAppend) {
        var _configs = Core.isArray(configs) ? configs : [configs],
            lastFrame = 0,
            zeroFrame = ifAppend ? this.LastFrame : 0;
        for (var i = 0, l = _configs.length; i < l; i++) {
            var timeline = new Timeline(_configs[i], zeroFrame);
            this.Timelines.push(timeline);
            lastFrame = Math.max(lastFrame, timeline.LastFrame);
        }

        this.LastFrame = Math.max(this.LastFrame, lastFrame);
        return this;
    },
    append: function (configs) {
        this.add(configs, true);
        return this;
    },
    bind: function (key, func) {
        this.Events.bind(key, func);
        return this;
    },
    run: function (startFrame, endFrame) {

        if (this._AnimationID) {
            return this;
        }

        var start = Core.int(startFrame, this.CurrentFrame),
            end = Core.int(endFrame, this.LastFrame),
            i = start,
            stepLength,
            ifGo,
            me = this;

        if (start <= end) {
            stepLength = 1;
            ifGo = function () { return i <= end; };
        } else {
            stepLength = -1;
            ifGo = function () { return i >= end; };
        }

        var _run = function () {
            me.Events.emit('start');
            if (ifGo()) {
                me.render(i);
                me._AnimationID = requestAnimationFrame(_run);
                i += stepLength;
            } else {
                me.Repeat--;
                if (me.Repeat <= 0) {
                    me._AnimationID = null;
                    me.Events.emit('end');
                    me.Repeat =1;
                } else {
                    i = start;
                    me.render(i);
                    me._AnimationID = requestAnimationFrame(_run);
                }
            }
        }

        this._complie();

        _run();
        return this;
    },
    _complie: function() {
        Core.each(this.Timelines, 'complie');
    },
    render: function(i) {
        this.Events.emit('beforeEach', [i]);
        Core.each(this.Timelines, 'render', [i]);
        this.Events.emit('each', [i]);
        this.Events.emit(i);
        this.CurrentFrame = i;
    },
    reverse: function() {
        this.run(this.CurrentFrame > 0 ? this.CurrentFrame : this.LastFrame, 0);
        return this;
    },
    repeat: function(repeat) {
        this.Repeat = repeat;
        this.play();
    },
    play: function() {
        this.run();
        return this;
    },
    stop: function() {
        cancelAnimationFrame(this._AnimationID);
        this._AnimationID = null;
        this.CurrentFrame = 0;
        this.Events.emit('stop');
        return this;
    },
    pause: function() {
        cancelAnimationFrame(this._AnimationID);
        this._AnimationID = null;
        this.Events.emit('pause');
        return this;
    }
};

export default Motion;