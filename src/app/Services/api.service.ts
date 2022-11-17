import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
const endpoint = 'https://api.publicapis.org/entries'; 

@Injectable({
  providedIn: 'root'
})
export class ApiService {
   constructor(private http:HttpClient) { }
    
  getData():Observable<any>{
    return this.http.get<any>(endpoint);
  }
}
