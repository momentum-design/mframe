interface IBrowserReg {
    Reg: RegExp;
    CssPrefixes: string;
}

interface IRegConfig {
    Chrome: IBrowserReg;
    Firefox: IBrowserReg;
    Opera: IBrowserReg;
    Safari: IBrowserReg;
    IE: IBrowserReg;
}

interface IBrowser {
    _regConfig:IRegConfig;
    CssPrefixes: string;
    init:()=>void;
}

declare const Browser: IBrowser;
export default Browser;