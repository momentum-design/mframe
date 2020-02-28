import core from './core';

class Events {

  constructor () {
    this.Events = {};
  }

  bind(key, func) {
    if (func._$EventGuid === undefined) {
      func._$EventGuid = core.guid();
    }
    if (this.Events[key] === undefined) {
      this.Events[key] = {};
    }
    this.Events[key][func._$EventGuid] = func;
    return func._$EventGuid;
  }

  binds(json, base) {
    if (json) {
      let keys = Object.keys(json),
        key,
        newKey,
        hasBase = typeof base === 'number';
      for (let i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        newKey = hasBase && this.RegInt.test(key) ? base + key : key;
        this.bind(newKey, json[key]);
      }
    }
  }

  emit(key, args, caller) {
    const events = this.Events[key];
    if (events) {
      for (var funcGuid in events) {
        events[funcGuid].apply(caller, args);
      }
    }
  }

  // emit with one arg
  fire(key, args, caller) {
    const events = this.Events[key];
    if (events) {
      for (var funcGuid in events) {
        events[funcGuid].call(caller, args);
      }
    }
  }

  unbind(key, funcOrGuid) {
    if (this.Events[key]) {
      const guid = typeof funcOrGuid === 'string' ? funcOrGuid : funcOrGuid._$EventGuid;
      delete this.Events[key][guid];
    }
  }

}

Events.prototype.RegInt = /^[1-9]\d*$/;

export default Events;
