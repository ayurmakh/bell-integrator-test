export interface State {
  countries: Country[];
  history: HistoryItem[];
  filter: string;
}

export interface Country {
  id: number;
  name: string;
  currencies: Currency[];
  mode: string;
}

export interface Currency {
  id: string;
  name: string;
}

export interface HistoryItem {
  country: Country;
  mode: string;
  date: Date;
}
