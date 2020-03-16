var Browser = {
    _regConfig : {
        Chrome: {
            Reg: /.*(chrome)\/([\w.]+).*/,
            CssPrefixes: "Webkit"
        },
        Firefox: {
            Reg: /.*(firefox)\/([\w.]+).*/,
            CssPrefixes: "Moz",
        },
        Opera: {
            Reg: /(opera).+version\/([\w.]+)/,
            CssPrefixes: 'O',
        },
        Safari: {
            Reg: /.*version\/([\w.]+).*(safari).*/,
            CssPrefixes: 'Webkit',
        },
        IE: {
            Reg: /.*(msie) ([\w.]+).*/,
            CssPrefixes: 'ms',
        }
    },
    CssPrefixes:'',
    init: function() {
        var _regConfig = this._regConfig,
            _userAgent = navigator.userAgent.toLowerCase();
        for (var _o in _regConfig) {
            var _result = _regConfig[_o].Reg.exec(_userAgent);
            if (_result != null) {
                this.CssPrefixes = _regConfig[_o].CssPrefixes;
                break;
            }
        }
    }
};

if(navigator && navigator.userAgent) {
    Browser.init();
}

export default Browser;
