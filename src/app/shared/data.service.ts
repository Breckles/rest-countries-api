import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private rootURL = 'https://restcountries.er/rest/v2/';

  constructor(private http: HttpClient) {}

  /**
   *
   * @param {string} apiEndPoint The API endpoint to append to the API root URL.
   * Must not include a leading forward slash (eg. 'endpoint' and NOT
   * '/endpoint')
   */
  public getData(apiEndPoint: string) {
    return this.http.get(`${this.rootURL}`);
  }
}
