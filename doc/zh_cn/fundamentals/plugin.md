<!-- 
---
title: 插件
date: 2020/3/6 10:00:00
---
-->
# 插件

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

mframe允许开发人员创建自己的插件来强大它的功能。目前mframe接受渲染插件和缓动插件

## Cpu

Cpu模块在mframe中定义元素如何在渲染帧时设置属性

#### define

```
mframe.Cpu.install('yourOwnMode', {
    get: function(dom, key, val) {

    },
    set: function(dom, key) {

    }
});
```

+ 你可以自定义渲染引擎，就像css/attr/prop

+ Dom可以是一个Dom对象或者一组Dom对象数组

+ 值可以是方法或者null

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

你可以在mframe中使用如下代码自定义缓动公式

#### define

```
mframe.Tween.add('yourTweenName', function(t, b, c, d) {
    return 0;
});
```

+ t - 开始时间

+ b - 开始值

+ c - 变化值

+ d - 持续时间

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
