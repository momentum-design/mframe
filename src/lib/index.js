import Motion from './core/index';

const MomentumMotion = function(configs, events) {
    return new Motion(configs, events);
};

MomentumMotion.reg = function() {
    
};

let registerWindow = (name, func)=> {
    if (typeof window !== 'undefined' && window[name] === undefined) {
        window[name] = func;
    }
};

registerWindow('MM', MomentumMotion);
registerWindow('MomentumMotion', MomentumMotion);

export default MomentumMotion;