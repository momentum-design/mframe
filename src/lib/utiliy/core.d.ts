interface ICore {
    guid:()=>string;
    access:(elem:any, key:any, value:any, fn:any)=>void;
    each:(elem:any, funcName:string|number, args:any)=>void;
    toArray:(obj:any)=>any[];
    isArray:(obj:any)=>boolean;
    int:(num:any, def?:any)=>number;
    isInt:(obj:any)=>boolean;
}

declare const Core: ICore;
export default Core;