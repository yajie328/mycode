export default {
    getList: function(){
        let userStr = location.getItem('userlist');
        users = userStr.parse():[]
        return users;
    }
}