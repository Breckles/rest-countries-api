import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currency } from '../components/countries/models/currency.model';
import { Language } from '../components/countries/models/language.model';

export interface RestCountriesAPIResponse {
  readonly flag: string;
  readonly name: string;
  readonly nativeName: string;
  readonly alpha3Code: string;
  readonly population: number;
  readonly region: string;
  readonly subregion: string;
  readonly capital: string;
  readonly topLevelDomain: string;
  readonly currencies: Currency[];
  readonly languages: Language[];
  readonly borders: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private rootURL = 'https://restcountries.eu/rest/v2/';

  constructor(private http: HttpClient) {}

  /**
   *
   * @param {string} apiEndPoint The API endpoint to append to the API root URL.
   * Must not include a leading forward slash (eg. 'endpoint' and NOT
   * '/endpoint')
   */
  public getCountries(apiEndPoint: string) {
    return this.http.get<RestCountriesAPIResponse[]>(`${this.rootURL}`);
  }
}
