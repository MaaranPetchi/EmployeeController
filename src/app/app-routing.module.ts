import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditEmployeecontrollerComponent } from './Components/EmployeeController/Components/add-edit-employeecontroller/add-edit-employeecontroller.component';
import { EmployeecontrollerComponent } from './Components/EmployeeController/Components/employeecontroller/employeecontroller.component';

const routes: Routes = [ { path: 'index', component: EmployeecontrollerComponent },
{ path: 'edit', component: AddEditEmployeecontrollerComponent },];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
