<template>
  <ul>
    <v-list-item
      tag="li"
      data-testid="restaurant"
      v-for="restaurant in restaurants"
      :key="restaurant.id"
    >
      <v-list-item-content>
        <v-list-item-title>
          {{ restaurant.name }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
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
