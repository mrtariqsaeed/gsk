import { Injectable } from '@angular/core';
import { Assessor } from '../models/assessorInterface';
import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { CurrentAssessor } from '../models/currentAssessorInterface';

@Injectable({
  providedIn: 'root'
})

export class AssessorsService {
  currentAssessors$ = new BehaviorSubject<CurrentAssessor[]>([]);
  constructor(public http: HttpClient) {}

  getAssessors(id: number): Observable<Assessor[]>
  {
    return this.http.post<Assessor[]>(environment.assessorsAPI, {"id": id});
  }

  getAssessorByID(id: number): Observable<Assessor> {
    return this.http.post<Assessor>(environment.empDataAPI, {emp_type: "assessors", emp_id: id});
  }

  assessorLogin(assessor: Assessor): Observable<any> {
    return this.http.post(environment.assessorLoginAPI, assessor);
  }

  currentAssessors() {
    this.http.get<CurrentAssessor[]>(environment.currentAssessorsAPI).subscribe((data: CurrentAssessor[]) => {
      if(data)
      {
        this.currentAssessors$.next(data);
      }
    });
  }

  deleteAllAssessors(): Observable<any> {
    return this.http.post(environment.deleteAllAssessorsAPI, {});
  }

  deleteAssessorFN(id: number): Observable<any> {
    return this.http.post(environment.deleteAssessorAPI, {assessor_id: id});
  }
}
