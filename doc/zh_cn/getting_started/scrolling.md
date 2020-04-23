<!-- 
---
title: 滚动条动画
date: 2020/3/3 10:00:00
---
-->
# 滚动条动画

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

很多情况下，我们需要建立滚动条动画。通过prop属性，我们可以轻松实现。

<!--@<iframe height="305" style="width: 100%;" scrolling="no" title="scroll" src="https://codepen.io/arthusliang/embed/poJemaj?height=305&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/arthusliang/pen/poJemaj'>scroll</a> by Arthus
  (<a href='https://codepen.io/arthusliang'>@arthusliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>@-->

[点击这里体验在线实例](https://codepen.io/arthusliang/pen/poJemaj)

#### 代码

```
var motion = mframe([{
  dom: document.getElementById('con'),
  frames: [
    { prop: { scrollTop: 0 }, time: 0 },
    { prop: { scrollTop: 600 }, time: 120, tween: 'easeInBounce' },
    { prop: { scrollTop: 0 }, time: 240, tween: 'easeOutBounce' }
  ]
}]);
motion.repeat(Infinity);
```

#### prop

我们在这里使用prop, 它等同时调用了```dom.scrollTop```

#### easeOutBounce

我们有更多缓动公式，在这里，我们尝试了bounce。
