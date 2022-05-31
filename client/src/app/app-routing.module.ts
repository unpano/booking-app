import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComplaintForInstructorComponent } from './add-complaint-for-instructor/add-complaint-for-instructor.component';
import { AddNewAdminComponent } from './add-new-admin/add-new-admin.component';
import { AddRevisionMarkForInstructorComponent } from './add-revision-mark-for-instructor/add-revision-mark-for-instructor.component';
import { AdminComplaintResponseComponent } from './admin-complaint-response/admin-complaint-response.component';
import { AdminEntitiesComponent } from './admin-entities/admin-entities.component';
import { AdminIncomeReservationsComponent } from './admin-income-reservations/admin-income-reservations.component';
import { AdminLoyaltyProgramComponent } from './admin-loyalty-program/admin-loyalty-program.component';
import { AdminPunishClientsComponent } from './admin-punish-clients/admin-punish-clients.component';
import { AdminRequestsDeletingAccountComponent } from './admin-requests-deleting-account/admin-requests-deleting-account.component';
import { AllBoatsComponent } from './all-boats/all-boats.component';
import { AllCottagesComponent } from './all-cottages/all-cottages.component';
import { AllInstructorsComponent } from './all-instructors/all-instructors.component';
import { AllRevisionsMarksForInstructorsComponent } from './all-revisions-marks-for-instructors/all-revisions-marks-for-instructors.component';
import { CalendarBookingClientsComponent } from './calendar-booking-clients/calendar-booking-clients.component';
import { CalendarBookingInstructorComponent } from './calendar-booking-instructor/calendar-booking-instructor.component';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ClientNewBookingByInstructorComponent } from './client-new-booking-by-instructor/client-new-booking-by-instructor.component';
import { ClientReservationsComponent } from './client-reservations/client-reservations.component';
import { ClientViewComplaintForInstructorComponent } from './client-view-complaint-for-instructor/client-view-complaint-for-instructor.component';
import { ClientViewComplaintService } from './client-view-complaint-for-instructor/service/client-view-complaint.service';
import { ClientsBookedActionComponent } from './clients-booked-action/clients-booked-action.component';
import { DeactivationComponent } from './deactivation/deactivation.component';
import { DeleteCottageComponent } from './delete-cottage/delete-cottage.component';
import { DeletingRequestsComponent } from './deleting-requests/deleting-requests.component';
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
import { ViewActionDetailsComponent } from './view-action-details/view-action-details.component';
import { ViewReportActionComponent } from './view-report-action/view-report-action.component';
import { ViewRevisionMarkComponent } from './view-revision-mark/view-revision-mark.component';

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
  {path: 'admin-punish-clients',component:AdminPunishClientsComponent},
  {path: 'add-new-admin',component:AddNewAdminComponent},
  {path: 'admin-entities',component:AdminEntitiesComponent},
  {path: 'admin-income-reservations',component:AdminIncomeReservationsComponent},
  {path: 'view-action-details/:id',component:ViewActionDetailsComponent},
  {path: 'add-revision-mark-for-instructor/instructorId/:instructorId/clientId/:clientId',component:AddRevisionMarkForInstructorComponent},
  {path: 'view-revision-mark-for-instructor/instructorId/:instructorId/clientId/:clientId',component:ViewRevisionMarkComponent},
  {path: 'all-revisions-marks-for-instructor',component:AllRevisionsMarksForInstructorsComponent},
  {path: 'client-new-booking-by-instructor/clientId/:clientId/currentActionId/:currentActionId',component:ClientNewBookingByInstructorComponent},
  {path: 'add-complaint-for-instructor/clientId/:clientId/instructorId/:instructorId',component:AddComplaintForInstructorComponent},
  {path: 'client-view-complanit-for-instructor/clientId/:clientId/instructorId/:instructorId',component:ClientViewComplaintForInstructorComponent},
  {path: 'admin-requests-deleting-account',component:AdminRequestsDeletingAccountComponent},
  {path: 'deleting-requests/userEmail/:userEmail',component:DeletingRequestsComponent},
  {path: 'admin-complaint-response/clientId/:clientId/instructorId/:instructorId',component:AdminComplaintResponseComponent},
  {path: 'admin-loyalty-program',component:AdminLoyaltyProgramComponent},
  {path: 'calendar-booking-instructor',component:CalendarBookingInstructorComponent},
  {path: 'calendar-booking-clients/actionId/:actionId',component:CalendarBookingClientsComponent},

  {path: '**', component: PageNotFoundComponent},
  
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
