import Motion from './core/index';
import Cpu from'./cpu/index';
import Speed from './speed/index';
import Tween from'./math/tween';

var mframe = function(configs, events) {
    return new Motion(configs, events);
};

mframe.Cpu = Cpu;
mframe.Tween = Tween;
mframe.speed = function(configs, events, x) {
    return new Speed(configs, events, x);
};

var registerWindow = function(name, func) {
    if (typeof window !== 'undefined' && window[name] === undefined) {
        window[name] = func;
    }
};

registerWindow('mf', mframe);
registerWindow('mframe', mframe);

export default mframe;