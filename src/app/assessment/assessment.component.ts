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
  currentInterval = interval(3000);
  statusInterval = interval(3000);

  sub1: Subscription = new Subscription();
  sub2: Subscription = new Subscription();

  currentEmpID = 0;

  a: string;
  b: string;
  c: string;

  status: Number;
  review = {} as Review;

  constructor(public currentService: CurrentService, public http: HttpClient, public router: Router, public reviewService: ReviewService) { }

  ngOnInit() {
    this.sub2 = this.statusInterval.subscribe(val => this.currentStatusFN());
    this.sub1 = this.currentInterval.subscribe(val => this.currentService.getCurrent());

    setTimeout(() => {
      this.currentService.current$.subscribe((data: Current) => {
        console.log("Current$ -> ", data);
        this.currentEmpType = data.emp_type;
        
  
        if (data.emp_id == 0) 
        {
          console.log('1');
          this.show = false;
          this.currentEmpID = data.emp_id;
        }
        else if (data.emp_id != 0 && data.emp_id != 1000 && data.emp_id != this.currentEmpID) 
        {
          console.log('2 -> ', data);
          this.currentEmpID = data.emp_id;
          
          this.currentService.getCurrentEmp().subscribe(data => {
            if (data) {
              this.currentEmp = data;
            }
          }, err => console.log(err));
        } 
        else if (data.emp_id == 1000) 
        {
          console.log('3');
          this.router.navigate(['/finish']);
        }
      });
    }, 1000);

  }

  currentStatusFN() {
    this.currentService.currentStatusFN(Number(localStorage.getItem("assessorID"))).subscribe(res => {
      console.log("Status -> ", res);
      if (res) this.status = Number(res.status);

      if (this.status == 0) {
        
        if (this.currentEmpID != 0 && this.currentEmpID != 1000) {
          console.log("Zero Status!");
          this.show = true;
        }
      }
    }, err => {
      console.log("Status -> ", err);
      localStorage.clear();
      this.router.navigate(['/login']);
    });
  }

  submitReview() {
    this.show = false;

    this.review.emp_id = this.currentEmpID;
    this.review.emp_type = this.currentService.currentEmpType;
    this.review.assessor_id = Number(localStorage.getItem("assessorID"));
    this.review.a = Number(this.a);
    this.review.b = Number(this.b);
    this.review.c = Number(this.c);
    console.log(this.review);
    this.reviewService.submitReview(this.review).subscribe(res => {
      console.log("Review -> ", res);
      this.a = this.b = this.c = undefined;
    }, err => console.log("Review -> ", err));
  }

  skipReviewFN() {
    this.show = false;
    // this.currentEmp = undefined;

    this.reviewService.skipReviewFN(Number(localStorage.getItem("assessorID"))).subscribe(res => {
      console.log("Skip -> ", res);
    }, err => console.log("Skip -> ", err));
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }

}
