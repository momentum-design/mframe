import Motion from '../core/index';

export default class Speed {
    CurrentSpeed:number;
    Mframes:Record<string|number, Motion>;
    constructor(config:any, events:Record<string, any>, x:any);
    x(x:any):void;
    xspeed(x:number):void;
    xconfig(config:any):void;
    current(val:any):number|void;
    currentMframe():Motion;
    speed(x:any):void;
    play():void;
    stop():void;
    pause():void;
    repeat():void;
    reverse():void;
    run():void;
    state():void;
} 