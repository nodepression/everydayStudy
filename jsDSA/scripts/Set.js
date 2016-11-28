function Set(){ //集合
	var items = {};
	// this.has = function(value){
	// 	return value in items;
	// };
	this.has = function(value){
		return items.hasOwnProperty(value);//所有JavaScript对象都有hasOwnProperty方法。
		//这个方法返回一个表明对象是否具有特定属 性的布尔值。 
	};
	this.add = function(value){
		if(!this.has(value)){
			items[value] = value;
		}
		return false;
	};
	this.remove = function(value){
		if(this.has(value)){
			delete items[value];
			return true;
		}
		return false;
	};
	this.clear = function(){
		items = {};
	};
	this.size = function(){
		return Object.keys(items).length;
	};
	this.values = function(){//提取items对象的所有对象
		return Object.keys(items);
	};
    this.union = function(otherSet){
    	var unionSet = new Set();
        var values = this.values();
        for(var i = 0;i<values.length;i++){
        	unionSet.add(values[i]);
        }
    	values = otherSet.values();
    	for(var i = 0;i<values.length;i++){
    		unionSet.add(values[i])
    	}
    	return unionSet;
    }
    this.interSection = function(otherSet){
    	var interSectionSet = new Set();
    	var values = this.values();
    	for(var i = 0;i<values.length;i++){
    		if(otherSet.has(values[i])){
    			interSectionSet.add(values[i]);
    		}
    	}

    	return interSectionSet;
    }
    this.difference = function(otherSet){
    	var differenceSet = new Set();
    	var values = this.values();
    	for(var i = 0;i<values.length;i++){
    		if(!otherSet.has(values[i])){
    			differenceSet.add(values[i]);
    		}
    	}
    	return differenceSet;
    };
    this.subSet = function(otherSet){ //验证当前集合是不是某个集合的子集
    	if(this.size() > otherSet.size()){
    		return false;
    	}else{
    		var values = this.values();
    		for(var i = 0; i<values.length;i++){
    			if(!otherSet.has(values[i])){
    				return false;
    			}
    		}
    	}
    	return true;
    }
};

var setA = new Set();
setA.add(1);
setA.add(2);
var setB= new Set();
setB.add(2);
setB.add(3);
setB.add(4);
var unionAB = setA.union(setB);
var intersectionAB = setA.interSection(setB); 
var differenceAB = setA.difference(setB);
var intersectionAB_is_sunSet_of_unionAB = intersectionAB.subSet(unionAB);
