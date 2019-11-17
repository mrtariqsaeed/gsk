import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AssessmentComponent } from './assessment/assessment.component';
import { AssessmentAdminComponent } from './assessment-admin/assessment-admin.component';
import { FinishComponent } from './finish/finish.component';
import { SetupComponent } from './setup/setup.component';
import { FinishAdminComponent } from './finish-admin/finish-admin.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'assessment', component: AssessmentComponent},
  {path: 'assessment-admin', component: AssessmentAdminComponent},
  {path: 'finish', component: FinishComponent},
  {path: 'finish-admin', component: FinishAdminComponent},
  {path: 'setup', component: SetupComponent},
  {path: 'admin', component: AdminComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
