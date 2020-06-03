<!-- 
---
title: 差速动画
date: 2020/6/3 10:00:00
---
-->
# 差速动画

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

## 用法

通过speed创建的实例，可以动态地改变动画的速度。

#### 例子

```
var SpeedConfig = [0.5,2];
var motion = mframe.speed([{
  dom: document.getElementById('ball'),
  frames: [
    { css: { backgroundColor: '#279BE8' }, time: 0 },
    { css: { backgroundColor: '#E6F8FF' }, time: 120, tween:'easeInOut' },
  ],
  dom_events
}], global_events, SpeedConfig);
motion.play();
motion.speed(0.5);
```

## SpeedConfig

### 数组

SpeedConfig可以是一个浮点数数组，mframe会自动计算各个速度下的动画。

#### 例子

```
var SpeedConfig = [0.5,1,2]; // 1 will be ignore
```

### 对象

当你使用对象作为SpeedConfig时，key用来指定速度。value为true时，mframe会自动计算动画。当value值是对象或者数组时，value会被用来创建动画。

#### 例子

```
var SpeedConfig ={
	2: true,
	1: true,
	'0.5': [{
		dom: b2,
		frames: [
			{ time: 0, css: { opacity: '1.0', border:'1px solid #ffff00' } },
			{ time: 50, css: { opacity: '0.0', border:'1px solid #000000'} }
		]
};

```

## 方法

### speed

切换速度。

```
motion.speed(2);
```

### play

播放动画。

```
motion.play();

```
### run

```
motion.run();
```

### stop

停止动画。

```
motion.stop();
```

### pause

暂停动画。

```
motion.pause();
```

### reverse

反转动画。

```
motion.reverse();
```

### repeat

重复动画。

```
motion.repeat(1);
```

### state

切换到指定一帧。

```
motion.state(10, true);
```
