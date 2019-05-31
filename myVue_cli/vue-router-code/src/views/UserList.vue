<template>
    <el-container>
        <el-table :data="tableData" stripe style="100%">
            <el-table-column prop="id" label="日期"></el-table-column>
            <el-table-column prop="username" label="姓名" ></el-table-column>
            <el-table-column label="操作">
                 <template slot-scope="scope">
                     <router-link :to="`/user/detail/:${scope.row.id}`">查看详情</router-link>
                </template>
            </el-table-column>
        </el-table>
    </el-container>
</template>
<script>
export default {
    data(){
        let userList= JSON.parse(localStorage.getItem('userList')) || [];
        userList.reverse();
        return {
            tableData: userList
        }
    }
}
</script>

