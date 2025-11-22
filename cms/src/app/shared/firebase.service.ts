import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const FBURL = 'https://ng-course-recipe-book-f25-default-rtdb.firebaseio.com/';
const NJSURL = 'http://localhost:3000/';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private http = inject(HttpClient);

  get<T>(endpoint: string) {
    // const api = FBURL + endpoint.toLowerCase() + '.json';
    const api = NJSURL + endpoint.toLowerCase();
    return this.http.get<T>(api);
  }

  put(endpoint: string, data) {
    const api = FBURL + endpoint.toLowerCase() + '.json';
    this.http.put(api, data).subscribe(response => {
      // console.log(response);
    });
  }

  post<T>(endpoint: string, data: T) {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const api = NJSURL + endpoint.toLocaleLowerCase();
    return this.http.post<{message: string, data: T}>(api, data, {headers: headers});
  }
  
}
