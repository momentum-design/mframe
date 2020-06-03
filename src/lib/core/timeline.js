import KeyFrames from './keyFrames';
import Events from'../utiliy/events';
import Cpu from '../cpu/index';

var Timeline = function(config, zeroFrame) {
    this.Dom = config.dom;
    this.Frames = config.frames;
    this.Storage = Cpu.createStorage();
    this.Events = new Events();
    this.Events.binds(config.events);
    this.ZeroFrame = zeroFrame || 0;
    this._scan();
};
Timeline.prototype = {
    _store: function(coreName, props, time, tween) {
        if (props === undefined) {
            return;
        }
        var storage = this.Storage[coreName],
            dom = this.Dom;
        for (var propName in props) {
            if (storage[propName] === undefined) {
                storage[propName] = new KeyFrames(dom, coreName, propName);
            }
            storage[propName].add(props[propName], time, tween);
        }
    },
    _scan: function() {
        var frames = this.Frames,
            storage = this.Storage,
            frame,
            tween,
            time,
            last = 0;
        for (var i = 0, l = frames.length; i < l; i++) {
            frame = frames[i];
            time = frame.time || 0;
            tween = frame.tween || 'linear';
            for (var coreName in storage) {
                this._store(coreName, frame[coreName], time, tween);
            }
            last = Math.max(time, last);
        }
        this.LastFrame = last;
        this._excuteStorage('preComplie');
    },
    getArgs: function(index) {
        var storage = this.Storage.arg,
            ret = {},
            val;
        for(var propName in storage) {
            val = storage[propName].Frames[index];
            if(val!== undefined) {
                ret[propName] = val;
            }
        }
        return ret;
    },
    state: function (i, isFromZeroToEnd) {
        let index;
        if(i< this.ZeroFrame) {
            if (!isFromZeroToEnd) {
                index = this.zeroFrame;
            }
        } else if (i>this.LastFrame) {
            if (isFromZeroToEnd) {
                index = this.LastFrame;
            }
        } else {
            index = i- this.ZeroFrame;
        }
        if (typeof index === 'number') {
            var endFrame = isFromZeroToEnd ? this.ZeroFrame : this.LastFrame;
            this._excuteStorage('state', [index, isFromZeroToEnd, endFrame]);
        }
    },
    render: function(i) {
        if (i>=this.ZeroFrame && i<= this.LastFrame) {
            let index = i- this.ZeroFrame;
            this.Events.emit('beforeEach',[index]);
            this._excuteStorage('render', [index]);
            this.Events.emit('each', [index, this.getArgs(index)]);
            this.Events.emit(index);
        }
    },
    _excuteStorage: function(funcName, args) {
        var storage = this.Storage,
            coreStorage;
        for(var n in storage) {
            coreStorage = storage[n];
            for(var m in coreStorage) {
                coreStorage[m][funcName].apply(coreStorage[m], args);
            }
        }
    },
    complie: function() {
        this._excuteStorage('complie');
    }
};

export default Timeline;