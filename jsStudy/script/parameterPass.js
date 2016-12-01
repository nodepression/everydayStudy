/*
 在javascript里传递参数是按值传递的,不能函数是基本类型的还是引用类型的。
 1.基本类型,将栈区内变量的值传递给参数变量（复制变量的值）
 2.引用类型,还是将栈区内变量的值传递给参数变量(此时变量时引用变量名(如对象名）,栈区内的值保存的是引用类型的变量),而引用变量
   栈区内的值(即地址)所指向的内容存在堆区
 

 因为引用类型传参时复制的是地址,所以对参数的改变会改变存在堆区内的值（如对象，函数，数组）
*/


//基本类型
var a = 1;
var b = a;
b++;
console.log(a);//1
console.log(b);//2


//引用类型 test1

var obj1 = new Object();
obj1.name = "obj1 name";
console.log(obj1.name);// 运行结果：obj1 name
var obj2 = obj1;
console.log(obj2.name);// 运行结果：obj1 name
obj1.name = "haha";
console.log(obj2.name);// 运行结果：haha

//引用类型 test1

var f1 = function(){
    console.log("test:f1");
};
var f2 = function(){
    console.log("test:f2");
};
function fun(f){
    f();
    f = f2;
}

fun(f1);// 运行结果：test:f1
f1();// 运行结果：test:f1

//局部作用域里f = f2操作是将f在栈区的地址改为了f2的地址，对外部的f1和f2没有任何改变。