import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  URL: any = 'http://localhost/child-development-learners-portal/api/';
  //URL: any = 'http://cdlp-portal.com/api/';

  constructor(private http: HttpClient) {}

  public fetchData(endpoint: any, results: any) {
    return this.http.post<any>(this.URL + endpoint, JSON.stringify(results));
  }
}
