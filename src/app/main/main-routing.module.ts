import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      { path: "", redirectTo: "profile", pathMatch: "full" },
      {
        path: "profile",
        component: ProfileComponent,
      },
      {
        path: "users",
        component: UsersComponent,
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
