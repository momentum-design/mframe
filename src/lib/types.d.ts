type easeFunc = (t:number,b:number,c:number,d:number)=>number;

export interface ITween {
    add: (name:string, func:any)=>void;
    linear: easeFunc;
    easeIn: easeFunc;
    easeOut: easeFunc;
    easeInOut: easeFunc;
    easeInCubic: easeFunc;
    easeOutCubic: easeFunc;
    easeInOutCubic: easeFunc;
    easeInQuart: easeFunc;
    easeOutQuart: easeFunc;
    easeInOutQuart: easeFunc;
    easeInQuint: easeFunc;
    easeOutQuint: easeFunc;
    easeInOutQuint: easeFunc;
    easeInSine: easeFunc;
    easeOutSine: easeFunc;
    easeInOutSine: easeFunc;
    easeInExpo: easeFunc;
    easeOutExpo: easeFunc;
    easeInOutExpo: easeFunc;
    easeInCirc: easeFunc;
    easeOutCirc: easeFunc;
    easeInOutCirc: easeFunc;
    easeInBounce: easeFunc;
    easeOutBounce: easeFunc;
    easeInOutBounce: easeFunc;
}

export interface ICpuCore {
    set:(dom:any, key:any, val:any)=>void;
    get:(dom:any, key:any)=>any;
}

export interface ICpu {
    Cores: Record<string, ICpuCore>;
    install: (name:string, core:ICpuCore)=>void;
    uninstall:(name:string)=>void;
    createStorage:()=>Record<string,any>;
    core: (name:string)=>ICpuCore;
}
