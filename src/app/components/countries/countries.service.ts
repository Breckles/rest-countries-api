import { Injectable } from '@angular/core';
import {
  DataService,
  RestCountriesAPIResponse,
} from 'src/app/shared/data.service';
import { Country } from './models/country.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countries!: Country[];

  constructor(private dataService: DataService) {}

  /**
   * Returns an array including all countries from the API. The first time it
   * gets called, it also initializes the country list and saves it to session
   * storage.
   */
  public async getAllCountries(): Promise<Country[]> {
    // Check to see if countries list has already been initialized
    if (this.countries) {
      return [...this.countries];
    }

    // Check to see if countries list is in sessionStorage
    const sessionCountries = sessionStorage.getItem('countries');
    if (sessionCountries) {
      this.countries = JSON.parse(sessionCountries);
      return [...this.countries];
    }

    // Countries list has not been initialized and is not in session storage.
    // Fetch data from API.
    try {
      const countries: Country[] = [];

      const restCountriesAPIResponse = await this.dataService.getCountries(
        'all?fields=flag;name;nativeName;alpha3Code;population;region;subregion;capital;topLevelDomain;currencies;languages;borders'
      );

      restCountriesAPIResponse.forEach((countryJSON) => {
        countries.push(Country.convertJSONToCountry(countryJSON));
      });

      sessionStorage.setItem('countries', JSON.stringify(countries));
      this.countries = countries;

      return [...this.countries];
    } catch (error) {
      throw error;
    }

    // Hardcoding data to avoid constant http requests while styling components
    // and refreshing the page
    /////////////////////////////////
    // let mockJSONCountries: RestCountriesAPIResponse[] = [
    //   {
    //     flag: 'https://restcountries.eu/data/deu.svg',
    //     name: 'Germany',
    //     nativeName: 'Deutschland',
    //     alpha3Code: 'DEU',
    //     population: 81770900,
    //     region: 'Europe',
    //     subregion: 'Western Europe',
    //     capital: 'Berlin',
    //     topLevelDomain: ['.de'],
    //     currencies: [
    //       {
    //         code: 'EUR',
    //         name: 'Euro',
    //         symbol: '€',
    //       },
    //     ],
    //     languages: [
    //       {
    //         iso639_1: 'de',
    //         iso639_2: 'deu',
    //         name: 'German',
    //         nativeName: 'Deutsch',
    //       },
    //     ],
    //     borders: [
    //       'AUT',
    //       'BEL',
    //       'CZE',
    //       'DNK',
    //       'FRA',
    //       'LUX',
    //       'NLD',
    //       'POL',
    //       'CHE',
    //     ],
    //   },
    //   {
    //     flag: 'https://restcountries.eu/data/usa.svg',
    //     name: 'United States of America',
    //     nativeName: 'United States',
    //     alpha3Code: 'USA',
    //     population: 323947000,
    //     region: 'Americas',
    //     subregion: 'Northern America',
    //     capital: 'Washington, D.C.',
    //     topLevelDomain: ['.us'],
    //     currencies: [
    //       {
    //         code: 'USD',
    //         name: 'United States dollar',
    //         symbol: '$',
    //       },
    //     ],
    //     languages: [
    //       {
    //         iso639_1: 'en',
    //         iso639_2: 'eng',
    //         name: 'English',
    //         nativeName: 'English',
    //       },
    //     ],
    //     borders: ['CAN', 'MEX'],
    //   },
    // ];
    // let mockResponseCountries: Country[] = [];
    // mockJSONCountries.forEach((country) => {
    //   mockResponseCountries.push(Country.convertJSONToCountry(country));
    // });
    // this.countries = mockResponseCountries;
    // return [...this.countries];
    ////////////////////////////////////////////////////////////
  }

  public getCountriesByName(name: string): Country[] {
    const lowerCaseName = name.toLowerCase();
    return this.countries.filter((country: Country) =>
      country.name.toLowerCase().includes(lowerCaseName)
    );
  }

  public getCountriesByRegion(region: string): Country[] {
    const lowerCaseRegion = region.toLowerCase();
    return this.countries.filter(
      (country: Country) => country.region.toLowerCase() === lowerCaseRegion
    );
  }

  public async getCountriesByAlpha3Codes(
    alpha3Codes: string[]
  ): Promise<Country[]> {
    return this.getAllCountries().then((countries: Country[]) => {
      return countries.filter((country: Country) =>
        alpha3Codes.includes(country.alpha3Code)
      );
    });

    // // for testing
    // let mockJSONCountries: RestCountriesAPIResponse[] = [
    //   {
    //     flag: 'https://restcountries.eu/data/deu.svg',
    //     name: 'Germany',
    //     nativeName: 'Deutschland',
    //     alpha3Code: 'DEU',
    //     population: 81770900,
    //     region: 'Europe',
    //     subregion: 'Western Europe',
    //     capital: 'Berlin',
    //     topLevelDomain: ['.de'],
    //     currencies: [
    //       {
    //         code: 'EUR',
    //         name: 'Euro',
    //         symbol: '€',
    //       },
    //     ],
    //     languages: [
    //       {
    //         iso639_1: 'de',
    //         iso639_2: 'deu',
    //         name: 'German',
    //         nativeName: 'Deutsch',
    //       },
    //     ],
    //     borders: [
    //       'AUT',
    //       'BEL',
    //       'CZE',
    //       'DNK',
    //       'FRA',
    //       'LUX',
    //       'NLD',
    //       'POL',
    //       'CHE',
    //     ],
    //   },
    // ];
    // // for testing
    // return mockJSONCountries;
  }
}
