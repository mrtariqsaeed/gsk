import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Review } from '../models/reviewInterface';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(public http: HttpClient) { }

  submitReview(review: Review): Observable<any>
  {
    console.log(review);
    return this.http.post(environment.reviewAPI, review);
  }

  skipReviewFN(id: number): Observable<any> {
    return this.http.post(environment.skipAPI, {assessor_id: id})
  }
}
