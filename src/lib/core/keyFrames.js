import Cpu from '../cpu/index';
import Color from '../math/color';
import Tween from '../math/tween';

var regStrNum = /(-?\d+)(\.\d+)?/;
var regStrHex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})/;
var regStrRgba = /^[rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}$/;

var KeyFrames = function(dom, core, Prop) {
    this.Keys = {}; // key frame
    this.Timing = [];
    this._LaterComplie = {};
    this.Frames = {};
    this.Dom = dom;
    this.CpuCore = Cpu.core(core);
    this.PropName = Prop;
};
KeyFrames.prototype = {
    RegList : [regStrHex, regStrRgba, regStrNum],
    Reg : /(#([0-9a-fA-F]{6}|[0-9a-fA-F]{3}))|(([rR][gG][Bb][Aa]?[\(]([\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),){2}[\s]*(2[0-4][0-9]|25[0-5]|[01]?[0-9][0-9]?),?[\s]*(0\.\d{1,2}|1|0)?[\)]{1}))|((-?\d+)(\.\d+)?)/g,
    RegFloat : /\./g,
    _sort: function(a, b) {
        return a - b;
    },
    add:function(value, time, tween) {
        if (this.Timing.indexOf(time) === -1) {
            this.Timing.push(time);
            this.Timing.sort(this._sort);
        }
        this.Keys[time] = {
            value: value,
            tween: tween
        };
    },
    complie: function() {
        var time1,
            time2,
            start,
            end,
            keys = this.Keys,
            timing = this.Timing;
        if (timing.length === 1) {
            this.Frames[timing[0]] = this.val(keys[timing[0]].value);
            return;
        }
        for (var index in this._LaterComplie) {
            time1 = timing[+index];
            time2 = timing[+index + 1];
            start = keys[time1];
            end = keys[time2];
            this._patch(time1, time2, this.val(start.value), this.val(end.value), end.tween);
        }
    },
    preComplie: function() {
        var timing = this.Timing,
            time1,
            time2,
            start,
            end,
            keys = this.Keys;
        this._LaterComplie = {};
        if (timing.length === 1) {
            var _val = keys[timing[0]].value;
            if (this._ifLaterComplie(_val)) {
                this._LaterComplie[0] = true;
            }
            this.Frames[timing[0]] = _val;
            return;
        }
        for (var i = 0, l = timing.length - 1; i < l; i++) {
            time1 = timing[i];
            time2 = timing[i + 1];
            start = keys[time1];
            end = keys[time2];
            if (this._ifLaterComplie(start.value) || this._ifLaterComplie(end.value)) {
                this._LaterComplie[i] = true;
            } else {
                this._patch(time1, time2, start.value, end.value, end.tween);
            }
        }
    },
    val:function(value) {
        if (typeof value === 'function') {
            return value();
        } else if (value === null) {
            return this.CpuCore.get(this.Dom, this.PropName);
        } else {
            return value;
        }
    },
    state: function(i, isFromZeroToEnd, endFrame) {
        if(isFromZeroToEnd) {
            while(i>=endFrame) {
                if(this.Frames[i] !== undefined) {
                    this.CpuCore.set(this.Dom, this.PropName, this.Frames[i]);
                    break;
                }
                i--;
            }
        } else {
            while(i<=endFrame) {
                if(this.Frames[i] !== undefined) {
                    this.CpuCore.set(this.Dom, this.PropName, this.Frames[i]);
                    break;
                }
                i++;
            }
        }
    },
    render:function(i) {
        if (this.Frames[i] !== undefined) {
            this.CpuCore.set(this.Dom, this.PropName, this.Frames[i]);
        }
    },
    _patch:function(time1, time2, val1, val2, tweenName) {
        var needConvert = typeof val1 === 'number' && typeof val2 === 'number',
            v1 = val1.toString(),
            v2 = val2.toString(),
            m1 = this._match(v1),
            m2 = this._match(v2),
            duration = time2 - time1,
            tween = Tween[tweenName] || Tween.linear;

        if (duration > 1 && val1 !== val2) {
            var analyzeItem = this._analyzeMatch(m1, m2);
            if (analyzeItem) {
                if (needConvert) {
                    for (var i = time1 + 1; i < time2; i++) {
                        this.Frames[i] = +this._patchProp(v1, analyzeItem, i - time1, duration, tween);
                    }
                } else {
                    for (var i = time1 + 1; i < time2; i++) {
                        this.Frames[i] = this._patchProp(v1, analyzeItem, i - time1, duration, tween);
                    }
                }
            }
        }

        this.Frames[time1] = val1;
        this.Frames[time2] = val2;
    },
    _number:function(val, needInt) {
        return needInt ? parseInt(val) : +val;
    },
    _patchProp:function(val, analyzeItem, currentTime, duration, tween) {
        var _start = analyzeItem.start,
            _end = analyzeItem.end,
            _int = analyzeItem.int,
            _number = this._number,
            index = 0;

        return val.replace(this.Reg, function (word) {
            var s = _start[index],
                e = _end[index],
                ret;
            if (typeof s === 'number') {
                ret = _number(tween(currentTime, +s, +e - s, duration), _int[index]);
                //color
            } else {
                var rgba = [];
                for (var i = 0, l = s.length; i < l; i++) {
                    var v = tween(currentTime, +s[i], +e[i] - s[i], duration);
                    rgba.push(i < 3 ? parseInt(v) : v);
                }
                ret = word[0] === '#' ? Color.toHex(rgba) : Color.toRgba(rgba);
            }
            index++;
            return ret;
        });
    },
    _analyzeMatch:function(m1, m2) {
        var typeLike1 = m1.typeLike,
            typeLike2 = m2.typeLike,
            match1 = m1.match,
            match2 = m2.match,
            l = typeLike1.length,
            ret = {
                start: [],
                end: [],
                int: []
            };
        if (l !== typeLike2.length || l === 0 || typeLike2.length === 0) {
            return false;
        }
        for (var i = 0; i < l; i++) {
            if (typeLike1[i] !== typeLike2[i]) {
                return false;
                // number
            } else if (typeLike1[i] === 1) {
                ret.start.push(+match1[i]);
                ret.end.push(+match2[i]);
                ret.int.push(this._needConvertInt(match1[i], match2[i]));
                // color
            } else {
                ret.start.push(Color.toRgbaArr(match1[i]));
                ret.end.push(Color.toRgbaArr(match2[i]));
                ret.int.push([true, true, true, false]);
            }
        }
        return ret;
    },
    _needConvertInt:function(s1, s2) {
        return !(this.RegFloat.test(s1) || this.RegFloat.test(s2));
    },
    /*
    {
        reg: [],
        type: [],
        typeLike: []
    }
    */
    _match:function(val) {
        var m = val.match(this.Reg) || [],
            type = [],
            typeLike = [];
        for (var i = 0; i < m.length; i++) {
            var _t = this._matchType(m[i]);
            type.push(_t); // 0 hex 1 rgba 2 number
            typeLike.push(_t === 2 ? 1 : 0); // 1 number 0 color
        }
        return {
            match: m,
            type: type,
            typeLike: typeLike
        }
    },
    _matchType:function(val) {
        var regList = this.RegList;
        for (var i = 0, l = regList.length; i < l; i++) {
            if (regList[i].test(val)) {
                return i;
            }
        }
        //return i;
    },
    _ifLaterComplie:function(value) {
        return typeof value === 'function' || value === null;
    }

};

export default KeyFrames;