import axios from 'axios'
//同意设置基础路径
axios.defaults.baseURL = "http://localhost:3000"
// 把返回结果统一处理一下

axios.interceptors.response.use(res=>{  
    return res.data;
})
axios.interceptors.request.use(req=>{
    req.headers["Content-Type"]= 'application/x-www-form-urlencoded'; 
    return req;
})

// 获取轮播图数据， 返回的是一个promise 对象
export let getSliders = ()=>{
    return axios.get('/sliders')
}

// 获取热门图书
export let getHotBooks = ()=>{
    return axios.get('./hot');
}

// 获取全部图书
export let getBooks = ()=>{
    return axios.get('./book');
}

// 删除某一本图书
export let removeBook = (id)=>{
    return axios.delete(`./book?id=${id}`);
}

// 获取某一本图书
export let getDetailBook = (id)=>{
    return axios.get(`./book?id=${id}`);
}

// 修改某一本图书
export let updateBook = (id, book)=>{
    return axios.put(`./book?id=${id}`, book);
}
// 添加某一本图书
export let addBook = (book)=>{
    return axios.post(`./book`, book);
}
