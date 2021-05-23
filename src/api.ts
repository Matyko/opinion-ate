import axios, {AxiosResponse} from 'axios';
import {Restaurant} from '@/types/Restaurant';

const client = axios.create({
  baseURL:
    'https://outside-in-dev-api.herokuapp.com/lZ4pBZva6u2bjO4WTyGMYxSPx2ZUgohk',
});

export interface Api {
  loadRestaurants: () => Promise<Restaurant[]>;
}

const api: Api = {
  loadRestaurants() {
    return client
      .get('/restaurants')
      .then((response: AxiosResponse<Restaurant[]>) => response.data);
  },
};

export default api;
