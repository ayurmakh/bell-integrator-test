import { MutationTree } from 'vuex';
import { State, Country, HistoryItem } from '@/types';
import { modes } from '@/constants';

export const mutations: MutationTree<State> = {
  SET_COUNTRIES: (state: State, countries: Country[]) => state.countries = countries,

  CHANGE_COUNTRY_MODE: (state: State, { countryId, mode }) => {
    const desiredCountry = state.countries.find((country: Country) => country.id === countryId);
    if (!desiredCountry) {
      return;
    }
    desiredCountry.mode = mode;

    state.history.push({
      country: desiredCountry,
      date: new Date(),
      mode,
    });
  },

  ADD_TO_HISTORY: (state: State, historyItem: HistoryItem) => state.history.push(historyItem),
  SET_FILTER: (state: State, filter: string) => state.filter = filter,
};
