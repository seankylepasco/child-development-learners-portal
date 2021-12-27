import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // HTTP

@Injectable({
  providedIn: 'root'
})
export class DataService {

  // URL ----------------------------------------

  URL = 'http://localhost:8080/Menu-Management/api/';

  // USE HTTP CLIENT ----------------------------

  constructor(private http: HttpClient) {}

  // GET DATA FROM API --------------------------

  public getData(endpoint: any, results: any) {
    return  <any>( 
      this.http.post(this.URL + endpoint, btoa(JSON.stringify(results)))
    );
  }
}
