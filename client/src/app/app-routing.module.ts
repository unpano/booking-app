import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBoatsComponent } from './all-boats/all-boats.component';
import { AppComponent } from './app.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeactivationComponent } from './deactivation/deactivation.component';
import { HomePageAdminComponent } from './home-page-admin/home-page-admin.component';
import { HomePageBoatOwnerComponent } from './home-page-boat-owner/home-page-boat-owner.component';
import { HomePageClientComponent } from './home-page-client/home-page-client.component';
import { HomePageCottageOwnerComponent } from './home-page-cottage-owner/home-page-cottage-owner.component';
import { HomePageInstructorComponent } from './home-page-instructor/home-page-instructor.component';
import { HomePageUnauthenticatedUserComponent } from './home-page-unauthenticated-user/home-page-unauthenticated-user.component';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReportCottageOwnerComponent } from './report-cottage-owner/report-cottage-owner.component';

const routes: Routes = [
  {path: '', component: HomePageUnauthenticatedUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'cottageOwner', component: HomePageCottageOwnerComponent},
  {path: 'boatOwner', component: HomePageBoatOwnerComponent},
  {path: 'instructor', component: HomePageInstructorComponent},
  {path: 'admin', component: HomePageAdminComponent},
  {path: 'client', component: HomePageClientComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/change-password', component: ChangePasswordComponent},
  {path: 'profile/delete-account', component: DeactivationComponent},
  {path: 'cottageOwner/report', component: ReportCottageOwnerComponent},
  {path: '**', component: PageNotFoundComponent},
  {path: 'boats', component: AllBoatsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
