import { Injectable } from '@angular/core';
import { Team } from '../models/teamInterface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamsService {
  teams: Team[];
  constructor(public http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<Team[]>(environment.teamsAPI);
  }
}
