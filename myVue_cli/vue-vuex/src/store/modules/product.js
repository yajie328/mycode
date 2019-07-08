import * as types from '../mutation-type';
import * as apis from '../../api';

export default {
  namespaced: true,
  state: {
    products: [],
  },
  actions: {
    async [types.get_product_list]({ commit }, payload) {
      const productList = await apis.getProductList();
      console.log(productList);
    },
  },
};
