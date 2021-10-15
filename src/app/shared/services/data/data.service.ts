import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Currencies } from '../../../components/countries/models/currencies.model';
import { Languages } from '../../../components/countries/models/languages.model';

export interface RestCountriesAPIResponse {
  readonly flags: { png: string; svg: string };
  readonly name: {
    common: string;
    official: string;
    nativeName: { [abbr: string]: { official: string; common: string } };
  };
  readonly cca3: string;
  readonly population: number;
  readonly region: string;
  readonly subregion: string;
  readonly capital: string[];
  readonly currencies: Currencies;
  readonly languages: Languages;
  readonly borders: string[];
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private rootURL = 'https://restcountries.com/v3.1/';

  constructor(private http: HttpClient) {}

  /**
   *
   * @param {string} apiEndPoint The API endpoint to append to the API root URL.
   * Must not include a leading forward slash (eg. 'endpoint' and NOT
   * '/endpoint'). Current root URL is https://restcountries.com/v3.1/
   */
  public getCountries(apiEndPoint: string) {
    console.log(`${this.rootURL}${apiEndPoint}`);

    return this.http
      .get<RestCountriesAPIResponse[]>(`${this.rootURL}${apiEndPoint}`)
      .toPromise();
  }
}
