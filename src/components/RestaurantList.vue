<template>
  <ul>
    <v-list-item tag="li">
      <span v-if="isLoading" data-testid="loading-indicator"> Loading... </span>
    </v-list-item>
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
import {CONSTANTS} from '@/store/restaurants';

const restaurantsModule = namespace('restaurants');

@Component
export default class RestaurantList extends Vue {
  @restaurantsModule.Action(CONSTANTS.LOAD)
  private loadRestaurants!: () => {data: Restaurant[]; status: number};

  @restaurantsModule.State(CONSTANTS.RECORDS)
  private restaurants!: Restaurant[];

  @restaurantsModule.State(CONSTANTS.LOADING)
  private isLoading!: boolean;

  mounted(): void {
    this.loadRestaurants();
  }
}
</script>

<style scoped></style>
