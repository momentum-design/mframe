import Motion from './core/index';
import Cpu from'./cpu/index';
import Speed from './speed/index';
import Tween from'./math/tween';

var MFrame = function(configs, events) {
    return new Motion(configs, events);
};

MFrame.Cpu = Cpu;
MFrame.Tween = Tween;
MFrame.speed = function(configs, events, x) {
    return new Speed(configs, events, x);
};

var registerWindow = function(name, func) {
    if (typeof window !== 'undefined' && window[name] === undefined) {
        window[name] = func;
    }
};

registerWindow('mf', MFrame);
registerWindow('mframe', MFrame);

export default MFrame;