import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  DataService,
  RestCountriesAPIResponse,
} from 'src/app/shared/data.service';
import { Country } from './models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countries!: Country[] | null;
  public countriesBehaviorSubject = new BehaviorSubject<Country[] | null>(null);

  constructor(private dataService: DataService) {
    this.fetchAllCountries()
      .then((countries: Country[]) => {
        this.countries = countries;
        this.countriesBehaviorSubject.next([...this.countries]);
      })
      .catch((error) => {
        throw error;
      });
  }

  private async fetchAllCountries(): Promise<Country[]> {
    // Hardcoding data to avoid constant http requests while styling components
    // and refreshing the page
    let mockJSONCountries: RestCountriesAPIResponse[] = [
      {
        flag: 'https://restcountries.eu/data/deu.svg',
        name: 'Germany',
        nativeName: 'Deutschland',
        alpha3Code: 'DEU',
        population: 81770900,
        region: 'Europe',
        subregion: 'Western Europe',
        capital: 'Berlin',
        topLevelDomain: ['.de'],
        currencies: [
          {
            code: 'EUR',
            name: 'Euro',
            symbol: '€',
          },
        ],
        languages: [
          {
            iso639_1: 'de',
            iso639_2: 'deu',
            name: 'German',
            nativeName: 'Deutsch',
          },
        ],
        borders: [
          'AUT',
          'BEL',
          'CZE',
          'DNK',
          'FRA',
          'LUX',
          'NLD',
          'POL',
          'CHE',
        ],
      },
      {
        flag: 'https://restcountries.eu/data/usa.svg',
        name: 'United States of America',
        nativeName: 'United States',
        alpha3Code: 'USA',
        population: 323947000,
        region: 'Americas',
        subregion: 'Northern America',
        capital: 'Washington, D.C.',
        topLevelDomain: ['.us'],
        currencies: [
          {
            code: 'USD',
            name: 'United States dollar',
            symbol: '$',
          },
        ],
        languages: [
          {
            iso639_1: 'en',
            iso639_2: 'eng',
            name: 'English',
            nativeName: 'English',
          },
        ],
        borders: ['CAN', 'MEX'],
      },
    ];
    let mockResponseCountries: Country[] = [];
    mockJSONCountries.forEach((country) => {
      mockResponseCountries.push(Country.convertJSONToCountry(country));
    });
    return mockResponseCountries;
    ////////////////////////////////////////////////////////////

    // try {
    //   const restCountriesAPIResponse = await this.dataService.getCountries(
    //     'name/united'
    //   );
    //   let responseCountries: Country[] = [];

    //   restCountriesAPIResponse.forEach((country) => {
    //     responseCountries.push(Country.convertJSONToCountry(country));
    //   });
    //   console.log(responseCountries);

    //   return responseCountries;
    // } catch (error) {
    //   throw error;
    // }
  }
}
