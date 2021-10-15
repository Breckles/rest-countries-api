import { Injectable } from '@angular/core';
import {
  DataService,
  RestCountriesAPIResponse,
} from 'src/app/shared/services/data/data.service';
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
        'all'
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

  public async getCountriesByCCA3(CCA3Codes: string[]): Promise<Country[]> {
    return this.getAllCountries().then((countries: Country[]) => {
      return countries.filter((country: Country) => {
        if (CCA3Codes) {
          return CCA3Codes.includes(country.cca3);
        }
        return false;
      });
    });
  }
}
