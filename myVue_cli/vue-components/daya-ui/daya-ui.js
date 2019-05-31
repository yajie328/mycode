import Vue from 'vue';
import MessageComponet from './Message.vue';
let getInstance = () => {
    // 把实例挂载到document上
    let vm = new Vue({
        name: 'messageParent',
        info: {
            a: 1
        },
        render: h => h(MessageComponet)
    }).$mount(); // 会在内存中进行挂载
    document.body.appendChild(vm.$el);

    // 获取儿子，就一个儿子
    let componet = vm.$children[0];
    return {
        add(options) {
            componet.add(options);
        }
    }
}

let instance;
let getInst = () => { // 单例模式 返回唯一个实例
    instance = instance || getInstance();
    return instance;
}
const Message = {
    info(options) {
        getInst().add(options)
    },
    warn() {},
    success() {},
    error() {}
}
export {
    Message
}
let _Vue;
export default { // 写插件的原理 要有一个install方法
    install(Vue, options) { // 第一个参数是Vue options是use的第二个参数
        if (!_Vue) { // 防止多次调用Vue
            _Vue = Vue;
            // console.log(Vue, options)
            let $message = {}
            Object.keys(Message).forEach(type => {
                $message[type] = Message[type]
            })
            Vue.prototype.$message = $message;
        }

        Vue.mixin({ //混合
            name: 'vuemixin',
            beforeCreate() { // 在所有的组件中都增加了这个
                console.log(this.$options.name)
                if (this.$options.info) {
                    // console.log('根')
                    this._info = this.$options.info
                } else {
                    this._info = this.$parent && this.$parent._info;
                    // console.log('不是根')
                }
            },
            mounted() {
                console.log(this._info)
            }
        })
    }
}