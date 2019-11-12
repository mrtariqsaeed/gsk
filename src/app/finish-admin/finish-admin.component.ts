import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-finish-admin',
  templateUrl: './finish-admin.component.html',
  styleUrls: ['./finish-admin.component.css']
})
export class FinishAdminComponent implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  newAssessment()
  {
    this.router.navigate(['/setup'])
  }
}
