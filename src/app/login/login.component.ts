import { Component, OnInit } from '@angular/core';
import { TypesService } from 'src/services/types.service';
import { Type } from '../../models/typeInterface';
import { AssessorsService } from '../../services/assessors.service';
import { Assessor } from '../../models/assessorInterface';
import { Router } from '@angular/router';
import { CurrentService } from 'src/services/current.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  types: Type[];
  assessors: Assessor[];
  typeID = "1";
  assessorID: string;

  constructor(public typesService: TypesService, public assessorsService: AssessorsService, public router: Router, public currentService: CurrentService) {}

  ngOnInit() {
    this.getTypes();
    this.getAssessors();
  }

  getTypes()
  {
    this.typesService.getTypes().subscribe((data: Type[]) => {
      this.types = data;
    }, err => console.log(err));
  }

  getAssessors()
  {
    this.assessorsService.getAssessors(Number(this.typeID)).subscribe((data: Assessor[]) => {
      console.log(data);
      this.assessors = data;
      if(this.assessors.length > 0)
      {
        this.assessors = data;
      }
    }, err => console.log(err));
  }

  agree()
  {
    localStorage.setItem("assessorID", this.assessorID);
    let assessor = this.assessors.find(x => x.id == Number(this.assessorID));
    if(assessor)
    {
      this.assessorsService.assessorLogin(assessor).subscribe(res => {
        this.currentService.getCurrent();
        this.router.navigate(['/assessment']);
      }, err => console.log(err));
    } else {
      console.log("Assessor Not Found!");
    }
  }
}
