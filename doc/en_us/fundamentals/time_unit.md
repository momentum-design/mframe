<!-- 
---
date: 2020/3/3 10:00:00
---
-->
# Time unit

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

## real time

The mframe does not use seconds or million seconds as the time unit. We use frame which is higher efficiency and match the computer system better.

Frame also helps you have a better communication with designers. Just notice, normally there will be 60 frames in one second in browser. It means each frame will cost 1/60 second.

## append

The following code will make the same motion. If you use append, mframe will merge the arguments and update the time automatically.

#### set frame in one time

```
var motion = mframe([{
	dom: dom,
	frames: [
		{ css: { width: '0px' }, time: 0 },
		{ css: { width: '10px' }, time: 10 },
		{ css: { width: '20px' }, time: 20 }
	]
}]);
```

#### append frames

```
var motion = mframe([{
	dom: dom,
	frames: [
		{ css: { width: '0px' }, time: 0 },
		{ css: { width: '10px' }, time: 10 }
	]
}]);
motion.append([{
	dom: dom,
	frames: [
		{ css: { width: '10px' }, time: 0 },
		{ css: { width: '20px' }, time: 10 }
	]
}]);
```
