import { Component, OnInit } from '@angular/core';
import { Current } from '../../models/currentInterface';
import { CurrentService } from '../../services/current.service';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, interval, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Review } from '../../models/reviewInterface';
import { ReviewService } from 'src/services/review.service';

@Component({
  selector: 'app-assessment',
  templateUrl: './assessment.component.html',
  styleUrls: ['./assessment.component.css']
})

export class AssessmentComponent implements OnInit {
  current: Current;
  currentEmp: any;
  currentEmpType: string;
  show$ = new BehaviorSubject<boolean>(false);
  show: boolean = false;
  currentInterval = interval(2000);
  sub1: Subscription = new Subscription();
  emp_id = 0;
  a = '0';
  b = '0';
  c = '0';

  review = {} as Review;

  constructor(public currentService: CurrentService, public http: HttpClient, public router: Router, public reviewService: ReviewService) { }

  ngOnInit() {
    this.currentService.current$.subscribe((data: Current) => {
      this.currentEmpType = data.emp_type;
      if(data.emp_id == 0){
        this.show = false;
        this.currentEmp = undefined;
        this.sub1 = this.currentInterval.subscribe(val => this.currentService.getCurrent());
      }else if(data.emp_id != this.emp_id && data.emp_id != 1000){
        this.show = true;
        this.emp_id = data.emp_id;
        this.currentService.getCurrentEmp().subscribe(data => {
          if(data) {
            this.currentEmp = data;
          }
        }, err => console.log(err));
        this.sub1.unsubscribe();
      }else if(data.emp_id == 1000) {
        this.router.navigate(['/finish']);
      }
    });
  }

  submitReview()
  {
    this.show = false;
    this.currentEmp = false;

    this.review.emp_id = this.emp_id;
    this.review.emp_type = this.currentService.currentEmpType;
    this.review.assessor_id = Number(localStorage.getItem("assessorID"));
    this.review.a = Number(this.a);
    this.review.b = Number(this.b);
    this.review.c = Number(this.c);

    this.reviewService.submitReview(this.review).subscribe(res => {
      this.sub1 = this.currentInterval.subscribe(val => this.currentService.getCurrent());
    }, err => console.log(err));
  }

  ngOnDestroy()
  {
    this.sub1.unsubscribe();
  }

}
