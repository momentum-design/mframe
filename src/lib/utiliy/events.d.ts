export default class Events {
    Events: Record<string, any>;
    RegInt:RegExp;
    bind(key:string, func:any):string;
    binds(json?: Record<string, any>, base?:any):void;
    emit(key:string, args?:any, caller?:any):void;
    fire(key:string, args?:any, caller?:any):void;
    unbind(key:string, funcOrGuid:any):void;
}