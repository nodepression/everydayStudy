function Stack(){
	//各种属性和方法的声明
	var items = [];
	this.push =function(element){
		items.push(element);//添加元素到栈顶
	}
	this.pop = function(){
		return items.pop();//删除栈顶元素且返回该元素
	}
	this.peek = function(){
		return items[items.length-1];//返回栈顶元素
	}
	this.isEmpty = function(){
		return items.length == 0;//判断是否为空栈
	}
	this.size = function(){
		return items.length;//返归栈的大小
	}
	this.clear = function(){
		items = [];//删除栈里所有元素
	}
	this.print = function(){
		console.log(items.toString());
	}
}
var stack = new Stack();
console.log(stack.isEmpty());//true
stack.push(5);
stack.push(8);
console.log(stack.peek());//8
stack.push(11);
console.log(stack.size());//3
console.log(stack.isEmpty());//false
stack.push(15);
stack.pop();
stack.pop();
console.log(stack.size());//2
stack.print();//5,8

function divideBy2(decNumber){
	var remStack = new Stack();//余数remainder
    var rem,
        binaryString = "";
    while (decNumber>0){
    	rem = Math.floor(decNumber%2);
    	remStack.push(rem);
    	decNumber = Math.floor(decNumber / 2);
    }
    while(!remStack.isEmpty()){
    	binaryString+=remStack.pop().toString();
    }
    return binaryString;
}
function baseConverter(decNumber,base){
	var remStack = new Stack(),
	    rem,
	    baseString = "",
	    digits  = "0123456789ABCDEF";
	while(decNumber>0){
		rem = Math.floor(decNumber%base);
		remStack.push(rem);
		decNumber = Math.floor(decNumber/base);
	}
	while(!remStack.isEmpty()){
		baseString += digits[remStack.pop()];//满足16进制的情况
	}

	return baseString;
}