import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../../services/current.service';
import { Router } from '@angular/router';
import { Subscription, interval } from 'rxjs';
import { AssessorsService } from "../../services/assessors.service";
import { Assessor } from '../../models/assessorInterface';
import { CurrentAssessor } from '../../models/currentAssessorInterface';

@Component({
  selector: 'app-assessment-admin',
  templateUrl: './assessment-admin.component.html',
  styleUrls: ['./assessment-admin.component.css']
})
export class AssessmentAdminComponent implements OnInit {
  currentEmp: any;
  currentEmpType: string;
  currentIDs: number[];
  index: number;
  sub1: Subscription = new Subscription();
  currentInterval = interval(2000);
  currentAssessors: CurrentAssessor[];
  i: number;
  c: number;
  next: boolean;

  constructor(public currentService: CurrentService, public router: Router, public assessorsService: AssessorsService) { }

  ngOnInit() {
    
    this.currentService.getCurrent();

    setTimeout(() => {
      if(this.currentService.currentEmpID == 1000)
      {
        this.router.navigate(['/finish-admin']);
      } else {
        this.currentEmpType = this.currentService.currentEmpType;
        this.getCurrentIDs();
        this.getCurrentEmp();
        this.getAssessors();
      }
    }, 1000);
  }

  getCurrentEmp()
  {
    this.currentService.getCurrentEmp().subscribe(data => {
      if (data) {
        this.currentEmp = data;
      }
    });
  }

  getCurrentIDs()
  {
    this.currentService.getCurrentIDs().subscribe((data: number[]) => {
      if (data) {
        this.currentIDs = data;
        this.index = data.indexOf(Number(this.currentService.currentEmpID));
      }
    });
  }

  getAssessors()
  {
    this.assessorsService.currentAssessors$.subscribe((data: CurrentAssessor[]) => {
      console.log(data);
      this.currentAssessors = data;
      this.i = 0;
      this.c = 0;
      data.forEach((assessor: CurrentAssessor) => {
        this.i++;
        if(Number(assessor.status) === 0) this.c++;

        if(this.i == data.length) this.checkNext();
      })
    })
    this.sub1 = this.currentInterval.subscribe(val => this.assessorsService.currentAssessors());
  }
  
  checkNext() {
    if(this.c > 0) {
      this.next = false;
    }else {
      this.next = true;
      this.sub1.unsubscribe();
    }
  }

  nextEmp() {
    if((this.index + 2) > this.currentIDs.length)
    {
      this.currentService.nextEmp(1000).subscribe(res => {
        this.router.navigate(['/finish-admin']);
      });
    } else {
      this.index++;
      this.currentService.nextEmp(this.currentIDs[this.index]).subscribe(res => {
        this.currentService.getEmpByID(this.currentIDs[this.index]).subscribe(data => {
          if (data) {
            this.currentEmp = data;
            this.sub1 = this.currentInterval.subscribe(val => this.assessorsService.currentAssessors());
          }
        });
      });
    }
  }

  revoteFN(id: number) {
    console.log(id);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
