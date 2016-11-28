//字典
function Dictionary(){
	var items = {};
	this.has = function(key){
		return key in items;//判断key是否是itens对象的一个属性
	};
	this.set = function(key,value){
		items[key] = value;
	}
	this.remove = function(key){
		if(this.has(key)){
			delete items[key]; //删除对象的一个属性
			return true;
		}
		return false;
	};
	this.get = function(key){
		return this.has(key) ? items[key] : undefined;
	}
	//法以数组的形式返回字典中所有values实例的值
	this.values = function(){
		var values = [];
		for (var k in items){
			if(this.has(k)){//排除对象原型的属性
				values.push(items[k]);
			}
		}
		return values;
	}
	this.getItems = function(){//返回存数据的容器(字典)
		return items;
	}
	this.clear = function(){
		items = {};
	}
	this.size = function(){
		return Object.keys(items).length;
	}
	this.keys = function(){
		return Object.keys(items);//返回所有自定义的属性
	}
}

var dictionary = new Dictionary();
dictionary.set('Chian','中国');
dictionary.set('America','美国');
dictionary.set('Japan','日本');
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.getItems());
console.log(dictionary.has('America'));
console.log(dictionary.size());
dictionary.remove("Japan");
console.log(dictionary.keys());
console.log(dictionary.values());
console.log(dictionary.getItems());