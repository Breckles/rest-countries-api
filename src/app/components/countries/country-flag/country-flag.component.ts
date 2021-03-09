import { Component, Input, OnInit } from '@angular/core';
import { Country } from '../models/country.model';

@Component({
  selector: 'app-country-flag',
  templateUrl: './country-flag.component.html',
  styleUrls: ['./country-flag.component.scss'],
})
export class CountryFlagComponent implements OnInit {
  @Input()
  country!: Country;

  constructor() {}

  ngOnInit(): void {
    if (!this.country) {
      throw new Error("An argument for 'country' must be provided.");
    }
  }
}
