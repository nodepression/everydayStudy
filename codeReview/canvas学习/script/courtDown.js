var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;
var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
// var  endTime = new Date(2016,6,18,0,0,0);
// var endTime = new Date();
// endTime.setTime(endTime.getTime()+3600*1000)//1970到当前时间之后的一小时之间的毫秒数
var curShowTimeSeconds=0;

var balls = [];
var colors = ["#33b5e5","#0099cc","#aa66cc","#9933cc","#99cc00","#ffbb33","#ff8800","#ff4444","#cc0000","#33e5e5"];

window.onload = function(){
	WINDOW_WIDTH = document.documentElement.clientWidth*0.8;
	WINDOW_HEIGHT = document.documentElement.clientHeight*0.8;	

	MARGIN_LEFT =Math.round( WINDOW_WIDTH/10);
	RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);



	var canvas = document.getElementById("canvas");
	var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;


    curShowTimeSeconds = getCurrentShowTimeSeconds();
    //设置一个定时器,更新时间和小球状态,产生动画效果
    setInterval(
    	function(){
    	render(context);//绘制各种小球
    	update();//更新时间状态,弹跳球状态
        }
    	,50);
    
}

function getCurrentShowTimeSeconds(){ //得到当前毫秒数
	var curTime = new Date();
	// var ret = endTime.getTime()-curTime.getTime();
	// ret = Math.round(ret/1000);//转化为秒
	// return ret>=0?ret:0;
	var ret = curTime.getHours()*3600 + curTime.getMinutes()*60+curTime.getSeconds();
	return ret;
}

function update(){   //检测时间的变化和小球状态 并更新他们
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
    //变化后的时间
	var nexthours = parseInt(nextShowTimeSeconds/3600);
	var nextminites = parseInt((nextShowTimeSeconds-nexthours*3600)/60);
	var nextseconds = nextShowTimeSeconds%60;
    
    //变化前的时间
	var curhours = parseInt(curShowTimeSeconds/3600);
	var curminites = parseInt((curShowTimeSeconds-curhours*3600)/60);
	var curseconds = curShowTimeSeconds%60;

	if(nextseconds!=curseconds){ //判断时间是否变化(变化时间上的小球添加到数组中)
        if(parseInt(curhours/10)!=parseInt(nexthours/10)){
        	addBalls(MARGIN_LEFT,MARGIN_TOP,parseInt(curhours/10));
        }
        if(parseInt(curhours%10)!=parseInt(nexthours%10)){
        	addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curhours%10));
        }

        if(parseInt(curminites/10)!=parseInt(nextminites/10)){
        	addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curminites/10));
        }
        if(parseInt(curminites%10)!=parseInt(nextminites%10)){
        	addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curminites%10));
		}

        if(parseInt(curseconds/10)!=parseInt(nextseconds/10)){
        	addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curseconds/10));
        }
        if(parseInt(curseconds%10)!=parseInt(nextseconds%10)){
        	addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(curseconds%10));
        }

		curShowTimeSeconds=nextShowTimeSeconds; //更新时间
	}

	updateBalls();//更新小球状态
	console.log(balls.length);
}

//更新小球的状态
function updateBalls(){ 
	for( var i = 0;i<balls.length;i++){//让小球动起来
		balls[i].x+=balls[i].vx;
		balls[i].y+=balls[i].vy;
		balls[i].vy+=balls[i].g;
		//碰地检测
		if (balls[i].y>=WINDOW_HEIGHT-RADIUS) {
			balls[i].y = WINDOW_HEIGHT-RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
	}
	var ballsNum = 0;
	//删除溢出的小球
	for(var  i=0;i<balls.length;i++)
		if (balls[i].x+RADIUS>0&&balls[i].x-RADIUS<WINDOW_WIDTH) {
			balls[ballsNum++]=balls[i];
		}
	while(balls.length>Math.min(300,ballsNum)){
		balls.pop();
	}
}

//添加要掉落的小球到balls数组中(保存每个球的位置信息，颜色信息等) 当时间变化后调用
function addBalls(x,y,num){ 
	for(var i =0;i<digit[num].length;i++)//对某个数字的数组有多少行循环
		for(var j=0;j<digit[num][i].length;j++){//对某个数字的数组有多少列循环
			if (digit[num][i][j]==1) {
				var aBall = {
					x:x+j*2*(RADIUS+1)+(RADIUS+1),
					y:y+i*2*(RADIUS+1)+(RADIUS+1),
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall)
			}
		}
}

function render(ctx){  //绘制时钟和跳出来的小球
    
    ctx.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
    //得到当前时间的小时数,分钟数,秒数
	var hours = parseInt(curShowTimeSeconds/3600);
	var minites = parseInt((curShowTimeSeconds-hours*3600)/60);
	var seconds = curShowTimeSeconds%60;
    
    //绘制时钟上某一个具体的数字
	renderDigit(MARGIN_LEFT,MARGIN_TOP, parseInt(hours/10),ctx);
	renderDigit(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(hours%10),ctx);
	renderDigit(MARGIN_LEFT+30*(RADIUS+1),MARGIN_TOP,10,ctx);
	renderDigit(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(minites/10),ctx);
	renderDigit(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(minites%10),ctx);
	renderDigit(MARGIN_LEFT+69*(RADIUS+1),MARGIN_TOP,10,ctx);
    renderDigit(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(seconds/10),ctx);
	renderDigit(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(seconds%10),ctx);
    
    //绘制跳出来的小球
	for(var i =0;i<balls.length;i++){ //根据balls数组存的小球，将他们绘制出来
		ctx.fillStyle=balls[i].color;
		ctx.beginPath();
		ctx.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
		ctx.closePath();
		ctx.fill();
	}
}
//绘制时钟上某一个具体的数字
function renderDigit(x,y,num,ctx){
	ctx.fillStyle = "rgb(0,102,153)";
	for(var i =0;i<digit[num].length;i++)//对某个数字的数组有多少行循环
		for(var j=0;j<digit[num][i].length;j++){//对某个数字的数组有多少列循环
			if (digit[num][i][j]==1) {
				ctx.beginPath();
				ctx.arc(x+j*2*(RADIUS+1),y+i*2*(RADIUS+1),RADIUS,0,2*Math.PI);
				ctx.closePath();
				ctx.fill();
			}
		}
}