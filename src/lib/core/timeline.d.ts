import Events from '../utiliy/events';

export default class Timeline {
    dom:any;
    Frames:any;
    Storage:Record<string,any>;
    Events:Events;
    ZeroFrame: number;
    constructor(config:any, zeroFrame:any);
    getArgs(index:number):Record<string,any>;
    state(i:number, isFromZeroToEnd?:boolean):void;
    render(i:number):void;
    complie():void;
}