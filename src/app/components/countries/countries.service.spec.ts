import { TestBed } from '@angular/core/testing';
import {
  DataService,
  RestCountriesAPIResponse,
} from 'src/app/shared/services/data/data.service';
import { CountriesService } from './countries.service';
import { Country } from './models/country.model';
import { Currencies } from './models/currencies.model';
import { Language } from './models/language.model';

describe('CountriesService', () => {
  let countriesService: CountriesService;
  const expectedJSONCountries: RestCountriesAPIResponse[] = [
    {
      flag: 'https://restcountries.eu/data/deu.svg',
      name: 'Germany',
      nativeName: 'Deutschland',
      alpha3Code: 'DEU',
      population: 81770900,
      region: 'Europe',
      subregion: 'Western Europe',
      capital: 'Berlin',
      topLevelDomain: ['.de'],
      currencies: [
        {
          name: 'Euro',
          symbol: '€',
        },
      ],
      languages: [
        {
          iso639_1: 'de',
          iso639_2: 'deu',
          name: 'German',
          nativeName: 'Deutsch',
        },
      ],
      borders: ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE'],
    },
    {
      flag: 'https://restcountries.eu/data/usa.svg',
      name: 'United States of America',
      nativeName: 'United States',
      alpha3Code: 'USA',
      population: 323947000,
      region: 'Americas',
      subregion: 'Northern America',
      capital: 'Washington, D.C.',
      topLevelDomain: ['.us'],
      currencies: [
        {
          name: 'United States dollar',
          symbol: '$',
        },
      ],
      languages: [
        {
          iso639_1: 'en',
          iso639_2: 'eng',
          name: 'English',
          nativeName: 'English',
        },
      ],
      borders: ['CAN', 'MEX'],
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

  it('should return an array of Country objects', async () => {
    const expectedCountries: Country[] = [
      new Country(
        'https://restcountries.eu/data/deu.svg',
        'Germany',
        'Deutschland',
        'DEU',
        81770900,
        'Europe',
        'Western Europe',
        'Berlin',
        ['.de'],
        [new Currencies('Euro', '€')],
        [new Language('de', 'deu', 'German', 'Deutsch')],
        ['AUT', 'BEL', 'CZE', 'DNK', 'FRA', 'LUX', 'NLD', 'POL', 'CHE']
      ),
      new Country(
        'https://restcountries.eu/data/usa.svg',
        'United States of America',
        'United States',
        'USA',
        323947000,
        'Americas',
        'Northern America',
        'Washington, D.C.',
        ['.us'],
        [new Currencies('United States dollar', '$')],
        [new Language('en', 'eng', 'English', 'English')],
        ['CAN', 'MEX']
      ),
    ];

    const actualCountries = await countriesService.getAllCountries();

    if (!actualCountries) {
      throw new Error('No countries returned from getAllCounties');
    }

    expect(actualCountries).toEqual(expectedCountries);

    // countriesService.countriesSubject.subscribe((countries: Country[]) => {
    //   expect(countries).toEqual(expectedCountries);
    // });
  });
});
