import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@app/config/apiurl.config';
import { CategoriesResponse, Category } from '@app/interfaces/category.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  private url = API_URL.categories;
  constructor(private http: HttpClient) {}

  getAllCategory():Observable<any>{
    return this.http.get<any>(this.url);
  }
}
