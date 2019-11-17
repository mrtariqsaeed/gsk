import { Component, OnInit } from '@angular/core';
import { AssessorsService } from 'src/services/assessors.service';
import { CurrentAssessor } from '../../models/currentAssessorInterface';
import { interval, Subscription } from 'rxjs';
import { CurrentService } from '../../services/current.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  currentAssessors: CurrentAssessor[];
  currentInterval = interval(2000);
  sub1: Subscription = new Subscription();

  constructor(public assessorsService: AssessorsService, public currentService: CurrentService, public router: Router) { }

  ngOnInit() {
    this.getAssessors();
  }

  getAssessors()
  {
    this.assessorsService.currentAssessors$.subscribe((data: CurrentAssessor[]) => {
      this.currentAssessors = data;
    })
    this.sub1 = this.currentInterval.subscribe(val => this.assessorsService.currentAssessors());
  }

  newAssessmentFN() {
    this.router.navigate(['/setup']);
  }

  deleteAssessorFN(id: number) {
    this.assessorsService.deleteAssessorFN(id).subscribe(res => console.log("Delete Assessor: ", res), err => console.log("Delete Assessor: ", err));
  }

  deleteAllAssessorsFN() {
    this.assessorsService.deleteAllAssessors().subscribe(res => {
      alert("Success!");
      console.log("Delete All -> ", res);
    }, err => console.log("Reset -> ", err));
  }

  closeAssessments() {
    this.currentService.resetFN().subscribe(res => {
      alert("Success!");
      console.log("Reset -> ", res);
    }, err => console.log("Reset -> ", err));
  }

  ngOnDestroy() { 
    this.sub1.unsubscribe();
  }

}
