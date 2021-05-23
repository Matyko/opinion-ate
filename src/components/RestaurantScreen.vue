<template>
  <v-card>
    <v-card-title>Restaurants</v-card-title>
    <v-card-text>
      <RestaurantList />
    </v-card-text>
  </v-card>
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
