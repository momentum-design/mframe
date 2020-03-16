import css from'./css';
import attr from'./attr';
import prop from'./prop';
import arg from'./arg';

var Cpu = {
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
        var storage = {};
        for( var name in this.Cores) {
            storage[name] = {};
        }
        return storage;
    },
    core: function (name) {
        return this.Cores[name];
    }
}

export default Cpu;