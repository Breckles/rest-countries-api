// Current route: root/countries/:alpha3Code

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CountriesService } from '../countries.service';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-country-detail',
  templateUrl: './country-detail.component.html',
  styleUrls: ['./country-detail.component.scss'],
})
export class CountryDetailComponent implements OnInit {
  country!: Country;

  constructor(
    private countriesService: CountriesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    let countryCode: string = this.route.snapshot.paramMap.get('alpha3Code')!;
    this.countriesService
      .getCountryByAlpha3Code(countryCode)
      .then((country: Country | undefined) => {
        if (country) {
          this.country = country;
        }
      });
  }
}
