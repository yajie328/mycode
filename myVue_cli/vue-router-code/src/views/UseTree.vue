<template>
<div>
    组件数的二次封装
    <Mytree :data.sync="treedata" v-if="treedata.length"
        :fileDrop="fileDrop"
        :directoryDrop="directoryDrop"
        :delete="deleteFn"
        :rename="rename"
    ></Mytree>
</div>
</template>
<script>
import Mytree from '../components/tree.vue'
import {getTreeList} from '../api'
export default {
    data(){
        return {
            treedata:[],
            fileDrop:[
                {text:'rm', value:'删除文件'}
            ],
            directoryDrop:[
                {text:'rn', value:'修改名字'},
                {text:'rm', value:'删除文件夹'}
            ]
        }
    },
    async mounted(){
        let {data} = await getTreeList();
        data = data.data;
        data.parent.forEach(p=>p.type='parent');
        this.treedata = [...data.parent, ...data.child];
    },
    methods:{
        rename(id){
            let loading = this.$loading();
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve();
                    loading.close();
                },1000)
            })
        },
        deleteFn(id){ // 这个方法必须返回一个promise
            let loading = this.$loading();
            return new Promise((resolve,reject)=>{
                setTimeout(()=>{
                    resolve();
                    loading.close();
                },1000)
            })
        }
    },
    components:{
        Mytree
    }
}
</script>

