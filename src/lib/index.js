import Motion from './core/index';

let registerWindow = (name, func)=> {
    if (typeof window !== 'undefined' && window[name] === undefined) {
        window[name] = func;
    }
};

registerWindow('MM', Motion);
registerWindow('MomentumMotion', Motion);

export default Motion;