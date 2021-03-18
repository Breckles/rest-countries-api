import {
  Component,
  HostListener,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
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

  private countries!: Country[];
  private countriesPerRender = 20;
  displayCountries!: Country[];

  constructor(
    private countriesService: CountriesService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.countriesService.getAllCountries().then((countries: Country[]) => {
      this.countries = countries;
      this.displayCountries = this.countries.slice(0, this.countriesPerRender);
    });

    this.renderer.listen('window', 'scroll', () => {
      if (
        document.documentElement.scrollTop >=
        document.documentElement.scrollHeight - window.innerHeight - 200
      ) {
        this.displayCountries = this.countries.slice(
          0,
          this.displayCountries.length + this.countriesPerRender
        );
      }
    });
  }

  filterCountriesByName(name: string) {
    this.countries = this.countriesService.getCountriesByName(name);
    this.regionFilterSelectComponent.reset();
  }

  filterCountriesByRegion(region: string) {
    if (region === 'All') {
      this.countriesService.getAllCountries().then((countries: Country[]) => {
        this.countries = countries;
      });
    } else {
      this.countries = this.countriesService.getCountriesByRegion(region);
    }

    this.searchBarComponent.reset();
  }

  @HostListener('scroll', ['$event'])
  renderMoreCountries(event: Event) {}
}
