import Mock from 'mockjs';


Mock.mock(/\/getproductlist/, 'get', getUserList); // 模拟分页查询用户信息接口
