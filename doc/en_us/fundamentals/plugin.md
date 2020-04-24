<!-- 
---
date: 2020/3/6 10:00:00
---
-->
# Plugin

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

The mframe enable you to develop plugins for the rendering engine and easing formular.

## Cpu

Cpu is a mode in mframe which defines how to update dom's properites when rendering. 

#### define

```
mframe.Cpu.install('yourOwnMode', {
    get: function(dom, key, val) {

    },
    set: function(dom, key) {

    }
});
```

+ You need set up get and set in your own cpu mode.

+ Dom could also be an array of doms.

+ The key could also be null and function.

#### usage

```
var motion = mframe([{
	dom: dom,
	frames: [
		{ time: 0, yourOwnMode: {} },
		{ time: 10, yourOwnMode: {} },
	]
}]);
```

## Tween

You can define the easing formula by the following code.

#### define

```
mframe.Tween.add('yourTweenName', function(t, b, c, d) {
    return 0;
});
```

+ t - current time

+ b - beginning value

+ c - change in value

+ d - duration

#### usage

```
var motion = mframe([{
	dom: dom,
	frames: [
		{ time: 0, css: { width: '0px'} },
		{ time: 10, css: { width: '10px'}, tween: 'yourTweenName' },
	]
}]);
```
