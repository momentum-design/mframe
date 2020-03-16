import Core from '../utiliy/core';
var prop = {
    _set: function (dom, key, val) {
        dom[key] = val;
    },
    set: function (dom, key, val) {
        Core.access(dom, key, val, this._set);
    },
    _get: function (dom, key) {
        return dom[key];
    },
    get: function (dom, key) {
        return this._get(typeof dom.length === 'number' ? dom[0] : dom, key);
    }
}

export default prop;