import KeyFrames from './keyFrames';
import Events from '../utiliy/events';
import Cpu from '../cpu/index';

class Timeline {

    constructor (config, zeroFrame) {
        this.Dom = config.dom;
        this.Frames = config.frames;
        this.Storage = Cpu.createStorage();
        this.Events = new Events();
        this.Events.binds(config.events);
        this.ZeroFrame = zeroFrame || 0;
        this._scan();
    }

    _store(coreName, props, time, tween) {
        if (props === undefined) {
            return;
        }
        let storage = this.Storage[coreName],
            dom = this.Dom;
        for (let propName in props) {
            if (storage[propName] === undefined) {
                storage[propName] = new KeyFrames(dom, coreName, propName);
            }
            storage[propName].add(props[propName], time, tween);
        }
    }

    _scan() {
        let frames = this.Frames,
            storage = this.Storage,
            frame,
            tween,
            time,
            last = 0;
        for (let i = 0, l = frames.length; i < l; i++) {
            frame = frames[i];
            time = frame.time || 0;
            tween = frame.tween || 'linear';
            for (let coreName in storage) {
                this._store(coreName, frame[coreName], time, tween);
            }
            last = Math.max(time, last);
        }
        this.LastFrame = last;
        this._excuteStorage('preComplie');
    }

    render(i) {
        if (i>=this.ZeroFrame && i<= this.LastFrame) {
            let index = i- this.ZeroFrame;
            this._excuteStorage('render', index);
            this.Events.emit('each',[index]);
            this.Events.emit(index);
        }
    }

    _excuteStorage(funcName, time) {
        let storage = this.Storage,
            coreStorage;
        for(let n in storage) {
            coreStorage = storage[n];
            for(let m in coreStorage) {
                coreStorage[m][funcName](time);
            }
        }
    }

    complie() {
        this._excuteStorage('complie');
    }

}
export default Timeline;