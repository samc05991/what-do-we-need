import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CreateListComponent } from './components/create-list/create-list.component';
import { ManageInventoryComponent } from './components/manage-inventory/manage-inventory.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create-list', component: CreateListComponent },
  { path: 'manage-inventory', component: ManageInventoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
