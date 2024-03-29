// 检测是不是一个纯对象
function isPlainObject(obj){
    if(typeof obj !='object' || obj ===null){
        return false;
    }
    let proto = obj;
    while(Object.getPrototypeOf(proto)){
        proto = Object.getPrototypeOf(proto);
    }
    return Object.getPrototypeOf(obj) === proto;
}
export default isPlainObject