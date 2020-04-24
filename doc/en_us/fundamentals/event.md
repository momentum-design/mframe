<!-- 
---
date: 2020/3/5 10:00:00
---
-->
# Event

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

## usage

When you code an animation instead of playing a video, there must be something you want to control. In mframe, you can bind events to every frame you want.

In mframe, you can set up global_events and dom_events.

#### example

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

You can set the following properties in global_events. The properties is sort by the time it will be called.

#### example

```
global_events = {
	start: function() {},
	beforeEach: function(frame_index) {},
	// dom_events will be called here
	each: function(frame_index) {},
	'10': function() {},
	end: function() {},
	stop: function() {},
	pause: function() {}
};
```

+ start

	The 'start' event will called at the very begining.

+ beforeEach

	The 'beforeEach' event will called before rendering each frame.

+ each

	The 'each' event will called after rendering each frame.

+ _number

	The _number presents in which frame that event will be called. It will be called just after 'each' be called.	

+ end

	The 'end' event  will called when the motion stops (no repeat any more).

+ stop

	The 'stop' event will called when the instance of mframe called its stop function.

+ pause

	The 'pause' event will called when the instance of mframe called its pause function.

## dom_events

You can set the following properties in dom_events. The properties is sort by the time it will be called. 

#### example

```
dom_events = {
	beforeEach: function(frame_index) {}
	each: function(frame_index, arg) {},
	'10': function() {}
};
```

+ beforeEach

	The 'beforeEach' event will called before rendering each frame.

+ each

	The 'each' event will called after rendering each frame.

+ _number

	The _number presents in which frame the event will be called. It will be called just after 'each' be called.	

## Arguments

The examples before also shows which arguments will be passed to each event.

### frame_index

A number refer to the current frame index.

### arg

If you set up the arg(same level as prop, attr, css) in frames, it will generate the value of properties in each frame. Then will be passed to 'each' in dom_events only.

#### example

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
