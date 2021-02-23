import { Injectable } from '@angular/core';
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
  private countries!: Country[];

  constructor(private dataService: DataService) {
    // get data for all countries
    this.dataService
      .getCountries('all')
      .subscribe((countries: RestCountriesAPIResponse[]) => {
        const responseCountries: Country[] = [];

        countries.forEach((country) => {
          const currencies: Currency[] = [];
          const languages: Language[] = [];

          country.currencies.forEach((currency) => {
            currencies.push(currency);
          });

          country.languages.forEach((language) => {
            languages.push(language);
          });

          responseCountries.push(
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

        this.countries = responseCountries;
        // console.log(this.countries);
      });
  }

  public getCountries() {
    return [...this.countries];
  }
}
