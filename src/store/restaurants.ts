import {Module} from 'vuex';
import {Restaurant} from '@/types/Restaurant';
import {RootState} from '@/store/index';
import {Api} from '@/api';

export type RestaurantState = {
  [CONSTANTS.RECORDS]: Restaurant[];
  [CONSTANTS.LOADING]?: boolean;
};

export enum CONSTANTS {
  STORE_RECORDS = 'STORE_RECORDS',
  SET_LOADING = 'SET_LOADING',
  LOAD = 'LOAD',
  RECORDS = 'RECORDS',
  LOADING = 'LOADING',
}

const restaurants: (api: Api) => Module<RestaurantState, RootState> = api => ({
  namespaced: true,
  state: {
    [CONSTANTS.RECORDS]: [],
    [CONSTANTS.LOADING]: true,
  },
  mutations: {
    [CONSTANTS.STORE_RECORDS](state, records) {
      state[CONSTANTS.RECORDS] = records;
    },
    [CONSTANTS.SET_LOADING](state, loading) {
      state[CONSTANTS.LOADING] = loading;
    },
  },
  actions: {
    [CONSTANTS.LOAD]({commit}) {
      commit(CONSTANTS.SET_LOADING, true);
      api.loadRestaurants().then((records: Restaurant[]) => {
        commit(CONSTANTS.STORE_RECORDS, records);
        commit(CONSTANTS.SET_LOADING, false);
      });
    },
  },
  modules: {},
});

export default restaurants;
