let vm = new Vue({
    el: "#app",
    data: {
        title:'',
        todos:[
            {isSelected:true, title:"吃饭"},
            {isSelected:true, title:"睡觉"},
            {isSelected:true, title:"打豆豆"}

        ],
        cur: '',
        flag: 'red',
        hash:''
    },
    created(){ // ajax获取 初始化数据
        // 如果localStorage有数据就用，没有就用原始的数据
        this.todos = JSON.parse(localStorage.getItem('data')) || this.todos;

        //监控hash值变化 如果页面已经有hash, 重新刷新页面也要获取hash值
        this.hash = window.location.hash.slice(2) || 'all';
        window.addEventListener('hashchange', ()=>{
            this.hash = window.location.hash.slice(2);
        },false);
    },
    watch:{
        todos:{
            handler(){ // 默认写成函数 就相当于默认写了个handler
                // localStorage默认存储的是字符串
                localStorage.setItem('data', JSON.stringify(this.todos))
            },
            deep: true
        }
    },
    methods:{
        add(){
            this.todos.push({
                isSelected:false, 
                title:this.title
            });
            this.title = ""
        },
        remove(todo){
            this.todos = this.todos.filter(item=>item!==todo);
        },
        remember(todo){
            this.cur = todo;
        },
        cancel(){
            this.cur = "";
        },
        filterTodo(type){
            /* if(type == true){ //isSelected= true
                this.todos = this.todos.filter((item)=>item.isSelected)
            }else if(type == false){ 
                this.todos = this.todos.filter((item)=>!item.isSelected)
            }else{

            } */
        }
    },
    computed:{
        count(){
            return this.todos.filter((item)=> !item.isSelected).length;
        },
        newTodos(){
            if(this.hash === 'all') return this.todos;
            if(this.hash === 'finish') return this.todos.filter((item)=>item.isSelected);
            if(this.hash === 'unfinish') return this.todos.filter(item=>!item.isSelected);
            return this.todos;
        }
    },
    directives:{
        focus(el,bindings){
            if(bindings.value){
                el.focus();
            }
        }
    }
    
})