import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PhoneNumberComponent } from './phone-number/phone-number.component';
import { ServiceComponent } from './service/service.component';

const routes: Routes = [
  {path: '', redirectTo: '/phone', pathMatch: 'full'},
  {path: 'phone', component: PhoneNumberComponent},
  {path: 'service', component: ServiceComponent},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
