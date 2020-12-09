<template>
  <div class="countries-table">
    <div class="countries-table__left">
      <input
        type="text"
        v-model="_filter">
      <div
        class="countries-table__item"
        v-for="(country, i) of deletedCountries" 
        :key="i">
        <div class="countries-table__item__name">
          <p>{{ country.name }}</p>
          <button @click="addCountry(country.id)">+</button>
        </div>
        <p class="countries-table__item__subtitle">Currencies:</p>
        <p
          class="countries-table__item__currency"
          v-for="(currency, j) of country.currencies" 
          :key="j">{{ `${j + 1}. ${currency.name}` }}</p>
      </div>
    </div>
    <div class="countries-table__right">
      <div
        class="countries-table__item"
        v-for="(country, i) of addedCountries" 
        :key="i">
        <div class="countries-table__item__name">
          <p>{{ country.name }}</p>
          <button @click="deleteCountry(country.id)">-</button>
        </div>
        <p class="countries-table__item__subtitle">Currencies:</p>
        <p
          class="countries-table__item__currency"
          v-for="(currency, j) of country.currencies" 
          :key="j">{{ `${j + 1}. ${currency.name}` }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import {
  Action,
  Getter,
  State,
} from 'vuex-class';
import { mapState } from 'vuex';
import { Country } from '@/types';

@Component
export default class Main extends Vue {

  @State
  private filter!: string;

  @Getter
  private getDeletedCountries!: (filter: string) => Country[];

  @Getter
  private addedCountries!: Country[];

  @Action
  private setFilter!: (filter: string) => void;

  @Action
  private deleteCountry!: (countryId: string) => void;

  @Action
  private addCountry!: (countryId: string) => void;

  get _filter(): string {
    return this.filter;
  }

  set _filter(newFilter) {
    this.setFilter(newFilter);
  }

  get deletedCountries(): Country[] {
    return this.getDeletedCountries(this._filter.toLowerCase());
  }
}
</script>

<style lang="scss">
.countries-table {
  display: flex;

  input {
    margin-left: 10px;
    margin-bottom: 30px;
  }

  &__left {
    border: 1px solid #848484;
    padding: 10px 0 0 0;
    width: 300px;
  }

  &__right {
    border: 1px solid #848484;
    margin-left: 30px;
    width: 300px;

    .countries-table__item {
      border-top: none;
      border-bottom: 1px solid #848484;
    }
  }

  &__item {
    border-top: 1px solid #848484;
    padding: 0 10px;

    button {
      height: 40px;
      width: 40px;
    }

    &__name {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &__subtitle {
      font-weight: 700;
    }

    &__currency {
      margin-left: 30px;
    }
  }
}
</style>
