import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';
import { Country } from './models/country.model';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  countries!: Country[] | null;

  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countriesService.countriesBehaviorSubject.subscribe(
      (countries: Country[] | null) => {
        this.countries = countries;
      }
    );
  }
}
