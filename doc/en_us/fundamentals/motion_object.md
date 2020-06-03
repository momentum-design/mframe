<!-- 
---
date: 2020/3/1 10:00:00
---
-->
# Motion Object

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

## Create motion object.

You can call mframe to create motion object directly.

```
var motion = mframe([{
  dom: document.getElementById('ball'),
  frames: [
    { css: { backgroundColor: '#279BE8' }, time: 0 },
    { css: { backgroundColor: '#E6F8FF' }, time: 120, tween:'easeInOut' },
  ],
  events: {
      0: ()=> {},
      'each': (index)=> {}
  }
}], events);
```
## Method

### add

The add function accepts the same arugment as the constructor's.

```
motion.add([{
  dom: document.getElementById('ball'),
  frames: [
    { css: { backgroundColor: '#279BE8' }, time: 0 },
    { css: { backgroundColor: '#E6F8FF' }, time: 120, tween:'easeInOut' },
  ],
  events: {
      0: ()=> {},
      'each': (index)=> {}
  }
}], events);
```

### append

The append function accepts the same arugment as the constructor's. The only different is the time zero will be the last frame in motion object.

```
motion.add([{
  dom: document.getElementById('ball'),
  frames: [
    { css: { backgroundColor: '#279BE8' }, time: 0 },
    { css: { backgroundColor: '#E6F8FF' }, time: 120, tween:'easeInOut' },
  ],
  events: {
      0: ()=> {},
      'each': (index)=> {}
  }
}], events);
```

### bind

The bind function enable you to bind events in a more flexible way.

```
motion.bind('start' , function() {});
```

### play

Start the animation from current frame index.

```
motion.play();
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

### run

```
motion.run();
```

#### arugments

+ start frame - default 0

+ end frame - default the last frame

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
