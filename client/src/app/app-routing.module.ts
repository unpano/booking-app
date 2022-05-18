import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBoatsComponent } from './all-boats/all-boats.component';
import { AllCottagesComponent } from './all-cottages/all-cottages.component';
import { AllInstructorsComponent } from './all-instructors/all-instructors.component';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ClientReservationsComponent } from './client-reservations/client-reservations.component';
import { ClientsBookedActionComponent } from './clients-booked-action/clients-booked-action.component';
import { DeactivationComponent } from './deactivation/deactivation.component';
import { DeleteCottageComponent } from './delete-cottage/delete-cottage.component';
import { EditActionAdventureComponent } from './edit-action-adventure/edit-action-adventure.component';
import { EditInstructorPasswordComponent } from './edit-instructor-password/edit-instructor-password.component';
import { EditProfileAdventureComponent } from './edit-profile-adventure/edit-profile-adventure.component';
import { EditProfileInstructorComponent } from './edit-profile-instructor/edit-profile-instructor.component';
import { HomePageAdminComponent } from './home-page-admin/home-page-admin.component';
import { HomePageBoatOwnerComponent } from './home-page-boat-owner/home-page-boat-owner.component';
import { HomePageClientComponent } from './home-page-client/home-page-client.component';
import { HomePageCottageOwnerComponent } from './home-page-cottage-owner/home-page-cottage-owner.component';
import { HomePageInstructorComponent } from './home-page-instructor/home-page-instructor.component';
import { HomePageUnauthenticatedUserComponent } from './home-page-unauthenticated-user/home-page-unauthenticated-user.component';
import { ListCottageFutureReservationsComponent } from './list-cottage-future-reservations/list-cottage-future-reservations.component';
import { ListCottagePastReservationsComponent } from './list-cottage-past-reservations/list-cottage-past-reservations.component';
import { LoginComponent } from './login/login.component';
import { NewActionAdventureComponent } from './new-action-adventure/new-action-adventure.component';
import { NewActionComponent } from './new-action/new-action.component';
import { NewAdventureFishingComponent } from './new-adventure-fishing/new-adventure-fishing.component';
import { NewCottageComponent } from './new-cottage/new-cottage.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { ProfileAdventureFishingClassComponent } from './profile-adventure-fishing-class/profile-adventure-fishing-class.component';
import { ProfileBoatComponent } from './profile-boat/profile-boat.component';
import { ProfileCottageComponent } from './profile-cottage/profile-cottage.component';
import { ProfileInstructorComponent } from './profile-instructor/profile-instructor.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReportAboutClientsComponent } from './report-about-clients/report-about-clients.component';
import { ReportCottageOwnerComponent } from './report-cottage-owner/report-cottage-owner.component';
import { ReportReservationComponent } from './report-reservation/report-reservation.component';
import { UnverifiedUsersComponent } from './unverified-users/unverified-users.component';
import { VerifiedUsersComponent } from './verified-users/verified-users.component';
import { ViewReportActionComponent } from './view-report-action/view-report-action.component';

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
  

  {path: 'profile-admin',component:ProfileAdminComponent},
  {path: 'boats', component: AllBoatsComponent},
  {path: 'allCottages', component: AllCottagesComponent},
  {path: 'allInstructors', component: AllInstructorsComponent},

  {path: 'cottage', component: ProfileCottageComponent},
  {path: 'boat', component: ProfileBoatComponent},
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

  {path: 'unverified-users',component:UnverifiedUsersComponent},
  {path:'verified-users',component:VerifiedUsersComponent},
  {path:'profile-adventure-fishing-class/:id',component:ProfileAdventureFishingClassComponent},
  {path:'profile-instructor',component:ProfileInstructorComponent},
  {path: 'new-adventure-fishing/instructorId/:id',component:NewAdventureFishingComponent},
  {path: 'edit-profile-adventure/:id',component:EditProfileAdventureComponent},
  {path: 'new-action-adventure/:id',component:NewActionAdventureComponent},
  {path: 'edit-action-adventure/:id',component:EditActionAdventureComponent},
  {path: 'profile-instructor/:id',component:ProfileInstructorComponent},
  {path: 'edit-profile-instructor/:id',component:EditProfileInstructorComponent},
  {path: 'edit-instructor-password/:id',component:EditInstructorPasswordComponent},
  {path: 'clients-booked-action/:id',component:ClientsBookedActionComponent},
  {path: 'report-about-clients/actionId/:actionId/clientId/:clientId',component:ReportAboutClientsComponent},
  {path: 'view-report-action/actionId/:actionId/clientId/:clientId',component:ViewReportActionComponent},


  {path: '**', component: PageNotFoundComponent},
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
