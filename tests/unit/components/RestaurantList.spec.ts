import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex, {Module} from 'vuex';
import {createLocalVue, mount, Wrapper} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList.vue';
import {RootState} from '@/store';
import {RestaurantState} from '@/store/restaurants';

const findByTestId = (
  wrapper: Wrapper<RestaurantList>,
  testId: string,
  index: number,
) => wrapper.findAll(`[data-testid="${testId}"]`).at(index);

describe('RestaurantList', () => {
  Vue.use(Vuetify);

  const records = [
    {id: 1, name: 'Sushi Place'},
    {id: 2, name: 'Pizza Place'},
  ];

  const vuetify = new Vuetify();
  const localVue = createLocalVue();
  localVue.use(Vuex);

  let restaurantsModule: Module<RestaurantState, RootState>;
  let wrapper: Wrapper<RestaurantList>;

  beforeEach(() => {
    restaurantsModule = {
      namespaced: true,
      state: {records},
      actions: {
        load: jest.fn().mockName('load'),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });
    // @ts-ignore
    wrapper = mount(RestaurantList, {localVue, store, vuetify});
  });

  it('loads restaurants on mount', () => {
    expect(restaurantsModule?.actions?.load).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    const firstRestaurantName = findByTestId(wrapper, 'restaurant', 0).text();
    const secondRestaurantName = findByTestId(wrapper, 'restaurant', 1).text();
    expect(firstRestaurantName).toBe(records[0].name);
    expect(secondRestaurantName).toBe('Pizza Place');
  });
});
