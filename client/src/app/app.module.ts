import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSortModule } from '@angular/material/sort';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AllBoatsComponent } from './all-boats/all-boats.component';
import { AllCottagesComponent } from './all-cottages/all-cottages.component';
import { HomePageCottageOwnerComponent } from './home-page-cottage-owner/home-page-cottage-owner.component';
import { HomePageBoatOwnerComponent } from './home-page-boat-owner/home-page-boat-owner.component';
import { HomePageInstructorComponent } from './home-page-instructor/home-page-instructor.component';
import { HomePageClientComponent } from './home-page-client/home-page-client.component';
import { HomePageAdminComponent } from './home-page-admin/home-page-admin.component';
import { HeaderCottageOwnerComponent } from './header-cottage-owner/header-cottage-owner.component';
import { HeaderUnauthenticatedUserComponent } from './header-unauthenticated-user/header-unauthenticated-user.component';
import { HeaderClientComponent } from './header-client/header-client.component';
import { HeaderInstructorComponent } from './header-instructor/header-instructor.component';
import { HeaderBoatOwnerComponent } from './header-boat-owner/header-boat-owner.component';
import { HeaderAdminComponent } from './header-admin/header-admin.component';
import { HomePageUnauthenticatedUserComponent } from './home-page-unauthenticated-user/home-page-unauthenticated-user.component';
import { ReportCottageOwnerComponent } from './report-cottage-owner/report-cottage-owner.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';
import { DeactivationComponent } from './deactivation/deactivation.component';
import { AllInstructorsComponent } from './all-instructors/all-instructors.component';
import { ProfileCottageComponent } from './profile-cottage/profile-cottage.component';
import { ProfileBoatComponent } from './profile-boat/profile-boat.component';
import { NewCottageComponent } from './new-cottage/new-cottage.component';
import { InstructorDetailsComponent } from './instructor-details/instructor-details.component';
import { ClientReservationsComponent } from './client-reservations/client-reservations.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { NewActionComponent } from './new-action/new-action.component';

import { NgImageSliderModule } from 'ng-image-slider';
import { FreeBoatsComponent } from './free-boats/free-boats.component';


import { DeleteCottageComponent } from './delete-cottage/delete-cottage.component';
import { ListCottagePastReservationsComponent } from './list-cottage-past-reservations/list-cottage-past-reservations.component';
import { ListCottageFutureReservationsComponent } from './list-cottage-future-reservations/list-cottage-future-reservations.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { ReportReservationComponent } from './report-reservation/report-reservation.component';
import { UnverifiedUsersComponent } from './unverified-users/unverified-users.component';
import { VerifiedUsersComponent } from './verified-users/verified-users.component';
import { ProfileAdminComponent } from './profile-admin/profile-admin.component';
import { ProfileAdventureFishingClassComponent } from './profile-adventure-fishing-class/profile-adventure-fishing-class.component';
import { ProfileInstructorComponent } from './profile-instructor/profile-instructor.component';
import { NewAdventureFishingComponent } from './new-adventure-fishing/new-adventure-fishing.component';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { EditProfileAdventureComponent } from './edit-profile-adventure/edit-profile-adventure.component';
import { NewActionAdventureComponent } from './new-action-adventure/new-action-adventure.component';
import { MatChipsModule } from '@angular/material/chips';
import { EditActionAdventureComponent } from './edit-action-adventure/edit-action-adventure.component';
import { EditProfileInstructorComponent } from './edit-profile-instructor/edit-profile-instructor.component';
import { EditInstructorPasswordComponent } from './edit-instructor-password/edit-instructor-password.component';
import { ClientsBookedActionComponent } from './clients-booked-action/clients-booked-action.component';
import { ReportAboutClientsComponent } from './report-about-clients/report-about-clients.component';
import { ViewReportActionComponent } from './view-report-action/view-report-action.component';
import { AdminPunishClientsComponent } from './admin-punish-clients/admin-punish-clients.component';
import { AddNewAdminComponent } from './add-new-admin/add-new-admin.component';
import { AdminEntitiesComponent } from './admin-entities/admin-entities.component';
import { AdminIncomeReservationsComponent } from './admin-income-reservations/admin-income-reservations.component';
import { ViewActionDetailsComponent } from './view-action-details/view-action-details.component';
import { AddRevisionMarkForInstructorComponent } from './add-revision-mark-for-instructor/add-revision-mark-for-instructor.component';
import { ViewRevisionMarkComponent } from './view-revision-mark/view-revision-mark.component';
import { AllRevisionsMarksForInstructorsComponent } from './all-revisions-marks-for-instructors/all-revisions-marks-for-instructors.component';
import { ClientNewBookingByInstructorComponent } from './client-new-booking-by-instructor/client-new-booking-by-instructor.component';
import { AddComplaintForInstructorComponent } from './add-complaint-for-instructor/add-complaint-for-instructor.component';
import { ClientViewComplaintForInstructorComponent } from './client-view-complaint-for-instructor/client-view-complaint-for-instructor.component';
import { AdminRequestsDeletingAccountComponent } from './admin-requests-deleting-account/admin-requests-deleting-account.component';
import { DeletingRequestsComponent } from './deleting-requests/deleting-requests.component';
import { AdminResponseRequestDeletingComponent } from './admin-response-request-deleting/admin-response-request-deleting.component';
import { AdminComplaintResponseComponent } from './admin-complaint-response/admin-complaint-response.component';
import { AdminLoyaltyProgramComponent } from './admin-loyalty-program/admin-loyalty-program.component';
import { CalendarBookingInstructorComponent } from './calendar-booking-instructor/calendar-booking-instructor.component';
import { CalendarBookingClientsComponent } from './calendar-booking-clients/calendar-booking-clients.component';
import { AdminLoyaltyChangeProgramComponent } from './admin-loyalty-change-program/admin-loyalty-change-program.component';


