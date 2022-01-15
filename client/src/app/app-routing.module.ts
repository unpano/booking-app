import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBoatsComponent } from './all-boats/all-boats.component';
import { AllCottagesComponent } from './all-cottages/all-cottages.component';
import { AllInstructorsComponent } from './all-instructors/all-instructors.component';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ClientReservationsComponent } from './client-reservations/client-reservations.component';
import { DeactivationComponent } from './deactivation/deactivation.component';
import { DeleteBoatComponent } from './delete-boat/delete-boat.component';
import { DeleteCottageComponent } from './delete-cottage/delete-cottage.component';
import { HomePageAdminComponent } from './home-page-admin/home-page-admin.component';
import { HomePageBoatOwnerComponent } from './home-page-boat-owner/home-page-boat-owner.component';
import { HomePageClientComponent } from './home-page-client/home-page-client.component';
import { HomePageCottageOwnerComponent } from './home-page-cottage-owner/home-page-cottage-owner.component';
import { HomePageInstructorComponent } from './home-page-instructor/home-page-instructor.component';
import { HomePageUnauthenticatedUserComponent } from './home-page-unauthenticated-user/home-page-unauthenticated-user.component';
import { ListCottageFutureReservationsComponent } from './list-cottage-future-reservations/list-cottage-future-reservations.component';
import { ListCottagePastReservationsComponent } from './list-cottage-past-reservations/list-cottage-past-reservations.component';
import { LoginComponent } from './login/login.component';
import { NewActionComponent } from './new-action/new-action.component';
import { NewBoatComponent } from './new-boat/new-boat.component';
import { NewCottageComponent } from './new-cottage/new-cottage.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileBoatComponent } from './profile-boat/profile-boat.component';
import { ProfileCottageComponent } from './profile-cottage/profile-cottage.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReportCottageOwnerComponent } from './report-cottage-owner/report-cottage-owner.component';
import { ReportReservationComponent } from './report-reservation/report-reservation.component';

const routes: Routes = [
  {path: '', component: HomePageUnauthenticatedUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},

  {path: 'instructor', component: HomePageInstructorComponent},
  {path: 'admin', component: HomePageAdminComponent},
  {path: 'client', component: HomePageClientComponent},

  {path: 'profile', component: ProfileComponent},
  {path: 'profile/change-password', component: ChangePasswordComponent},
  {path: 'profile/delete-account', component: DeactivationComponent},

  {path: 'allCottages', component: AllCottagesComponent},
  {path: 'allInstructors', component: AllInstructorsComponent},

  {path: 'boat', component: ProfileBoatComponent},
  {path: 'boat/delete', component: DeleteBoatComponent},
  {path: 'boat/action', component: NewActionComponent},
  {path: 'boats', component: HomePageBoatOwnerComponent},
  {path: 'boats/new-boat', component: NewBoatComponent},

  {path: 'Boats', component: AllBoatsComponent},
  
  {path: 'cottage', component: ProfileCottageComponent},
  {path: 'cottage/reserve', component: NewReservationComponent},
  {path: 'cottage/action', component: NewActionComponent},
  {path: 'cottage/future-reservations', component: ListCottageFutureReservationsComponent},
  {path: 'cottage/past-reservations', component: ListCottagePastReservationsComponent},
  {path: 'cottage/past-reservations/report', component: ReportReservationComponent},
  {path: 'cottage/delete', component: DeleteCottageComponent},

  {path: 'cottages', component: HomePageCottageOwnerComponent},
  {path: 'cottages/new-cottage', component: NewCottageComponent},

  {path: 'report', component: ReportCottageOwnerComponent},
  {path: 'clientReservations', component: ClientReservationsComponent},

  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
