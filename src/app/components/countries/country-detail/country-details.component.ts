// Current route: root/countries/:alpha3Code

import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CountriesService } from '../countries.service';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-country-details',
  templateUrl: './country-details.component.html',
  styleUrls: ['./country-details.component.scss'],
})
export class CountryDetailsComponent implements OnChanges {
  @Input()
  country!: Country;

  borderCountries!: Country[];

  constructor(private countriesService: CountriesService) {}

  ngOnChanges(): void {
    if (!this.country) {
      throw new Error("An argument for 'country' must be provided.");
    }

    this.countriesService
      .getCountriesByAlpha3Codes(this.country.borders)
      .then(() => {
        this.countriesService
          .getCountriesByAlpha3Codes(this.country.borders)
          .then((borderCountries: Country[]) => {
            this.borderCountries = borderCountries;
          });
      })
      .catch((error: Error) => {
        throw error;
      });
  }
}
