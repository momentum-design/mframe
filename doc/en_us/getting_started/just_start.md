<!-- 
---
date: 2020/3/1 10:00:00
---
-->
# Just Start

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

## Usage

### Install

Install and manage the mframe using NPM. You may use yarn or npm.

```npm install mframe --save```

or

```yarn add mframe```

### Link

You can also use mframe via script tag. Get [mframe.js](https://github.com/momentum-design/mframe/blob/master/bundles/mframe.js) here.

```<script type="text/javascript" src='mframe.js'></script>```


## Css animation

We will let you start with a very easy demo. In this demo, you will learn how to change dom's css.

<!--@<iframe height="300" style="width: 100%;" scrolling="no" title="Motion Start" src="https://codepen.io/arthusliang/embed/WNvpmoG?height=300&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/arthusliang/pen/WNvpmoG'>Motion Start</a> by Arthus
  (<a href='https://codepen.io/arthusliang'>@arthusliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>@-->

#### HTML

```
<body>
  <div id='ball' class='ball'></div>
</body>
```

#### CSS

```
.ball {
  position: absolute;
  border-radius: 50%;
  background-color: #279BE8;
  width: 50px;
  height: 50px;
  display:block;
}
```

#### JAVASCRIPT

```
var motion = mframe([{
  dom: document.getElementById('ball'),
  frames: [
    { css: { backgroundColor: '#07C1F5', transform: 'scale(1.0)' }, time: 0 },
    { css: { backgroundColor: '#00CF64', transform: 'scale(1.1)' }, time: 30, tween:'easeIn'},
    { css: { backgroundColor: '#FC9D03', transform: 'scale(1.0)' }, time: 60, tween:'easeOut' },
    { css: { backgroundColor: '#FF9580', transform: 'scale(0.9)' }, time: 90, tween:'easeInOut' },
    { css: { backgroundColor: '#07C1F5', transform: 'scale(1.0)' }, time: 120, tween:'easeIn' }
  ]
}]);
motion.repeat(Infinity);
```

[Click here to try this demo online](https://codepen.io/arthusliang/pen/WNvpmoG)

## mframe

All the operation in mframe starting with creating an instance of motion object. The most importthing you need to do is to set up key frame status in frames. Then our lib will generator the motion automatically.


## Set multiple css attribution

It is also easy to control multiple attribution at the some time. Let's keep us the Css and Html and just do some small updates in Javascript. 

<!--@<iframe height="300" style="width: 100%;" scrolling="no" title="Multiple Props" src="https://codepen.io/arthusliang/embed/RwPpdpX?height=300&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/arthusliang/pen/RwPpdpX'>Multiple Props</a> by Arthus
  (<a href='https://codepen.io/arthusliang'>@arthusliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>@--->

#### JAVASCRIPT

```
var motion = mframe([{
  dom: document.getElementById('ball'),
  frames: [
    { css: { backgroundColor: '#07C1F5', transform: 'scale(1.0)' }, time: 0 },
    { css: { backgroundColor: '#00CF64', transform: 'scale(1.1)' }, time: 30, tween:'easeIn'},
    { css: { backgroundColor: '#FC9D03', transform: 'scale(1.0)' }, time: 60, tween:'easeOut' },
    { css: { backgroundColor: '#FF9580', transform: 'scale(0.9)' }, time: 90, tween:'easeInOut' },
    { css: { backgroundColor: '#07C1F5', transform: 'scale(1.0)' }, time: 120, tween:'easeIn' }
  ]
}]);
motion.repeat(Infinity);
```

[Click here to try this demo online](https://codepen.io/arthusliang/pen/RwPpdpX)

## frames rule

+ If you set up the value to null, mframe will try to get the value of this attribute automatically. If it fails, mframe will ignore this attribution.

+ If you set up one attribution more the twice at the same frame time, the later one will overwrite the one before.

+ Each attribution will create its own time line. If you have 2 attributions with different tween at a same time, you can setup 2 attributions independently.

+ The time unit is based on frame, not million seconds.

