<!-- 
---
title: 立即开始
date: 2020/3/1 20:00:00
---
-->
# 立即开始

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

## 使用

### 安装

你可以使用yarn或者npm命令安装mframe。

```npm install mframe --save```

或者

```yarn add mframe```

### 引用

你也可以使用script标签引入mframe。在这里获取 [mframe.js](https://github.com/momentum-design/mframe/blob/master/bundles/mframe.js).

```<script type="text/javascript" src='mframe.js'></script>```

## Css 动画

让我们从一个简单的实例开始。通过以下代码，你会了解如何绘制简单的css动画。

<!--@<iframe height="300" scrolling="no" title="Motion Start" src="https://codepen.io/arthusliang/embed/WNvpmoG?height=300&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
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

[点击这里体验在线实例](https://codepen.io/arthusliang/pen/WNvpmoG)

## mframe

所有的动画都需要先构建mframe实例。你通过指定关键帧来创建动画，mframe会为你自动生成补间动画。


## 设置多个css属性

你可以同一设置css的多个属性。让我们保持css和html代码，修改以下javascript.

<!--@<iframe height="300" scrolling="no" title="Multiple Props" src="https://codepen.io/arthusliang/embed/RwPpdpX?height=300&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
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

[点击这里体验在线实例](https://codepen.io/arthusliang/pen/RwPpdpX)

## 帧规则

+ 如果你传入null为属性值，mframe会尝试获取该属性值。如果失败来，则忽略改属性。

+ 如果你设置来同一属性同一时间2次，后者有更高优先级。

+ 每一个属性都会在mframe中单独构建一个时间轴。如果你需要为同一时间中的不同属性设置不同的缓动公式，你可以通过两个关键帧对象实现。

+ 时间单位是帧，不是毫秒。

