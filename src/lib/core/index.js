import Timeline from './timeline';
import Events from './utiliy/events';
import Core from './utiliy/core'

class Motion {

    /*
    configs: [{
        dom: 'id',
        frames: [{
            css: {
                width: function() {},
                height: '$'
            },
            time: 0
        }],
        events:{

        }}] 
    events: { 0 :()=>{}, end: ()=> {} , each:()=> {}}
    */

    constructor (configs, events) {
        this.Timelines = [];
        this.LastFrame = 0;
        this._AnimationID;
        this.CurrentFrame = 0;
        this.Repeat = 1;
        this.Events = new Events();
        this.Events.binds(events);
        this.add(configs);
    }

    add(configs, ifAppend) {
        let _configs = Core.isArray(configs) ? configs : [configs],
            lastFrame = 0,
            zeroFrame = ifAppend ? this.LastFrame : 0;
        for (let i = 0, l = _configs.length; i < l; i++) {
            let timeline = new Timeline(_configs[i], zeroFrame);
            this.Timelines.push(timeline);
            lastFrame = Math.max(lastFrame, timeline.LastFrame);
        }

        this.LastFrame = Math.max(this.LastFrame, lastFrame);
        return this;
    }

    append(configs) {
        this.add(configs, true);
        return this;
    }

    bind(key, func) {
        this.Events.bind(key, func);
        return this;
    }

    run(startFrame, endFrame) {

        if (this._AnimationID) {
            // or pause?
            return this;
        }

        let start = Core.int(startFrame, this.CurrentFrame),
            end = Core.int(endFrame, this.LastFrame),
            i = start,
            stepLength,
            ifGo;

        if (start <= end) {
            stepLength = 1;
            ifGo = () => { return i <= end; }
        } else {
            stepLength = -1;
            ifGo = () => { return i >= end; }
        }

        let _run = () => {
            this.Events.emit('start');
            if (ifGo()) {
                i += stepLength;
                this.render(i);
                this._AnimationID = requestAnimationFrame(_run);
            } else {
                this.Repeat--;
                if (this.Repeat == 0) {
                    this._AnimationID = null;
                    this.Events.emit('end');
                } else {
                    i = start;
                    this.render(i);
                    this._AnimationID = requestAnimationFrame(_run);
                }
            }
        }

        this._complie();

        _run();
        return this;
    }

    _complie() {
        Core.each(this.Timelines, 'complie');
    }

    render(i) {
        //render
        Core.each(this.Timelines, 'render', [i]);
        this.Events.emit('each', [i]);
        this.Events.emit(i);
        this.CurrentFrame = i;
    }

    reverse() {
        this.run(this.CurrentFrame > 0 ? this.CurrentFrame : this.LastFrame, 0);
        return this;
    }

    repeat(repeat) {
        this.Repeat = repeat;
        this.play();
    }

    play() {
        this.run();
        return this;
    }

    stop() {
        cancelRequestAnimationFrame(this._AnimationID);
        this._AnimationID = null;
        this.CurrentFrame = 0;
        this.emit('stop');
        return this;
    }

    pause() {
        cancelRequestAnimationFrame(this._AnimationID);
        this._AnimationID = null;
        this.emit('pause');
        return this;
    }

}

export default Motion;