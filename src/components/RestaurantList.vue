<template>
  <div></div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {Action} from 'vuex-class';
import {Restaurant} from '@/types/Restaurant';

@Component
export default class RestaurantList extends Vue {
  @Action('restaurants/load')
  loadRestaurants!: () => Restaurant[];

  mounted(): void {
    this.loadRestaurants();
  }
}
</script>

<style scoped></style>
