import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  DataService,
  RestCountriesAPIResponse,
} from 'src/app/shared/data.service';
import { Country } from './models/country.model';
import { Currency } from './models/currency.model';
import { Language } from './models/language.model';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private countries!: Country[] | null;
  public countriesBehaviorSubject = new BehaviorSubject<Country[] | null>(null);

  constructor(private dataService: DataService) {
    // this.fetchAllCountries()
    //   .then((countries: Country[]) => {
    //     this.countries = countries;
    //     this.countriesBehaviorSubject.next([...this.countries]);
    //   })
    //   .catch((error) => {
    //     throw error;
    //   });

    //////////////////////////////////
    // Hardcoding data to avoid constant http requests while styling components
    // and refreshing the page
    let responseData = [
      {
        flag: 'https://restcountries.eu/data/afg.svg',
        name: 'Afghanistan',
        nativeName: 'افغانستان',
        alpha3Code: 'AFG',
        population: 27657145,
        region: 'Asia',
        subregion: 'Southern Asia',
        capital: 'Kabul',
        topLevelDomain: ['.af'],
        currencies: [
          {
            code: 'AFN',
            name: 'Afghan afghani',
            symbol: '؋',
          },
        ],
        languages: [
          {
            iso639_1: 'ps',
            iso639_2: 'pus',
            name: 'Pashto',
            nativeName: 'پښتو',
          },
          {
            iso639_1: 'uz',
            iso639_2: 'uzb',
            name: 'Uzbek',
            nativeName: 'Oʻzbek',
          },
          {
            iso639_1: 'tk',
            iso639_2: 'tuk',
            name: 'Turkmen',
            nativeName: 'Türkmen',
          },
        ],
        borders: ['IRN', 'PAK', 'TKM', 'UZB', 'TJK', 'CHN'],
      },
      {
        flag: 'https://restcountries.eu/data/ala.svg',
        name: 'Åland Islands',
        nativeName: 'Åland',
        alpha3Code: 'ALA',
        population: 28875,
        region: 'Europe',
        subregion: 'Northern Europe',
        capital: 'Mariehamn',
        topLevelDomain: ['.ax'],
        currencies: [
          {
            code: 'EUR',
            name: 'Euro',
            symbol: '€',
          },
        ],
        languages: [
          {
            iso639_1: 'sv',
            iso639_2: 'swe',
            name: 'Swedish',
            nativeName: 'svenska',
          },
        ],
        borders: [],
      },
    ];
    let newCountries: Country[] = [];
    responseData.forEach((country) => {
      const currencies: Currency[] = [];
      const languages: Language[] = [];
      country.currencies.forEach((currency) => {
        currencies.push(currency);
      });
      country.languages.forEach((language) => {
        languages.push(language);
      });
      newCountries.push(
        new Country(
          country.flag,
          country.name,
          country.nativeName,
          country.alpha3Code,
          country.population,
          country.region,
          country.subregion,
          country.capital,
          country.topLevelDomain,
          currencies,
          languages,
          country.borders
        )
      );
    });
    this.countries = newCountries;
    this.countriesBehaviorSubject.next(this.countries);
  }

  private async fetchAllCountries(): Promise<Country[]> {
    try {
      const restCountriesAPIResponse = await this.dataService.getCountries(
        'all'
      );
      let responseCountries: Country[] = [];

      restCountriesAPIResponse.forEach((country) => {
        responseCountries.push(Country.convertJSONToCountry(country));
      });

      return responseCountries;
    } catch (error) {
      throw error;
    }
  }
}
