
//提前载入好所需要的文件
function loadAllMusic(context){  
    var myArray=new Array();
    function loadSound1(url){   //载入音频文件
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            // 异步解码
            request.onload = function() {
                context.decodeAudioData(request.response, function(buffer) {
                    myArray[0] = buffer;//得到声音源
                });
            }
            request.send();
	};
	function loadSound2(url){    //载入音频文件
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            // 异步解码
            request.onload = function() {
                context.decodeAudioData(request.response, function(buffer) {
                    myArray[1] = buffer;//得到声音源
                });
            }
            request.send();
	};
	function loadSound3(url){    //载入音频文件
            var request = new XMLHttpRequest();
            request.open('GET', url, true);
            request.responseType = 'arraybuffer';
            // 异步解码
            request.onload = function() {
                context.decodeAudioData(request.response, function(buffer) {
                    myArray[2] = buffer;//得到声音源
                });
            }
            request.send();
	};
	loadSound1('songs/go.mp3');
	loadSound2('songs/here.mp3');
	loadSound3('songs/room.mp3');
	return myArray;
}



 //播放器类

function playControler(){   
	var context, //上下文环境
	    gainNode,  //增益节点
	    musicBuffer, //解码后的声音源
	    source,  //将解码后的声音源
	    // musicUrl, //音乐文件地址
	    musicNum, //当前所放歌曲在数组歌单中的索引
	    startTime,  //一首歌从暂停处开始播放的时间(这个时间是针对创建的上下文的), 一开始为0,没调用过pause函数();
	    pauseTime,  //一首歌暂停播放的时间(这个时间是针对创建的上下文的)
	    passTime, //记录一首歌开始播放时,整个context已经过去的时间（用于每新播放一首歌时);
	    timeValue,//记录每首歌已经播放的时间
	    timeInterval, //一段时间内暂停和相隔播放的时间
	    musiclist, //缓存好的歌单
	    Musicduration, //当前歌曲时长
	    currentBuffer, //当前歌曲的buffer
	    isOn;  //当前歌曲处于播放还是暂停
	context = new AudioContext();
    musiclist = loadAllMusic(context);
    musicNum = 0 ; //默认首先播放第一首歌
    this.getSource = function(buffer){
			source = context.createBufferSource();     // 创建一个声音源
			source.buffer = buffer;                    // 告诉该源播放何物
			source.connect(context.destination);

			gainNode = context.createGain();// 创建一个gain node
			source.connect(gainNode);// 自动将当前音源与gain node相连
			gainNode.connect(context.destination);// 将gain node与播放设备连接,一旦设定完成之后，你就可以通过改变值之后来控制音量了。
			gainNode.gain.value = -0.5;
	};
	this.playSound = function(){ //从新开始播放音乐
			this.getSource(musiclist[musicNum]);
			currentBuffer = musiclist[musicNum];
			Musicduration = currentBuffer.duration;

			timeInterval = 0 ;//从新开始一首歌时，时间间隔重置

    		source.start();  // 现在播放该实例
    		startTime = context.currentTime;
            passTime = context.currentTime;

    		source.loop = true;
    		isOn = true;

    		this.playSound = function(){
    			timeInterval = 0 ;
    			startTime = context.currentTime;
    			passTime = context.currentTime;
    			source.start();
    			source.loop = true;
    			isOn = true;
    		}
	};
	this.pause = function(){ //暂停播放
		   pauseTime = context.currentTime;
           timeInterval += pauseTime -startTime;
           source.stop();
           source.disconnect(gainNode);
    };
    this.replay = function(){  //继续播放
           this.getSource(musiclist[musicNum]);
		   currentBuffer = musiclist[musicNum];
		   Musicduration = currentBuffer.duration;

		   source.start(0,timeInterval);
		   startTime = context.currentTime;
    }
    this.newMusic = function(){  //播放另一首
            source.stop();
            source.disconnect(gainNode);
            this.playMenthod();

            this.getSource(musiclist[musicNum]);
            this.playSound();
    };



    this.orderNextPlay = function(){  //顺序播放（下一首）
            if(musicNum == 2){
            	musicNum = 0;
            }
            else{
            	musicNum++;
            }
            return musicNum;
    };

    this.orderPrePlay = function(){  //顺序播放（上一首）
            if(musicNum == 0){
            	musicNum = 2;
            }
            else{
            	musicNum--;
            }
            return musicNum;
    };

    this.singlePlay = function(){  // 单曲循环
           
    };
    
    this.randomPlay = function(){ //随机上一首或下一首
    	var randomNum = Math.floor(Math.random()*3) //返回 0 , 1 , 2 之间的一个数
    	musicNum = randomNum
    }
    this.returnMusicNum = function(){
    	return musicNum;
    }
    this.nextMusic = function(){  // 下一首,默认顺序下一首
        this.orderNextPlay()
    };
    this.preMusic = function(){  // 上一首,默认顺序上一首
        this.orderPrePlay()
    };

    this.playMenthod = function(){  //判断播放模式
    	this.nextMusic();  //默认顺序下一首
    };

    this.s_or_p = function(){   //判断是播放还是暂停
         if(isOn){
         	this.pause();
         	isOn = false;
         }else{
         	this.replay();
         	isOn = true;
         }
    }

	this.changeSound = function(soundvalue){
			gainNode.gain.value = soundvalue*1 - 1;
	};

	this.changeProgress = function(progressValue){
		    var restartTime = 0; //根据鼠标停止时的位置开始播放 
		    source.stop();
            source.disconnect(gainNode);
            this.getSource(musiclist[musicNum]);
		    currentBuffer = musiclist[musicNum];
		    Musicduration = currentBuffer.duration;
            
            restartTime = Musicduration*(progressValue/10);
		    source.start(0,restartTime);
            
		    startTime = restartTime + context.currentTime;
	}

	// this.returnValue = function(){
 //            timeValue = context.currentTime - passTime;
 //            return 10*(timeValue/Musicduration);
	// }
	this.increaseSound = function(){
			gainNode.gain.value = gainNode.gain.value + 0.1;
	};
	this.decreaseSound = function(){
			gainNode.gain.value = gainNode.gain.value - 0.1;
	};
	// this.returnCurrentTime = function(){  //测试函数
 //            console.log(context.currentTime);
	// };
	// this.source = function(){
	// 	return source;
	// }
 //    this.context = function(){
	// 	return context;
	// }
	// this.returnCurrenBuffer = function(){
 //           return currentBuffer;
	// };
}

