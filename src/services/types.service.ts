import { Injectable } from '@angular/core';
import { Type } from '../models/typeInterface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TypesService {
  url: string = environment.typesAPI;

  constructor(public http: HttpClient) {}

  getTypes(): Observable<Type[]> {
    return this.http.get<Type[]>(this.url);
  }
}
