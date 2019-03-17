


// console.log('other.js');

function Person(name,age){ //类，构造函数
    //为对象添加属性
    this.name=name;
    this.age=age;
    }
    //为对象添加方法
    Person.prototype.showName=function(){
    console.log(this.name);
    }
    Person.prototype.showAge=function(){
    console.log(this.age);
    }
    
    //Work继承Person
    function Work(name,age){
        Person.apply(this,arguments); //子类继承父类的属性
        this.parent = 'person';
    }
    Work.prototype= new Person(); //子类继承父类的方法
    Work.prototype.constructor = Work;
    var p1=new Person('aaa',21);
    var w1=new Work('bbb',54);
    
    p1.showAge(); //21
    w1.showName(); //bbb
    console.log(w1.constructor);
    
    
   /*
   class Person{
    //为对象添加属性
    constructor(name='default',age=0){
    this.name=name;
    this.age=age;
    }
    //为对象添加方法
    showName(){
    console.log(this.name);
    }
    showAge(){
    console.log(this.age);
    }
    }
    //继承
    class Worker extends Person{ //这里即可实现子类的继承
    //继承之后，添加子类特有的属性
    constructor(name,age,job){
    super(name,age); //使用super()将父类的属性继承过来，同时添加子类自己的新属性。如果不加，这个constructor将会把从父类继承的constructor中的属性和方法覆盖，从而使子类没有继承name,age属性，而报错
    this.job=job;
    }
    //继承之后，添加子类特有的方法
    showJob(){
    console.log(this.job);
    }
    }
    var person1=new Person('小明',12);
    var person2=new Person('小李',51);
    var woker=new Worker('子类',32,'WEB工程师');
    console.log(person1.name);
    person1.showAge();
    person2.showName();
    console.log(person1.showAge==person2.showAge); //true
    woker.showName(); //子类
    woker.showAge();
    woker.showJob();
    console.log(person1.constructor,woker.constructor);
    */