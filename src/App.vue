<template>
  <v-app>
    <v-app-bar color="primary" fixed app>
      <v-toolbar-title>Opinion Ate</v-toolbar-title>
    </v-app-bar>
    <v-main>
      <v-container>
        <RestaurantScreen />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import RestaurantScreen from '@/components/RestaurantScreen.vue';

@Component({
  components: {RestaurantScreen},
})
export default class App extends Vue {}
</script>
