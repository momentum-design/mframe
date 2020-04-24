<!-- 
---
title: 事件
date: 2020/3/5 10:00:00
---
-->
# 事件

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

## 用法

当你编写代码来制作动画，而不是直接使用动画素材时，你一定是想控制动画中地一些东西。非常幸运，mframe可以帮你控制动画中的每一帧。

在mframe中，你可以设置global_events和dom_events。

#### 例

```
var motion = mframe([{
  dom: document.getElementById('ball'),
  frames: [
    { css: { backgroundColor: '#279BE8' }, time: 0 },
    { css: { backgroundColor: '#E6F8FF' }, time: 120, tween:'easeInOut' },
  ],
  dom_events
}], global_events);
```

## global_events

以下示例展示了global_events所有可以设置的属性，并且按照调用的先后顺序排列。

#### 例

```
global_events = {
	start: function() {},
	beforeEach: function(frame_index) {},
	// dom_events 会在这个时候调用
	each: function(frame_index) {},
	'10': function() {},
	end: function() {},
	stop: function() {},
	pause: function() {}
};
```

+ start

	start事件会在动画最开始的时候被调用。

+ beforeEach

	beforeEach事件在每一帧渲染前被调用。

+ each

	each事件在每一帧渲染后被调用。

+ _number

	_number代表在某一帧触发的事件，它在each事件后被调用。	

+ end

	end事件在动画结束时被调用（repeat为0时）。

+ stop

	stop事件在mframe实例调用stop方法时被调用。

+ pause

	pause事件在mframe实例调用pause方法时被调用。

### bind

你也可以在mframe实例创建后绑定global_events。

#### 例

```
var motion = mframe([{
  dom: document.getElementById('ball'),
  frames: [
    { css: { backgroundColor: '#279BE8' }, time: 0 },
    { css: { backgroundColor: '#E6F8FF' }, time: 120},
  ]]);
motion.bind('stop', function() {});
```

## dom_events

以下示例展示了dom_events所有可以设置的属性，并且按照调用的先后顺序排列。 

#### 例

```
dom_events = {
	beforeEach: function(frame_index) {}
	each: function(frame_index, arg) {},
	'10': function() {}
};
```

+ beforeEach

	beforeEach事件在每一帧渲染前被调用。

+ each

	each事件在每一帧渲染后被调用。

+ _number

	_number代表在某一帧触发的事件，它在each事件后被调用。	

## 参数

以上展示的例子也展示了各个事件可以接收哪些参数

### frame_index

整数，代表当前帧的序数。

### arg

如果你在mframe对象中使用了arg(和css, attr, prop同级)， 它会创建其属性在每一帧的数值。

#### 例

```
var motion = mframe([{
  dom: ctx,
  frames:[
    { arg:{r:'60'}, time:0},
    { arg:{r:'63'}, time:3}
  ],
  events: {
    each: function(i, arg){
		console.log(i, arg);
		/* out put
			0, { r: 60 }
			1, { r: 61 }
			2, { r: 62 }
			3, { r: 63 }
		*/
    }
  }
}]);
```
