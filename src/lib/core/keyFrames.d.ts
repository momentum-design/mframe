import { ICpuCore } from '../types';
export default class KeyFrames {
    Keys:Record<string|number, any>;
    Timing:any[];
    _LaterComplie:any;
    Frames:any;
    Dom:any;
    CpuCore:ICpuCore;
    PropName:string;
    RegList:RegExp[];
    Reg:RegExp;
    RegFloat:RegExp;
    constructor(dom:any, core:string, Prop:string);
    add(value:any, time:any, tween:any):void;
    complie():void;
    preComplie():void;
    val(value:any):any;
    state(i:number, isFromZeroToEnd:boolean, endFrame:number):void;
    render(i:number):void;
}