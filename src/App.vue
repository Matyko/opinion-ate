<template>
  <div>
    <div id="app">Hello World</div>
    <RestaurantScreen />
  </div>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import RestaurantScreen from '@/components/RestaurantScreen.vue';

@Component({
  components: {RestaurantScreen},
})
export default class App extends Vue {}
</script>
