import Vuex, {Module} from 'vuex';
import {createLocalVue, mount, Wrapper} from '@vue/test-utils';
import RestaurantList from '@/components/RestaurantList.vue';

describe('RestaurantList', () => {
    const records = [
        {id: 1, name: 'Sushi Place'},
        {id: 2, name: 'Pizza Place'},
    ];

    const localVue = createLocalVue();
    localVue.use(Vuex);

    let restaurantsModule: Module<any, any>;
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
        wrapper = mount(RestaurantList, {localVue, store});
    })

    it('loads restaurants on mount', () => {
        expect(restaurantsModule?.actions?.load).toHaveBeenCalled();
    });

    it('displays the restaurants', () => {
        const firstRestaurantName = wrapper
            .findAll('[data-testid="restaurant"]')
            .at(0)
            .text();
        expect(firstRestaurantName).toBe(records[0].name);
    });
});
