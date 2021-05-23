import {Module} from 'vuex';
import {Restaurant} from '@/types/Restaurant';
import {RootState} from '@/store/index';
import {Api} from '@/api';

export type RestaurantState = {
  records: Restaurant[];
};

const restaurants: (api: Api) => Module<RestaurantState, RootState> = api => ({
  namespaced: true,
  state: {
    records: [],
  },
  mutations: {
    storeRecords(state, records) {
      state.records = records;
    },
  },
  actions: {
    load({commit}) {
      api.loadRestaurants().then((records: Restaurant[]) => {
        commit('storeRecords', records);
      });
    },
  },
  modules: {},
});

export default restaurants;
