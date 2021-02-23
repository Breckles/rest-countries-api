import { Injectable } from '@angular/core';
import { DataService } from 'src/app/shared/data.service';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private dataService: DataService) {}
}
