import { Component, OnInit } from '@angular/core';
import { CurrentService } from '../../services/current.service';
import { Router } from '@angular/router';

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

  constructor(public currentService: CurrentService, public router: Router) { }

  ngOnInit() {
    this.currentEmpType = this.currentService.currentEmpType;
    this.currentService.getCurrent();

    setTimeout(() => {
      if(this.currentService.currentEmpID == 1000)
      {
        this.router.navigate(['/finish-admin']);
      } else {
        this.getCurrentIDs();
        this.getCurrentEmp();
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
      console.log(data, this.currentService.currentEmpID);
      if (data) {
        this.currentIDs = data;
        this.index = data.indexOf(Number(this.currentService.currentEmpID));
        console.log(this.index);
      }
    });
  }

  nextEmp() {
    if((this.index + 2) >= this.currentIDs.length)
    {
      this.currentService.nextEmp(1000).subscribe(res => {
        console.log(res);
        this.router.navigate(['/finish-admin']);
      });
    } else {
      this.index++;
      console.log(this.index);
      this.currentService.nextEmp(this.currentIDs[this.index]).subscribe(res => {
        console.log(res);
        this.currentService.getEmpByID(this.currentIDs[this.index]).subscribe(data => {
          if (data) {
            console.log(data);
            this.currentEmp = data;
          }
        });
      });
    }
    
  }

}
