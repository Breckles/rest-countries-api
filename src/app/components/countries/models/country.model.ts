import { RestCountriesAPIResponse } from 'src/app/shared/services/data/data.service';
import { Currency } from './currency.model';
import { Language } from './language.model';
import { Languages } from './languages.model';

export class Country {
  constructor(
    readonly flag: string,
    readonly name: string,
    readonly cca3: string,
    readonly population: number,
    readonly region: string,
    readonly subregion: string,
    readonly capital: string,
    readonly currencies: Currency[],
    readonly languages: string[],
    /**
     * @param borders A list of alpha3Codes for bordering countries
     */
    readonly borders: string[]
  ) {}

  static convertJSONToCountry(JSONCountry: RestCountriesAPIResponse) {
    const currencies: Currency[] = [];
    const languages: string[] = [];

    for (const code in JSONCountry.currencies) {
      if (Object.prototype.hasOwnProperty.call(JSONCountry.currencies, code)) {
        const element = JSONCountry.currencies[code];
        currencies.push({ name: element.name, symbol: element.symbol });
      }
    }

    for (const iso639_2 in JSONCountry.languages) {
      if (
        Object.prototype.hasOwnProperty.call(JSONCountry.languages, iso639_2)
      ) {
        const element = JSONCountry.languages[iso639_2];
        // languages = { ...languages, iso639_2: element };
        languages.push(element);
      }
    }
    if (JSONCountry.cca3 === 'PRY') {
    }
    console.log(JSONCountry);

    const newCountry = new Country(
      JSONCountry.flags.svg,
      JSONCountry.name.official,
      JSONCountry.cca3,
      JSONCountry.population,
      JSONCountry.region,
      JSONCountry.subregion,
      JSONCountry.capital ? JSONCountry.capital[0] : '',
      currencies,
      languages,
      JSONCountry.borders
    );
    return newCountry;
  }
}