function controle(){
	var s_or_p =document.getElementById("s_or_p");//播放暂停键
	var pre =document.getElementById("pre");  //上一首
	var next =document.getElementById("next"); //下一首
	var order =document.getElementById("order"); //顺序播放
	var random =document.getElementById("random"); // 随机播放
	var single =document.getElementById("single");  // 单曲循环
	var soundControle = document.getElementById("sound"); // 音量控制条
	var progressControle = document.getElementById("progress"); // 播放进程控制条
	var current = new playControler();  //创建一个播放器
	var musicname = document.getElementById('musicname');

    function showMusicname(){   //显示当前歌曲名
    	var num = current.returnMusicNum();
    	if (num==0) {
            musicname.innerHTML = "let Her Go";
    	}else if(num==1){
    		musicname.innerHTML = "I'm in here";
    	}
    	else{
    		musicname.innerHTML = "房间";
    	}
    }




	var isPlay = true;
	s_or_p.onclick = function(){ // 第一次点击时调用playSound();后面点击调用s_or_p();
		current.playSound();
		s_or_p.src = "images/pause1.png";
        showMusicname();
		s_or_p.onclick = function(){   
			current.s_or_p();
			showMusicname();
        	if(isPlay){
        		s_or_p.src = "images/start1.png";
        		isPlay = false;
        	}else{
            	s_or_p.src = "images/pause1.png";
        		isPlay = true;
        	}
	 	}
	}

	next.onclick = function(){  // 下一首
		current.playMenthod = function(){
			this.nextMusic();
		}
	current.newMusic();
	showMusicname();
	}

	pre.onclick = function(){  // 下一首
		current.playMenthod = function(){
			this.preMusic();
		}
		current.newMusic();
		showMusicname();
	}
	soundControle.onchange = function(){ // 音量改变
		current.changeSound(soundControle.value);
	}
	progressControle.onchange = function(){ // 进度条改变
		current.changeProgress(progressControle.value);
	}
	order.onclick = function(){
		current.nextMusic = function(){
			this.orderNextPlay();
		}
		current.preMusic = function(){
			this.orderPrePlay();
		}

		random.style.display = "block";
		order.style.display = "none";
	}

	random.onclick = function(){
		current.nextMusic = function(){
			this.randomPlay();
		}
		current.preMusic = function(){
			this.randomPlay();
		}

		random.style.display = "none";
		order.style.display = "block";
	}

};

window.onload = controle;

/* 
注：

等几秒再点播放
实现的功能：
可以切换歌曲
播放 暂停
拖动进度条调整音量
调整播放模式
拖动进度条调整进度

bug:
进度条还不能跟随播放进度显示
单独播放 暂停正常,单独拖动进度条调整进度正常,两者结合会出问题

*/