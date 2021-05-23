import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import restaurants, {RestaurantState} from "@/store/restaurants";
import api from "@/api";

Vue.use(Vuex);

export type RootState = {
    restaurants: RestaurantState
}

const store: Store<RootState> = new Vuex.Store({
    modules: {
        restaurants: restaurants(api)
    }
});

export default store;
