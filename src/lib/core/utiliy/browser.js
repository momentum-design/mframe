const Browser = {
    _regConfig : {
        Chrome: {
            Reg: /.*(chrome)\/([\w.]+).*/,
            Core: "webkit",
            CssPrefixes: "Webkit"
        },
        Firefox: {
            Reg: /.*(firefox)\/([\w.]+).*/,
            Core: "moz",
            CssPrefixes: "Moz",
        },
        Opera: {
            Reg: /(opera).+version\/([\w.]+)/,
            Core: "o",
            CssPrefixes: 'O',
        },
        Safari: {
            Reg: /.*version\/([\w.]+).*(safari).*/,
            Core: "webkit",
            CssPrefixes: 'Webkit',
        },
        /*
        Microsoft Edge userAgent 2bd
        */
        IE: {
            Reg: /.*(msie) ([\w.]+).*/,
            Core: "ms",
            CssPrefixes: 'ms',
        }
    },
    _userAgent: navigator.userAgent.toLowerCase(),
    init: function() {
        let _regConfig = this._regConfig,
            _userAgent = this._userAgent;
        for (let _o in _regConfig) {
            let _result = _regConfig[_o].Reg.exec(_userAgent);
            if (_result != null) {
                this.Name = _result[1];
                this.Version = _result[2];
                this.Prefix = _regConfig[_o].Core;
                this.CssPrefixes = _regConfig[_o].CssPrefixes;
            }
        }
        //mobile
        this.IsIPhone = /iphone/.test(_userAgent);
        this.IsWP8 = /windows phone/.test(_userAgent);
        this.IsIE9 = /msie 9.0/.test(_userAgent);
        this.IsMobile = /mobile/.test(_userAgent);
        this.IsWP8QQ = /msie 9.0/.test(_userAgent) && /mobile/.test(_userAgent);
    },
    upper1st: function(name) {
        return name.charAt(0).toUpperCase() + name.slice(1);
    },
    compatibilit: function(root, name, func, specialName) {
        root[name] = root[specialName] || root[name] || root[me.Prefix + this.upper1st(name)] || func;
    }
};

Browser.init();

export default Browser;
