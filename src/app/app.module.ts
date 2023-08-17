import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';


import { AppComponent } from './app.component';
import { EmployeeComponent } from './employee/employee.component';
import { JobTitleComponent } from './job-title/job-title.component';
import { JobPositionComponent } from './job-position/job-position.component';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { JobTitleService } from './services/job-title.service';
import { JobPositionService } from './services/job-position.service';
import { EmployeeService } from './services/employee.service';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'    
  },
  {
    path: 'home',
    component: HomeComponent   
  },
  {
    path: 'job-title',
    component: JobTitleComponent
  },
  {
    path: 'job-position',
    component: JobPositionComponent
  },
  {
    path: 'employee',
    component: EmployeeComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    JobTitleComponent,
    JobPositionComponent,
    HomeComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' }),
    BrowserModule,
    DxDataGridModule,
    DxButtonModule,
    HttpClientModule
  ],
  providers: [JobTitleService, JobPositionService, EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
