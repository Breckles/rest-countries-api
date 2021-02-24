import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Country } from '../models/country.model';
import { Currency } from '../models/currency.model';
import { Language } from '../models/language.model';

import { CountryCardComponent } from './country-card.component';

describe('CountryCardComponent', () => {
  let component: CountryCardComponent;
  let fixture: ComponentFixture<CountryCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CountryCardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryCardComponent);
    component = fixture.componentInstance;
    component.country = new Country(
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
    );
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
