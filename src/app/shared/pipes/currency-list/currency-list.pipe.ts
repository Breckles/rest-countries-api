import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currencyList',
})
export class CurrencyListPipe implements PipeTransform {
  /**
   * Create a string that is a comma separated list of name properties of the objects passed in as an array
   * @param {any[]} objects An array of objects. The objects must contain a 'name' property that is a string
   * @returns {string} A comma separated list containing all the 'name' properties of the objects
   */
  transform(objects: any[]): string {
    return objects.map((object) => object.name).join(', ');
  }
}
