// import example from '../lib/symbol/example/index';
import './styles.scss';
import MM from  '../lib/core/index';
//import example from  '../lib/core/test';

window.onload = function() {
    //example();
    var step = 2;
    var generatorBallMotion = function(x0, t0, dom) {
		//r 28 68 28 
		return [{
			dom: dom,
			frames: [{
				attr: {
					fill: '#875AE0'
				},
				time: t0
			},{
				attr: {
					fill: '#C7A5FA'
				},
				time: t0 + 8 * step
			},{
				attr: {
					fill: '#875AE0'
				},
				time: t0 + 16 * step
			}]
		},{
			dom: dom,
			frames: [{
				attr: {
                    r:'14.0',
                    cx: x0
				},
				time: t0
			},{
				attr: {
					r:'28.0',
                    cx: x0 + 17
				},
				time: t0 + 8 * step
			},{
				attr: {
					r:'14.0',
                    cx: x0
				},
				time: t0 + 32 * step
			}]
		}];
	}

    var b1 = generatorBallMotion(136, 0, document.getElementById('c1')),
        b2 = generatorBallMotion(200, 8, document.getElementById('c2')),
        b3 = generatorBallMotion(264, 16, document.getElementById('c3'));

	var motion = new MM([{
        dom: document.getElementById('svgLoading'),
        frames: [{
            css: {
                transform: 'translateX(0px)'
            },
            time: 5 * step
        },{
            css: {
                transform: 'translateX(8px)'
            },
            time: 20 * step
        },{
            css: {
                transform: 'translateX(-8px)'
            },
            time: 35 * step
        },{
            css: {
                transform: 'translateX(0px)'
            },
            time: 50 * step
        }]
    }].concat(b1).concat(b2).concat(b3));
	console.log(motion);
	motion.play();
};
