import Core from '../utiliy/core'

const attr = {
    _set: function (dom, key, val) {
        dom.setAttribute(key, val);
    },
    set: function (dom, key, val) {
        Core.access(dom, key, val, this._set);
    },
    _get: function (dom, key) {
        return dom.getAttribute(key);
    },
    get: function (dom, key) {
        return this._get(typeof dom.length === 'number' ? dom[0] : dom, key);
    }
}

export default attr;