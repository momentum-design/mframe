interface IColor {
    RegNum:RegExp;
    toRgbaArr: (val:any)=>number[];
    toRgba:(rgbaArr:any[])=>string;
    toHex:(rgbaArr:any[])=>string;
    to16:(val:any)=>string;
}
declare const Color:IColor;
export default Color;