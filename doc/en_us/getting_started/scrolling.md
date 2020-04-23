<!-- 
---
date: 2020/3/3 10:00:00
---
-->
# Scrolling

[![license](https://img.shields.io/github/license/momentum-design/momentum-ui.svg?color=blueviolet)](https://github.com/momentum-design/momentum-ui/blob/master/charts/LICENSE)

> mframe

In many suitations, we need make the animation for the scroll bar. The cpu module in mframe helps you implement different kinds of animation.

<!--@<iframe height="305" style="width: 100%;" scrolling="no" title="scroll" src="https://codepen.io/arthusliang/embed/poJemaj?height=305&theme-id=light&default-tab=result" frameborder="no" allowtransparency="true" allowfullscreen="true" loading="lazy">
  See the Pen <a href='https://codepen.io/arthusliang/pen/poJemaj'>scroll</a> by Arthus
  (<a href='https://codepen.io/arthusliang'>@arthusliang</a>) on <a href='https://codepen.io'>CodePen</a>.
</iframe>@-->

[Click here to try this demo online](https://codepen.io/arthusliang/pen/poJemaj)

#### code

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

As the code shows, we use 'prop' here to set the scrollTop. It works as ```dom.scrollTop```

#### easeOutBounce

Try another bounce tween here.