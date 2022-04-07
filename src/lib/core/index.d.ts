import Timeline from './timeline';
import Events from '../utiliy/events';

export default class Motion {
    Timelines: Timeline[];
    LastFrame:number;
    _AnimationID:any;
    CurrentFrame:number;
    Repeat:number;
    Events:Events;
    constructor(configs:any, events?:Record<string, any>);
    add(configs:any,ifAppend?:boolean):Motion;
    append(configs:any):Motion;
    bind(key:string, func:any):Motion;
    run(startFrame?:number, endFrame?:number, resetStart?:boolean):Motion;
    state(i:number, isFromZeroToEnd?:boolean):void;
    render(i:number):void;
    reverse():Motion;
    repeat(repeat:number):Motion;
    play():Motion;
    stop():Motion;
    pause():Motion;
    isPlaying():boolean;
}