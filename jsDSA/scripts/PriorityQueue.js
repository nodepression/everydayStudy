function PriorityQueue(){//优先级队列
	var items = [];
	function QueueElement(element,priority){//队列元素类
		this.element = element;
		this.priority = priority;
	}
	this.enqueue = function(element,priority){
		var queueElement = new QueueElement(element,priority);
		if (this.isEmpty()) {
			items.push(queueElement);
		}else{
			var added = false;
			for(var i = 0;i<items.length;i++){
				if(queueElement.priority>items[i].priority){
					items.splice(i,0,queueElement);//把优先级大的放在前面
					added = true;
					break;
				}
			}
			if (!added) {//新加的元素的优先级最小
				items.push(queueElement);
			}
		}
	};
	this.dequeue = function(){
		return items.shift();//移除队列的第一项
	}
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
		for(var i = 0;i<items.length;i++){
		   console.log("当前队列" + items[i].element.toString()+":"+ items[i].priority.toString());
		}
	}
}
var priorityQueue = new PriorityQueue();
priorityQueue.enqueue("John", 2);
priorityQueue.enqueue("Jack", 1);
priorityQueue.enqueue("Camila", 1);
priorityQueue.print();