// 所谓的的事务就是在一个函数执行前后做一些事
// 可以称为切片编程

class Transaction{
    constructor(wrappers){
        this.wrappers = wrappers;
    }
    perform(anyMethod){
        this.wrappers.forEach(wrapper=>wrapper.init());
        anyMethod();
        this.wrappers.forEach(wrapper=>wrapper.close());
    }
}

let transaction = new Transaction([
    {
        init(){
        console.log("init1");
        },
        close(){
            console.log('close1');
        }
    },{
        init(){
        console.log("init2");
        },
        close(){
            console.log('close2');
        }
    }
]);
transaction.perform(function(){
    console.log('anyMethod');
})

// init1
// init2
// anyMethod
// close1
// close2