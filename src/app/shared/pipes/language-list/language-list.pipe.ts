import { Pipe, PipeTransform } from '@angular/core';
import { Languages } from 'src/app/components/countries/models/languages.model';

@Pipe({
  name: 'languageList',
})
export class LanguageListPipe implements PipeTransform {
  transform(languages: string[]): string {
    return languages.join(', ');
  }
}
