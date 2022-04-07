import Motion from './core/index';
import  { ICpu, ITween }  from'./types';
import Speed from './speed/index';

declare class MFrame extends Motion {
    Cpu: ICpu;
    Speed:Speed;
    Tween: ITween;
}

export default function mframe(configs:any, events?:Record<string, any>):MFrame;