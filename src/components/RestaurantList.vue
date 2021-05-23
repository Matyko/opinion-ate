<template>
  <ul>
    <li
      data-testid="restaurant"
      v-for="restaurant in restaurants"
      :key="restaurant.id"
    >
      {{ restaurant.name }}
    </li>
  </ul>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {namespace} from 'vuex-class';
import {Restaurant} from '@/types/Restaurant';

const restaurantsModule = namespace('restaurants');

@Component
export default class RestaurantList extends Vue {
  @restaurantsModule.Action('load')
  loadRestaurants!: () => {data: Restaurant[]; status: number};

  @restaurantsModule.State('records')
  restaurants!: Restaurant[];

  mounted(): void {
    this.loadRestaurants();
  }
}
</script>

<style scoped></style>
