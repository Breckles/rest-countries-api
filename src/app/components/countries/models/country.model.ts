import { Currency } from './currency.model';
import { Language } from './language.model';

export class Country {
  constructor(
    readonly flag: string,
    readonly name: string,
    readonly nativeName: string,
    readonly alpha3Code: string,
    readonly population: number,
    readonly region: string,
    readonly subregion: string,
    readonly capital: string,
    readonly topLevelDomain: string[],
    readonly currencies: Currency[],
    readonly languages: Language[],
    /**
     * @param borders A list of alpha3Codes for bordering countries
     */
    readonly borders: string[]
  ) {}
}
