// Current route: root/countries/:alpha3Code

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CountriesService } from '../../components/countries/countries.service';
import { Country } from '../../components/countries/models/country.model';

@Component({
  selector: 'app-country-page',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPageComponent implements OnInit {
  country!: Country;

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const countryCode: string = this.route.snapshot.paramMap.get('cca3')!;
    this.setCountry(countryCode);

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      const countryCode: string = paramMap.get('cca3')!;
      this.setCountry(countryCode);
    });
  }

  private setCountry(cca3Code: string) {
    this.countriesService
      .getCountriesByCCA3([cca3Code])
      .then((countries: Country[]) => {
        if (countries.length > 0) {
          this.country = countries[0];
        } else {
          throw new Error(`No country found for country code: ${cca3Code}`);
        }
      })
      .catch((error) => {
        throw new Error('dd');
      });
  }
}
