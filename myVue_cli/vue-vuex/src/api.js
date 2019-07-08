import axios from './utils/request';

export const getProductList = () => axios.get('/getproductlist');
