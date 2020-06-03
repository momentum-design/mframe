// import example from '../lib/symbol/example/index';
import './styles.scss';
import mframe from  '../lib/index.js';
//import example from  '../lib/core/test';

window.onload = function() {
    //example();

    var b2 = document.getElementById('app');
	var sp = [2,1,0.5];
	var m = mframe.speed([{
		dom: b2,
		frames: [
			{ time: 0, css: { opacity: '1.0' } },
			{ time: 100, css: { opacity: '0.0'} }
		]
	}], {
		each:function(i) {
			// console.log(i);
		}
	}, {
		2: true,
		1: true,
		'0.5': [{
			dom: b2,
			frames: [
				{ time: 0, css: { opacity: '1.0', border:'1px solid #ffff00' } },
				{ time: 50, css: { opacity: '0.0', border:'1px solid #000000'} }
			]
		}]
	});

	m.repeat(Infinity);

	var c = 1;
	window.addEventListener('click', function(){
		c++;
		if(c>2){
			c=0;
		}
		m.speed(sp[c]);
	});
	//m.repeat(Infinity);
};
