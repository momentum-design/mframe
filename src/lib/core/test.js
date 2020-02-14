import Motion from '../index';
export default () => {
    let ball = document.createElement('DIV'),
        con = document.getElementById('app');
    ball.className = 'ball';
    ball.id ='ball';
    con.appendChild(ball);
    console.log(con);
    let motion = new Motion([{
        dom: ball,
        frames: [{
            css: {
                width: '40px',
                height: '40px',
                'background-color': null
            },
            time: 0
        }, {
            css: {
                width: '100px',
                height: '100px',
                'background-color': '#00FF00'
            },
            time: 20,
            tween: 'easeIn'
        }],
        events: {
            each: function(i) {
                // console.log(i);
            }
        }
    }]);
    motion.play();
};