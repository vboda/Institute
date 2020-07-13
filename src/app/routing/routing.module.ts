import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ProfileComponent } from '../profile/profile.component';
import { UserComponent } from '../user/user.component';
import { DataComponent } from '../user/data/data.component';
import { AdminComponent } from '../user/admin/admin.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'user', component: UserComponent, children: [
    {path: '', redirectTo: '/user/profile', pathMatch: 'full'},
    {path: 'profile', component: ProfileComponent},
    {path: 'data', component: DataComponent},
    {path: 'admin', component: AdminComponent}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RoutingModule { }
