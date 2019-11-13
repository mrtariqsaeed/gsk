import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Current } from '../models/currentInterface';
import { environment } from '../environments/environment';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentService {
  current$ = new BehaviorSubject<Current>({team_id: 1, emp_id: 0, emp_type: "mr"});
  currentEmp: any;
  show$ = new BehaviorSubject<boolean>(false);
  show = false;
  currentEmpID = 0;
  currentEmpType = 'mr';
  currentTeamID = 1;
  currentAssessorID: number;

  constructor(public http: HttpClient) {
    this.getCurrent();
  }

  getCurrent() {
    this.http.get<Current>(environment.currentAPI).subscribe((data: Current) => {
      if(data.emp_id != this.currentEmpID){
        this.currentEmpID = data.emp_id;
        this.currentEmpType = data.emp_type;
        this.currentTeamID = data.team_id;
        this.current$.next(data);
      }
    });
    
  }

  getCurrentEmp(): any
  {
    return this.http.post(environment.empDataAPI, {"id": this.currentEmpID, "emp_type": this.currentEmpType});
  }

  getEmpByID(id: number): any
  {
    return this.http.post(environment.empDataAPI, {"id": id, "emp_type": this.currentEmpType});
  }

  getCurrentIDs(): Observable<number[]>
  {
    if(this.currentEmpType)
    {
      return this.http.post<number[]>(environment.currentIDsAPI, {"emp_type": this.currentEmpType, "team_id": this.currentTeamID});
    }else{
      return of([]);
    }
  }

  updateCurrent(data: Current): Observable<any>
  {
    return this.http.post(environment.updateCurrentAPI, data);
  }

  nextEmp(id: number)
  {
    return this.http.post(environment.nextEmpAPI, {"id": id});
  }
}