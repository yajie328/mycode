// 观察者模式
class  Subject{
    constructor(name){
        this.name = name;
        this.state = '开心';
        this.arr = [];
    }

    attch(observer){
        this.arr.push(observer);
    }

    setState(newState){
        this.state = newState;
        this.arr.forEach(observer=>observer.update(newState,this.name));
    }

}

class Observe{
    constructor(name){
        this.name = name
    }
    update(newState,childName){
        console.log(this.name + "说" + childName+ newState);
    }
}
var child = new Subject('诺诺宝贝');
var father = new Observe('爸爸');
let mother = new Observe('妈妈');
child.attch(father);
child.attch(mother);
child.setState("大哭了");
child.setState('饿了');
