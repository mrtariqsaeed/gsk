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
  selectedIndex = 0;
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
        this.assessorID = String(this.assessors[0].id);
      }
    }, err => console.log(err));
  }

  stepSelected(value: any){
    this.selectedIndex = value.selectedIndex;
  }

  agree()
  {
    this.currentService.currentAssessorID = Number(this.assessorID);
    this.router.navigate(['/assessment']);
  }
}
