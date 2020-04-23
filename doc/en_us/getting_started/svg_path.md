<!-- 
---
date: 2020/3/4 10:00:00
---
-->
# Svg path

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

This article will teach you how to create the animation for drawing path in Svg.

<!--@<iframe height="265" style="width: 100%;" scrolling="no" title="Svg" src="https://codepen.io/arthusliang/embed/GRJWadP?height=265&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/arthusliang/pen/GRJWadP'>Svg</a> by Arthus
  (<a href='https://codepen.io/arthusliang'>@arthusliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>@-->

[Click here to try this demo online](https://codepen.io/arthusliang/pen/GRJWadP)

#### Code

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

The 'attr' enables you to set up the attribution of dom.

### stroke-dasharray & stroke-dashoffset

We use svg's attribution to implement this feature, you can also explore more svg animation.
