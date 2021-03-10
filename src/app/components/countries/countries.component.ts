import { Component, Input, OnInit } from '@angular/core';
import { Country } from './models/country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  @Input()
  public countries!: Country[];
  public displayCountries: Country[] = [];
  private displayIndex = 10;

  constructor() {}

  ngOnInit(): void {
    if (!this.countries) {
      throw new Error("An argument for 'countries' must be provided");
    }

    this.displayCountries.push(...this.countries.slice(0, this.displayIndex));
  }
}
