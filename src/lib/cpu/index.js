import css from './css';
import attr from './attr';
import prop from './prop';
import arg from './arg';

const Cpu = {
    Cores: {
        css,
        attr,
        prop,
        arg
    },
    install: function (name, core) {
        this.Cores[name] = core;
    },
    uninstall: function (name) {
        delete this.Cores[name];
    },
    createStorage: function () {
        let storage = {},
            names = Object.keys(this.Cores);
        for (let i = 0, l = names.length; i < l; i++) {
            storage[names[i]] = {}
        }
        return storage;
    },
    core: function (name) {
        return this.Cores[name];
    }
}

export default Cpu;