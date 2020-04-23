<!-- 
---
date: 2020/3/2 10:00:00
---
-->
# Spinner

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

In this section, we will teach you how to create a loading animation with mframe.

## Control more than one doms

In the atricle Just Start, you have already learn how to move a dom changes. You may already notice the fisrt argument in function mframe is an array. This enable you to control more than one doms.

<!--@<iframe height="400" style="width: 100%;" scrolling="no" title="Multiple Doms" src="https://codepen.io/arthusliang/embed/mdJWoGe?height=400&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/arthusliang/pen/mdJWoGe'>Multiple Doms</a> by Arthus
  (<a href='https://codepen.io/arthusliang'>@arthusliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>@-->

[Click here to try this demo online](https://codepen.io/arthusliang/details/mdJWoGe)

#### Code

```
var motion = mframe([{
  dom: document.getElementById('con'),
  frames: [
    { css: { transform: 'rotate(0deg)' }, time: 0 },
    { css: { transform: 'rotate(360deg)' }, time: 120, tween: 'easeInOut' },
  ]
},{
  dom: document.getElementById('ball'),
  frames: [
    { css: { transform: 'scale(0.4)', opacity: '0' }, time: 0 },
    { css: { opacity: '1.0' }, time: 40},
    { css: { transform: 'scale(1.5)', opacity: '1.0' }, tween: 'easeInOut', time: 100},
    { css: { opacity: '0' }, time: 120},
  ]
}]);
motion.repeat(Infinity);
```

### repeat

You can use repeat to setup how many times you want to play this animation.

### dom

You can also pause an array of dom here. Notice that mframe can only get the fisrt dom's attribution if you set up a null value.

## Make a spinner

Let's add more balls here. 

In this demo, you will control one container to rotate while control a ball to change its attribution.

<!--@<iframe height="500" style="width: 100%;" scrolling="no" title="loading" src="https://codepen.io/arthusliang/embed/poJeYXL?height=500&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/arthusliang/pen/poJeYXL'>loading</a> by Arthus
  (<a href='https://codepen.io/arthusliang'>@arthusliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>@-->

[Click here to try this demo online](https://codepen.io/arthusliang/pen/poJeYXL)

#### Code

```
var createMotionObject = function(id) {
  let delay = (id-1)*12;
  return [{
    dom: document.getElementById('con'+id),
    frames: [
      { css: { transform: 'rotate(0deg)' }, time: delay },
      { css: { transform: 'rotate(360deg)' }, time: 120 + delay, tween: 'easeInOut' },
    ]
  },{
    dom: document.getElementById('ball'+id),
    frames: [
      { css: { transform: 'scale(0.4)', opacity: '0' }, time: delay },
      { css: { opacity: '1.0' }, time: 40 + delay },
      { css: { transform: 'scale(1)', opacity: '1.0' }, tween: 'easeInOut', time: 100+ delay},
      { css: { opacity: '0' }, time: 120 + delay},
    ]
  }];
};

var args = createMotionObject(1).concat(createMotionObject(2)).concat(createMotionObject(3));
var motion = mframe(args);

motion.repeat(Infinity);
```
