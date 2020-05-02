// import example from '../lib/symbol/example/index';
import './styles.scss';
import mframe from  '../lib/index.js';
//import example from  '../lib/core/test';

window.onload = function() {
    //example();

    var b2 = document.getElementById('app');
		
	b2.style.display = 'none';

	var m = mframe([{
		dom: b2,
		frames: [
			{ time: 0, css: { opacity: '0.0', display: ()=> {
				return '';
			}}},
			{ time: 100, css: { opacity: '1.0'}}
		]
	}]);

	m.play();
	
};
