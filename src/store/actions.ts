import { ActionTree } from 'vuex';
import { Country } from '@/types';
import axios from 'axios';
import { modes } from '@/constants';

export const actions: ActionTree<any, any> = {

  async fetchAllCountries({ commit }) {
    axios.get('https://restcountries.eu/rest/v2/all').then(
      (onfullfilled) => {
        if (onfullfilled.status === 200) {
          try {
            const countries: Country[] = onfullfilled.data.map((country: any) => ({
              id: +country.numericCode,
              currencies: country.currencies.map((currency: any) => ({
                id: currency.code,
                name: currency.name,
              })),
              name: country.name,
              mode: modes.delete,
            }));
            commit('SET_COUNTRIES', countries);
          } catch (e) {
            console.log(e);
          }
        }
      },
    ).catch((error) => {
      console.log(error);
    });
  },

  deleteCountry({ commit }, countryId: number) {
    commit('CHANGE_COUNTRY_MODE', {
      countryId,
      mode: modes.delete,
    });
  },

  addCountry({ commit }, countryId: number) {
    commit('CHANGE_COUNTRY_MODE', {
      countryId,
      mode: modes.add,
    });
  },

  setFilter({ commit}, filter: string) {
    commit('SET_FILTER', filter);
  },
};
