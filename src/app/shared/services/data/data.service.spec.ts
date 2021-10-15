import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Currencies } from '../../../components/countries/models/currencies.model';
import { Language } from '../../../components/countries/models/language.model';

import { DataService, RestCountriesAPIResponse } from './data.service';

describe('DataService', () => {
  let dataService: DataService;
  let httpClientSpy: { get: jasmine.Spy };

  beforeEach(() => {
    // TestBed.configureTestingModule({});
    // dataService = TestBed.inject(DataService);
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    dataService = new DataService(httpClientSpy as any);
  });

  it('should be created', () => {
    expect(dataService).toBeTruthy();
  });

  it('should return expected countries (HTTPClient called once)', () => {
    const expectedCountries: RestCountriesAPIResponse[] = [
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
        currencies: [new Currencies('name', 'symbol')],
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
        currencies: [new Currencies('name2', 'symbol2')],
        languages: [new Language('iso639_1', 'iso639_2', 'name', 'nativeName')],
        borders: ['border1', 'border2'],
      },
    ];

    // deprecation warning from rxjs of() is a bug. Only overloads accepting a
    // scheduler are deprecated (see
    // https://github.com/ReactiveX/rxjs/issues/4723)
    httpClientSpy.get.and.returnValue(of(expectedCountries));

    dataService
      .getCountries('all')
      .then((countries: RestCountriesAPIResponse[]) => {
        expect(countries).toEqual(expectedCountries, 'expected countries');
      }, fail);

    expect(httpClientSpy.get.calls.count()).toBe(1, 'one call');
  });
});
