function HashTable1(){ //未处理冲突
	var table = [];
	// var table = {};
	var loseloseHashCode = function(key){//散列函数
		var hash = 0;
		for(var i = 0;i<key.length;i++){
			hash += key.charCodeAt(i);
		}
		return hash % 37;//为了得到一个较小的数值
	};
	this.put = function(key,value){
		var position = loseloseHashCode(key);
		console.log(position + "-" + key);
		table[position] = value;
	};
	this.get = function(key){
		var position = loseloseHashCode(key);
		return table[position];
	};
	this.remove = function(key){
		var position = loseloseHashCode(key);
		// delete table[position]; //不能这样做,因为元素可能分布
		//在表中的任何位置,删除位置会影响其他元素的地址
		table[position] = undefined; 
	};
	this.getTable = function(){
		return table;
	}
}
var hash = new HashTable1();
hash.put("China","中国");
hash.put("America","美国");
hash.put("Japan","日本");
console.log(hash.get('China'));
console.log(hash.get('Britain'));

//处理冲突版(线性探查)
function HashTable2(){ 
	var table = [];
	// var table = {};
	var loseloseHashCode = function(key){//散列函数
		var hash = 0;
		for(var i = 0;i<key.length;i++){
			hash += key.charCodeAt(i);
		}
		return hash % 37;//为了得到一个较小的数值
	};
	var ValuePair = function(key,value){
		this.key = key ;
		this.value = value;
		this.toString = function(){
			return '[' + this.key + '-' + this.value + ']';
		}
	};

	this.put = function(key,value){
		var position = loseloseHashCode(key);
		if(table[position] == undefined){
			table[position] = new ValuePair(key,value);
		}else{
			var index = ++ position;
			while(table[index]!=undefined){
				index++;
			}
			table[index] = new valuePair(key,value);
		}
	};

	this.get = function(key){
		var position = loseloseHashCode(key);
		if(table[position] !== undefined){
			if(table[position].key===key){
				return table[position].value;
			}else{
				var index = ++position;
				while(table[index]===undefined || table[index].key !== key){
					index ++;
				}
				if(table[index].key===key){
					return table[index].value;
				}
			}
		}
		return undefined;
	};
	this.remove = function(key){
		var position = loseloseHashCode(key);
		if(table[position] !== undefined){
			if(table[position].key===key){
				table[index] = undefined;
			}else{
				var index = ++position;
				while(table[index]===undefined||table[index.key!==key]){
					index ++;
				}
				if(table[index].key===key){
					table[index] = undefined;
				}
			}
		}
		return undefined;
	}
};

//处理冲突版(使用链表来存储同义词)
function HashTable3(){ 
	var table = [];
	// var table = {};
	var loseloseHashCode = function(key){//散列函数
		var hash = 0;
		for(var i = 0;i<key.length;i++){
			hash += key.charCodeAt(i);
		}
		return hash % 37;//为了得到一个较小的数值
	};
	//辅助类,用来表示将加入到linkedList实例的元素;
	var ValuePair = function(key,value){
		this.key = key ;
		this.value = value;
		this.toString = function(){
			return '[' + this.key + '-' + this.value + ']';
		}
	};

	this.put = function(key,value){
		var position = loseloseHashCode(key);
		if(table[position] == undefined){
			table[position] = new LinkedList();
		}
		table[position].append(new ValuePair(key,value));
		
	};

	this.get = function(key){
		var position = loseloseHashCode(key);
		if(table[position] !== undefined){
			var current = table[position].getHead();//得到存放目标值的链表
			while(current.next){
				if(current.element.key===key){
					return current.element.value;
				}
				current = current.next;
			}
			//检查元素在链表第一个或最后一个节点的情况
			//因为第一个元素和最后一个元素不会进入while循环内部
			if(current.element.key === key){
				return current.element.value;
			}
		}
		return undefined;
	};
	this.remove = function(key){
		var position = loseloseHashCode(key);

		if(table[position] != undefined){
			var current = table[position].getHead();
			while (current.next){
				if(current.element.key == key){
					table[position].remove(current.element);//current.element是前面定义的ValuePair的一个实例对象ta
					//注意table[position]是一个链表;
					if(table[position].isEmpty()){
						table[position] = undefined;
					}
					return true;
				}
				current =current.next;
			}
			//检查是否为第一个人或最后一个元素
			if(current.element.key == key){
				table[position].remove(current.element);
				if(table[position].isEmpty()){
						table[position] = undefined;
					}
				return true;
			}
			
		}

		return false;
	};
	this.getTable = function(){
		return table;
	}
};