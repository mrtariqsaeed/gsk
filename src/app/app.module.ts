import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { MaterialModule } from '../material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AssessmentComponent } from './assessment/assessment.component';
import { AssessmentAdminComponent } from './assessment-admin/assessment-admin.component';
import { FinishComponent } from './finish/finish.component';
import { SetupComponent } from './setup/setup.component';
import { FinishAdminComponent } from './finish-admin/finish-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AssessmentComponent,
    AssessmentAdminComponent,
    FinishComponent,
    SetupComponent,
    FinishAdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
