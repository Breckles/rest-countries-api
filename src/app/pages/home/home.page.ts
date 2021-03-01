import { Component, OnInit } from '@angular/core';
import { CountriesService } from 'src/app/components/countries/countries.service';
import { Country } from 'src/app/components/countries/models/country.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePageComponent implements OnInit {
  countries!: Country[];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.getAllCountries().then((countries: Country[]) => {
      this.countries = countries;
    });
  }

  filterCountriesByName(name: string) {
    this.countries = this.countriesService.getCountriesByName(name);
  }

  filterCountriesByRegion(region: string) {
    if (region === 'all') {
      this.countriesService.getAllCountries().then((countries: Country[]) => {
        this.countries = countries;
      });
    } else {
      this.countries = this.countriesService.getCountriesByRegion(region);
    }
  }
}
