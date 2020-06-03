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

The speedConfig could be an array of number. Mframe will generate the instance automatically.

#### 例子

```
var SpeedConfig = [0.5,1,2]; // 1 will be ignore
```

### 对象

You can also define what you want in the motion with different speed. The key of speedConfig define the speed. If the value of one key is number, Mframe will generate the instance automatically.

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

## Method

### speed

Start the animation to a new speed.

```
motion.speed(2);
```

### play

Start the animation from current frame index.

```
motion.play();

```
### run

```
motion.run();
```

### stop

Stop the animation and setup the current frame index to 0.

```
motion.stop();
```

### pause

Pause the animation

```
motion.pause();
```

### reverse

Play the animtion from the last frame to the first frame.

```
motion.reverse();
```

### repeat

Repeat the animation the times you want.

```
motion.repeat(1);
```

### state

To set the motion to one frame. The second argument sets if the animation plays from the frame zero.

```
motion.state(10, true);
```
