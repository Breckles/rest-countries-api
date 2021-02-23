import { Currency } from './currency.model';
import { Language } from './language.model';

export class Country {
  constructor(
    readonly name: string,
    readonly nativeName: string,
    readonly alphaCode: string,
    readonly population: number,
    readonly region: string,
    readonly subRegion: string,
    readonly capital: string,
    readonly topLevelDomain: string,
    readonly currencies: Currency[],
    readonly languages: Language[],
    readonly borderCountriesAlphaCodes: string[]
  ) {}
}
