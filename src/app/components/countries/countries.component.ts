import { Component, OnInit } from '@angular/core';
import { CountriesService } from './countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit {
  constructor(private countriesService: CountriesService) {}

  ngOnInit(): void {}
}
