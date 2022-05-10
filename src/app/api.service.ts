import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private http: HttpClient) {}

  getProduct(barcode: string) {
    return this.http.get(environment.api_url + 'product/' + barcode).pipe(
      map((data: any) => {
        return data;
      })
    );
  }
}
