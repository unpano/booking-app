import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBoatsComponent } from './all-boats/all-boats.component';
import { AllCottagesComponent } from './all-cottages/all-cottages.component';
import { AllInstructorsComponent } from './all-instructors/all-instructors.component';
import { AppComponent } from './app.component';
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DeactivationComponent } from './deactivation/deactivation.component';
import { HomePageAdminComponent } from './home-page-admin/home-page-admin.component';
import { HomePageBoatOwnerComponent } from './home-page-boat-owner/home-page-boat-owner.component';
import { HomePageClientComponent } from './home-page-client/home-page-client.component';
import { HomePageCottageOwnerComponent } from './home-page-cottage-owner/home-page-cottage-owner.component';
import { HomePageInstructorComponent } from './home-page-instructor/home-page-instructor.component';
import { HomePageUnauthenticatedUserComponent } from './home-page-unauthenticated-user/home-page-unauthenticated-user.component';
import { LoginComponent } from './login/login.component';
import { NewCottageComponent } from './new-cottage/new-cottage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileCottageComponent } from './profile-cottage/profile-cottage.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReportCottageOwnerComponent } from './report-cottage-owner/report-cottage-owner.component';

const routes: Routes = [
  {path: '', component: HomePageUnauthenticatedUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'boatOwner', component: HomePageBoatOwnerComponent},
  {path: 'instructor', component: HomePageInstructorComponent},
  {path: 'admin', component: HomePageAdminComponent},
  {path: 'client', component: HomePageClientComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'profile/change-password', component: ChangePasswordComponent},
  {path: 'profile/delete-account', component: DeactivationComponent},
  {path: 'cottageOwner/report', component: ReportCottageOwnerComponent},
  {path: 'boatDetails', component: BoatDetailsComponent},
  {path: 'boats', component: AllBoatsComponent},
  {path: 'allCottages', component: AllCottagesComponent},
  {path: 'allInstructors', component: AllInstructorsComponent},
  {path: 'cottage', component: ProfileCottageComponent},
  {path: 'cottages', component: HomePageCottageOwnerComponent},
  {path: 'cottages/new-cottage', component: NewCottageComponent},
  {path: 'report', component: ReportCottageOwnerComponent},
  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
