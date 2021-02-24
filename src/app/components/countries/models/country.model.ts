import { RestCountriesAPIResponse } from 'src/app/shared/data.service';
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

  static convertJSONToCountry(JSONCountry: RestCountriesAPIResponse) {
    const currencies: Currency[] = [];
    const languages: Language[] = [];

    JSONCountry.currencies.forEach((currency) => {
      currencies.push(
        new Currency(currency.code, currency.name, currency.symbol)
      );
    });

    JSONCountry.languages.forEach((language) => {
      languages.push(
        new Language(
          language.iso639_1,
          language.iso639_2,
          language.name,
          language.nativeName
        )
      );
    });

    return new Country(
      JSONCountry.flag,
      JSONCountry.name,
      JSONCountry.nativeName,
      JSONCountry.alpha3Code,
      JSONCountry.population,
      JSONCountry.region,
      JSONCountry.subregion,
      JSONCountry.capital,
      JSONCountry.topLevelDomain,
      currencies,
      languages,
      JSONCountry.borders
    );
  }
}
