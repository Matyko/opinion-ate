import Vue from 'vue';
import Vuetify from 'vuetify';
import Vuex, {Module} from 'vuex';
import {createLocalVue, mount, Wrapper} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList.vue';
import {RootState} from '@/store';
import {CONSTANTS, RestaurantState} from '@/store/restaurants';

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

  const mountWithStore = (
    state: RestaurantState = {
      [CONSTANTS.RECORDS]: records,
      [CONSTANTS.LOADING]: false,
    },
  ) => {
    restaurantsModule = {
      namespaced: true,
      state,
      actions: {
        [CONSTANTS.LOAD]: jest.fn().mockName(CONSTANTS.LOAD),
      },
    };
    const store = new Vuex.Store({
      modules: {
        restaurants: restaurantsModule,
      },
    });
    wrapper = mount(RestaurantList, {
      localVue,
      store,
      vuetify,
      directives: {intersect: {}},
    });
  };

  it('loads restaurants on mount', () => {
    mountWithStore();
    expect(restaurantsModule?.actions?.[CONSTANTS.LOAD]).toHaveBeenCalled();
  });

  it('displays the restaurants', () => {
    mountWithStore();
    const firstRestaurantName = findByTestId(wrapper, 'restaurant', 0).text();
    const secondRestaurantName = findByTestId(wrapper, 'restaurant', 1).text();
    expect(firstRestaurantName).toBe(records[0].name);
    expect(secondRestaurantName).toBe('Pizza Place');
  });

  it('displays the loading indicator while loading', () => {
    mountWithStore({[CONSTANTS.RECORDS]: [], [CONSTANTS.LOADING]: true});
    expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(
      true,
    );
  });

  it('does not display the loading indicator while not loading', () => {
    mountWithStore({[CONSTANTS.RECORDS]: [], [CONSTANTS.LOADING]: false});
    expect(wrapper.find('[data-testid="loading-indicator"]').exists()).toBe(
      false,
    );
  });
});
