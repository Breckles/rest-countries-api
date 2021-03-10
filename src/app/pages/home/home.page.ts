import { Component, OnInit, ViewChild } from '@angular/core';
import { CountriesService } from 'src/app/components/countries/countries.service';
import { Country } from 'src/app/components/countries/models/country.model';
import { FilterSelectComponent } from 'src/app/components/filter-select/filter-select.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePageComponent implements OnInit {
  @ViewChild(FilterSelectComponent)
  regionFilterSelectComponent!: FilterSelectComponent;
  @ViewChild(SearchBarComponent)
  searchBarComponent!: SearchBarComponent;

  countries!: Country[];

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.getAllCountries().then((countries: Country[]) => {
      this.countries = countries;
    });
  }

  filterCountriesByName(name: string) {
    this.countries = this.countriesService.getCountriesByName(name);
    this.regionFilterSelectComponent.reset();
  }

  filterCountriesByRegion(region: string) {
    console.log(region);

    if (region === 'All') {
      this.countriesService.getAllCountries().then((countries: Country[]) => {
        this.countries = countries;
      });
    } else {
      this.countries = this.countriesService.getCountriesByRegion(region);
    }

    this.searchBarComponent.reset();
  }
}
