var Color = {
    RegNum: /(-?\d+)(\.\d+)?/g,
    toRgbaArr: function(val) {
        var r, g, b, a = 1;
        if (val[0] === '#') {
            var step = val.length === 4 ? 1 : 2;
            r = parseInt(val.slice(1, 1 + step), 16);
            g = parseInt(val.slice(1 + step, 1 + step * 2), 16);
            b = parseInt(val.slice(1 + step * 2, 1 + step * 3), 16);
        } else {
            var m = val.match(this.RegNum);
            r = +m[0];
            g = +m[1];
            b = +m[2];
            a = m.length > 3 ? +m[3] : 1;
        }
        return [r, g, b, a];
    },
    toRgba: function(rgbaArr) {
        return 'rgba(' + rgbaArr.join(',') + ')';
    },
    toHex: function(rgbaArr) {
        return '#' + this.to16(rgbaArr[0])
            + this.to16(rgbaArr[1])
            + this.to16(rgbaArr[2]);
    },
    to16: function(val) {
        var v = val.toString(16);
        return v.length===1 ? '0'+v : v;
    }
};
export default Color;