@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    AllBoatsComponent,
    AllCottagesComponent,
    HomePageCottageOwnerComponent,
    HomePageBoatOwnerComponent,
    HomePageInstructorComponent,
    HomePageClientComponent,
    HomePageAdminComponent,
    HeaderCottageOwnerComponent,
    HeaderUnauthenticatedUserComponent,
    HeaderClientComponent,
    HeaderInstructorComponent,
    HeaderBoatOwnerComponent,
    HeaderAdminComponent,
    HomePageUnauthenticatedUserComponent,
    ReportCottageOwnerComponent,
    ChangePasswordComponent,
    ProfileComponent,
    DeactivationComponent,
    AllInstructorsComponent,
    ProfileCottageComponent,
    NewCottageComponent,
    InstructorDetailsComponent,
    ClientReservationsComponent,
    ProfileBoatComponent,
    NewReservationComponent,
    NewActionComponent,
    FreeBoatsComponent,

    DeleteCottageComponent,
    ListCottagePastReservationsComponent,
    ListCottageFutureReservationsComponent,
    ProfileClientComponent,
    ReportReservationComponent,
    UnverifiedUsersComponent,
    VerifiedUsersComponent,
    ProfileAdminComponent,
    ProfileAdventureFishingClassComponent,
    ProfileInstructorComponent,
    NewAdventureFishingComponent,
    EditProfileAdventureComponent,
    NewActionAdventureComponent,
    EditActionAdventureComponent,
    EditProfileInstructorComponent,
    EditInstructorPasswordComponent,
    ClientsBookedActionComponent,
    ReportAboutClientsComponent,
    ViewReportActionComponent,
    AdminPunishClientsComponent,
    AddNewAdminComponent,
    AdminEntitiesComponent,
    AdminIncomeReservationsComponent,
    ViewActionDetailsComponent,
    AddRevisionMarkForInstructorComponent,
    ViewRevisionMarkComponent,
    AllRevisionsMarksForInstructorsComponent,
    ClientNewBookingByInstructorComponent,
    AddComplaintForInstructorComponent,
    ClientViewComplaintForInstructorComponent,
    AdminRequestsDeletingAccountComponent,
    DeletingRequestsComponent,
    AdminResponseRequestDeletingComponent,
    AdminComplaintResponseComponent,
    AdminLoyaltyProgramComponent,
    CalendarBookingInstructorComponent,
    CalendarBookingClientsComponent,
    AdminLoyaltyChangeProgramComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatCardModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    Ng2SearchPipeModule,
    MatDatepickerModule,
    MatNativeDateModule,

    NgImageSliderModule,
    MatDialogModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
    
  
    
    
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
