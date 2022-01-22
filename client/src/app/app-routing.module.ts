import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllActionsComponent } from './all-actions/all-actions.component';
import { AllBoatsComponent } from './all-boats/all-boats.component';
import { AllCottagesComponent } from './all-cottages/all-cottages.component';

import { ChangePasswordComponent } from './change-password/change-password.component';
import { ClientProfileCottageComponent } from './client-profile-cottage/client-profile-cottage.component';
import { ClientReservationsComponent } from './client-reservations/client-reservations.component';
import { DeactivationComponent } from './deactivation/deactivation.component';
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
import { NewCottageComponent } from './new-cottage/new-cottage.component';
import { NewReservationComponent } from './new-reservation/new-reservation.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { PricelistComponent } from './pricelist/pricelist.component';
import { ProfileActivationComponent } from './profile-activation/profile-activation.component';
import { ProfileAdventureComponent } from './profile-adventure/profile-adventure.component';
import { ProfileBoatComponent } from './profile-boat/profile-boat.component';
import { ProfileClientComponent } from './profile-client/profile-client.component';
import { ProfileCottageComponent } from './profile-cottage/profile-cottage.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { ReportCottageOwnerComponent } from './report-cottage-owner/report-cottage-owner.component';
import { ReportReservationComponent } from './report-reservation/report-reservation.component';
import { SubscribedBoatsComponent } from './subscribed-boats/subscribed-boats.component';
import { UpcomingReservationsComponent } from './upcoming-reservations/upcoming-reservations.component';

const routes: Routes = [
  {path: '', component: HomePageUnauthenticatedUserComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile-activation', component: ProfileActivationComponent},
  {path: 'register', component: RegisterComponent},

  
  {path: 'boatOwner', component: HomePageBoatOwnerComponent},
  {path: 'instructor', component: HomePageInstructorComponent},
  {path: 'admin', component: HomePageAdminComponent},
  {path: 'client', component: HomePageClientComponent},

  {path: 'profile', component: ProfileComponent},
  {path: 'clientProfile', component: ProfileClientComponent},

  {path: 'change-password', component: ChangePasswordComponent},
  {path: 'profile/delete-account', component: DeactivationComponent},

  {path: 'profileDeactivation', component: DeactivationComponent},

  {path: 'boats', component: AllBoatsComponent},
  {path: 'allCottages', component: AllCottagesComponent},

  {path: 'cottage', component: ProfileCottageComponent},
  {path: 'actions', component: AllActionsComponent},

  {path: 'adventure', component: ProfileAdventureComponent},

  {path: 'cottageProfile', component: ClientProfileCottageComponent},
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

  {path: 'pricelist', component: PricelistComponent},
  {path: 'upcomingRes', component: UpcomingReservationsComponent},
  {path: 'homePageClient', component: HomePageClientComponent},

  {path: 'subscribedBoats', component: SubscribedBoatsComponent},

  {path: '**', component: PageNotFoundComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
