import {Module} from "vuex";
import {Restaurant} from "@/types/Restaurant";
import {RootState} from "@/store/index";

export type RestaurantState = {
    records: Restaurant[]
}

const restaurants: (api: any) => Module<RestaurantState, RootState> = api => ({
    namespaced: true,
    state: {
        records: []
    },
    mutations: {
        storeRecords(state, records) {
            state.records = records;
        }
    },
    actions: {
        load({commit}) {
            api.loadRestaurants().then((records: Restaurant[]) => {
               commit('storeRecords', records);
            });
        },
    },
    modules: {}
});

export default restaurants;
