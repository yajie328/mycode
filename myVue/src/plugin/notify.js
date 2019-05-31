import modal from "./notify.vue";
let notify = {}; // 在次对象上有一个install方法
notify.install = function(Vue,options={delay:3000}){
    console.log(Vue, options);
    // 给实例上添加方法
    Vue.prototype.$notify = function(message, opt={}){
        if(notify.el) return;
        options = {...options, ...opt};
        
        let V = Vue.extend(modal); // 返回的是一个构造函数的子类, 参数是包含组件选项的对象
        let vm = new V; // vm 是notify的实例
        let oDiv = document.createElement('div');
        vm.$mount(oDiv);
        vm.value = message;
        document.body.appendChild(vm.$el); // 把当前的实例放到页面上
        notify.el = vm.$el;
        setTimeout(()=>{
            document.body.removeChild(vm.$el);
            notify.el = null;
        }, options.delay)

    }
}
export default notify;