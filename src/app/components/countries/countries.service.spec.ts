import { TestBed } from '@angular/core/testing';

import { of } from 'rxjs';
import {
  DataService,
  RestCountriesAPIResponse,
} from 'src/app/shared/data.service';
import { CountriesService } from './countries.service';
import { Country } from './models/country.model';
import { Currency } from './models/currency.model';
import { Language } from './models/language.model';

describe('CountriesService', () => {
  let countriesService: CountriesService;
  const expectedJSONCountries: RestCountriesAPIResponse[] = [
    {
      flag: 'flag',
      name: 'name',
      nativeName: 'nativeName',
      alpha3Code: 'a3c',
      population: 1,
      region: 'region',
      subregion: 'subregion',
      capital: 'capital',
      topLevelDomain: ['tld'],
      currencies: [new Currency('code', 'name', 'symbol')],
      languages: [new Language('iso639_1', 'iso639_2', 'name', 'nativeName')],
      borders: ['border1', 'border2'],
    },
    {
      flag: 'flag2',
      name: 'name2',
      nativeName: 'nativeName2',
      alpha3Code: 'a3c2',
      population: 2,
      region: 'region2',
      subregion: 'subregion2',
      capital: 'capital2',
      topLevelDomain: ['tld2'],
      currencies: [new Currency('code2', 'name2', 'symbol2')],
      languages: [new Language('iso639_1', 'iso639_2', 'name', 'nativeName')],
      borders: ['border1', 'border2'],
    },
  ];
  let dataServiceSpy = jasmine.createSpyObj('DataService', {
    getCountries: expectedJSONCountries,
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CountriesService,
        { provide: DataService, useValue: dataServiceSpy },
      ],
    });
    countriesService = TestBed.inject(CountriesService);
  });

  it('should be created', () => {
    expect(countriesService).toBeTruthy();
  });

  it('should return an array of Country objects', () => {
    const expectedCountries: Country[] = [
      new Country(
        'flag',
        'name',
        'nativeName',
        'a3c',
        1,
        'region',
        'subregion',
        'capital',
        ['tld'],
        [new Currency('code', 'name', 'symbol')],
        [new Language('iso639_1', 'iso639_2', 'name', 'nativeName')],
        ['border1', 'border2']
      ),
      new Country(
        'flag2',
        'name2',
        'nativeName2',
        'a3c2',
        2,
        'region2',
        'subregion2',
        'capital2',
        ['tld2'],
        [new Currency('code2', 'name2', 'symbol2')],
        [new Language('iso639_1', 'iso639_2', 'name', 'nativeName')],
        ['border1', 'border2']
      ),
    ];

    // @ts-ignore
    countriesService.countriesBehaviorSubject.subscribe(
      (countries: Country[]) => {
        expect(countries).toEqual(expectedCountries);
      }
    );
  });
});
