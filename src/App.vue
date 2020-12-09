<template>
  <div id="app">
    <div class="nav">
      <ul>
        <li>
          <router-link to='/'>Главная</router-link>  
        </li>
        <li>
          <router-link to='/history'>История</router-link>  
        </li>
        <li>
          <router-link :to="{ name: 'historyWithMode', params: { mode: 'add' }}">История добавлений</router-link>  
        </li>
        <li>
          <router-link :to="{ name: 'historyWithMode', params: { mode: 'delete' }}">История удалений</router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import {
  Action,
} from 'vuex-class';

@Component
export default class App extends Vue {

  @Action
  private fetchAllCountries!: () => void;

  private mounted() {
    this.fetchAllCountries();
  }
}
</script>

<style lang="scss">

* {
  font-family: sans-serif;
}

.nav {
  margin-bottom: 30px;

  ul {
    padding: 0;
    margin: 0;
  }

  li {
    list-style: none;
    display: inline;
    margin-right: 30px;
  }

  a {
    text-decoration: none;
  }
}
</style>