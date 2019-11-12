import { Injectable } from '@angular/core';
import { Assessor } from '../models/assessorInterface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssessorsService {

  constructor(public http: HttpClient) {}

  getAssessors(id: number): Observable<Assessor[]>
  {
    return this.http.post<Assessor[]>(environment.assessorsAPI, {"id": id});
  }
}
