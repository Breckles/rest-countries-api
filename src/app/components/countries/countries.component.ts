import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Country } from './models/country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, OnChanges {
  @Input()
  public countries!: Country[];

  constructor() {}

  ngOnChanges(): void {
    // if (!this.countries) {
    //   throw new Error("An argument for 'countries' must be provided");
    // }
    // this.countries = this.countries.slice(0, this.displayIndex);
  }

  ngOnInit(): void {
    if (!this.countries) {
      throw new Error("An argument for 'countries' must be provided");
    }
    // this.displayCountries.push(...this.countries.slice(0, this.displayIndex));
  }
}
