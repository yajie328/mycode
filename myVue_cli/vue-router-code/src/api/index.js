import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000';
const getTreeList = function(){
    return axios.get('/getTreeList');
}


export {getTreeList}