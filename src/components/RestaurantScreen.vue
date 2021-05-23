<template>
  <div>
    <h1>Restaurants</h1>
    <RestaurantList />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import RestaurantList from '@/components/RestaurantList.vue';
@Component({
  components: {RestaurantList},
})
export default class RestaurantScreen extends Vue {}
</script>

<style scoped></style>
