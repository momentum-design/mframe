<!-- 
---
title: Svg路径动画
date: 2020/3/4 10:00:00
---
-->
# Svg路径动画

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

这篇文章会告诉你如果构建Svg路径动画。

<!--@<iframe height="265" style="width: 100%;" scrolling="no" title="Svg" src="https://codepen.io/arthusliang/embed/GRJWadP?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/arthusliang/pen/GRJWadP'>Svg</a> by Arthus
  (<a href='https://codepen.io/arthusliang'>@arthusliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>@-->

[点击这里体验在线实例](https://codepen.io/arthusliang/pen/GRJWadP)

#### 代码

```
var motion = mframe([{
  dom: document.getElementById('momentum-logo'),
  frames: [
    { attr: { 'stroke-dashoffset': '600' }, time: 0 },
    { attr: { 'stroke-dashoffset': '0' }, time: 120, tween: 'easeInOut' },
    { attr: { 'stroke-dashoffset': '0' }, time: 150 },
  ]
}]);
motion.repeat(Infinity);
```

### attr

你可以通过attr改变dom的属性。

### stroke-dasharray & stroke-dashoffset

这里我们使用Svg的特效实现了描边动画效果，同理，你还可以通过mframe探索更多的效果。
