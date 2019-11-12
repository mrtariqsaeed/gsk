import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../../services/current.service';
import { Team } from '../../models/teamInterface';
import { TeamsService } from 'src/services/teams.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.css']
})
export class SetupComponent implements OnInit {
  teams: Team[];
  teamID = '1';
  data = {team_id: 1, emp_id: 1, emp_type: 'sll'};

  constructor(public currentService: CurrentService, public teamsService: TeamsService, public router: Router) { }

  ngOnInit() {
    this.teamsService.getTeams().subscribe((data: Team[]) => {
      this.teams = data;
    });
  }

  startAssessment()
  {
    this.data.team_id = Number(this.teamID);
    this.currentService.updateCurrent(this.data).subscribe(res => {
      console.log(res);
      this.currentService.getCurrent();
      if(res) this.router.navigate(['/assessment-admin']);
    }, err => console.log(err));
  }

}
