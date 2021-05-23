import Vuex from 'vuex';
import {createLocalVue} from '@vue/test-utils';
import restaurants, {CONSTANTS} from '@/store/restaurants';
import Vue from 'vue';
import Vuetify from 'vuetify';
import {Restaurant} from '@/types/Restaurant';

describe('restaurants', () => {
  Vue.use(Vuetify);
  const localVue = createLocalVue();
  localVue.use(Vuex);

  describe('when loading succeeds', () => {
    it('stores the restaurants', async () => {
      const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
      ];

      const api = {
        loadRestaurants: () => Promise.resolve(records),
      };

      const store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api),
        },
      });

      await store.dispatch(`restaurants/${[CONSTANTS.LOAD]}`);
      expect(store.state.restaurants[CONSTANTS.RECORDS]).toEqual(records);
    });
  });

  describe('while loading', () => {
    it('sets a loading flag', () => {
      const api = {
        loadRestaurants: (): Promise<Restaurant[]> => new Promise(() => ({})),
      };
      const store = new Vuex.Store({
        modules: {
          restaurants: restaurants(api),
        },
      });
      store.dispatch(`restaurants/${[CONSTANTS.LOAD]}`);
      expect(store.state.restaurants[CONSTANTS.LOADING]).toEqual(true);
    });
  });
});
