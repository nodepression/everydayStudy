function Queue(){//队列
	var items = [];
	this.enqueue = function(element){
		items.push(element);//向队列尾部添加新的项
	};
	this.dequeue = function(){
		return items.shift();//移除队列的第一项
	}
	//保持先进先出
	this.front = function(){
		return items[0];//返回队列最前面的项
	}
	this.isEmpty = function(){
		return items.length == 0;
	}
	this.size = function(){
		return items.length;
	}
	this.print = function(){
		console.log("当前队列" + items.toString());
	}
}
// var queue = new  Queue();
// console.log(queue.isEmpty());//true
// queue.enqueue("John");
// queue.enqueue("Jack");
// queue.enqueue("Camila");
// queue.print();
// console.log(queue.size()); //输出3 
// console.log(queue.isEmpty()); //输出false 
// queue.dequeue(); 
// queue.dequeue(); 
// queue.print(); 
function HotPotato(nameList,num){//循环对列-击鼓传花游戏,num每次传花次数
   var queue = new Queue();
   for(var i = 0;i<nameList.length;i++){
   	queue.enqueue(nameList[i]);
   }
   var eliminated = "";//淘汰
   while(queue.size()>1){
   	for(var i = 0;i<num;i++){
   		queue.enqueue(queue.dequeue());
   	}
   	eliminated = queue.dequeue();//队首的被淘汰(谁是队首就相当于花在谁手里)
   	console.log(eliminated+"在击鼓传花游戏中被淘汰。");
   }
   return queue.dequeue();//剩下的最后一个胜利
}
var names = ['John',"Jack","Camila","Ingrid",'Carl'];
var winner = HotPotato(names,7);
console.log("胜利者：" + winner);