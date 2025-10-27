import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const FBURL = 'https://ng-course-recipe-book-f25-default-rtdb.firebaseio.com/';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private http = inject(HttpClient);

  get<T>(endpoint: string) {
    const api = FBURL + endpoint.toLowerCase() + '.json';
    return this.http.get<T>(api);
  }

  put(endpoint: string, data) {
    const api = FBURL + endpoint.toLowerCase() + '.json';
    this.http.put(api, data).subscribe(response => {
      // console.log(response);
    });
  }
  
}
