<template>
    <el-tree 
        :data="treeData"  
        :render-content="renderContent" 
        :expand-on-click-node="false" 
        :default-expand-all="true" 
        ></el-tree>
</template>
<script>
import _ from 'lodash';
export default {
    data(){
        return {
            treeData: [],
            currentId:'',
            currentContent:''
        }
    },
    props:{
        data: {
            type: Array,
            default: ()=>[]
        },
        fileDrop: Array,
        directoryDrop: Array,
        delete: Function,
        rename: Function
    },
    mounted(){
        this.formateData();
    },
    watch:{
        data(){
           this.formateData();
        }
    },
    methods:{
        isParent(data){
            return data.type === 'parent'
        },
        ok(id){
            this.rename? this.rename(id).then(()=>{
                okInner(id);
            }) : okInner(id);
            let okInner = (id)=>{
                let list = _.cloneDeep(this.data);
                let item = list.find(d=>d.id === id);
                item.name = this.currentContent;
                this.currentId = '';
                this.$emit('update:data', list);
                
                this.$message({
                    type: 'success',
                    message: '修改成功!'
                })
            }
           
            
        },
        cancel(){
            this.currentId = '';
        },
        handleRename(data){
            this.currentId = data.id;
            this.currentContent = data.name;
        },
        remove(id){
            let list = _.cloneDeep(this.data);
            list = list.filter(d=>d.id != id);
            this.$emit('update:data', list);
             this.$message({
                type: 'success',
                message: '删除成功!'
            });
        },
        handleRemove(data){
            this.$confirm(`此操作将永久删除该文件,${data.name} 是否继续?`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.delete? this.delete(data.id).then(()=>{
                         this.remove(data.id);
                    }) : this.remove(data.id);
                   
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
            });
        },
        formateData(){ 
           let AllData = _.cloneDeep(this.data); // 深度克隆数组

            let treeMapList = AllData.reduce((memo,current)=>{
                // current.label = current.name;
                memo[current["id"]] = current;
                return memo;
            },{});
            let result = AllData.reduce((arr,current)=>{
                let pid = current.pid;
                let parent = treeMapList[pid];
                if(parent){
                    parent.children? parent.children.push(current):parent.children = [current]
                }else if(pid === 0){ // 这是跟文件夹
                    arr.push(current);
                }
                return arr;
            },[]);
           this.treeData = result;
        },
        handlerCommand(data, command){
            console.log(data, command)
            if(command === 'rn'){
                this.handleRename(data);
            }else if(command === 'rm'){
                this.handleRemove(data);
            }
        },
        renderContent(h, { node, data, store }){
            let list = this.isParent(data)? this.directoryDrop:this.fileDrop;
            return (
                <div style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
                    <span>
                        <span>
                        {
                            this.isParent(data)?
                                node.expanded? <i class="el-icon-folder-opened"></i>: <i class="el-icon-folder"></i>
                            :<i class="el-icon-document"></i>
                        }
                        {
                            data.id === this.currentId? <el-input v-model={this.currentContent}></el-input>:data.name
                        }
                            
                        </span>
                    </span>
                    {/***bind 绑定会把原来的参数向后移动 */}
                    {
                         data.id !== this.currentId? <el-dropdown placement="bottom-start" trigger="click" on-command={this.handlerCommand.bind(this, data)}>
                        <span class="el-dropdown-link">
                            <i class="el-icon-arrow-down el-icon--right"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                        {list.map(item=>(
                            <el-dropdown-item command={item.text}>{item.value}</el-dropdown-item>
                        ))}
                        </el-dropdown-menu>
                    </el-dropdown> : <span>
                        <el-button type="text" on-click={this.ok.bind(this, data.id)}>确认</el-button>
                        <el-button type="text" on-click={this.cancel}>取消</el-button>
                        </span>
                    }
                    
                </div>
            )
        }
    }
}
</script>
<style>
.el-tree{
    width: 50%;
}
.el-tree .el-tree-node__content{
    height:40px;
}
</style>


