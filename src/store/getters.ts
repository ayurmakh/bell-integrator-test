import { modes } from '@/constants';
import {
  State,
  Country,
  Currency,
  HistoryItem,
} from '@/types';
import { GetterTree } from 'vuex';

export const getters: GetterTree<State, any> = {

  getShowedCountries: (state: State) => (filter: string): Country[] => {

    function sortByEntries(country1: Country, country2: Country): number {
      const entries1 = findAllEntriesCount(country1);
      const entries2 = findAllEntriesCount(country2);

      return entries1 < entries2 ? 1 : entries1 === entries2 ? 0 : -1;
    }

    function findAllEntriesCount(country: Country) {
      let entries = findEntriesCount(country.name);
      country.currencies.forEach((currency: Currency) => {
        entries += findEntriesCount(currency.name);
      });

      return entries;
    }

    function findEntriesCount(source: string): number {
      try {
        return (source.match(new RegExp(filter, 'g')) || []).length;
      } catch (error) {
        return 0;
      }
    }

    const showedCountries = state.countries.filter((country: Country) => country.mode === modes.add);

    if (filter === '') {
      return showedCountries;
    }

    return showedCountries.filter((country: Country) => findAllEntriesCount(country) > 0).sort(sortByEntries);
  },

  hiddenCountries: (state: State) => state.countries.filter((country: Country) => country.mode === modes.delete),

  getHistory: (state: State) => (mode: string): HistoryItem[] => {
    if (mode === '') {
      return state.history;
    }
    return state.history.filter((item: HistoryItem) => item.mode === mode);
  },
};
