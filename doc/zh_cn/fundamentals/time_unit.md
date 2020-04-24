<!-- 
---
title: 时间单位
date: 2020/3/3 10:00:00
---
-->
# 时间单位

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

## 实际时间

mframe没有使用毫秒，秒这些自然时间单位。我们使用更加高效且贴合计算机计算原理的帧作为时间单位。

使用帧作为时间单位，还能使你和设计师能更好的沟通。通常在浏览器中1秒有60帧。

## 追加帧

以下代码实现了相同的动画。如果你使用append方法，mframe会自动更新time的值，合并参数。

#### 一次性设置动画

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

#### 追加帧到动画

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
