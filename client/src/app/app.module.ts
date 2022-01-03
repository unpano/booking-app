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
import { NavigationBarComponent } from './navigation-bar/navigation-bar.component';
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
import { BoatDetailsComponent } from './boat-details/boat-details.component';
import { AllInstructorsComponent } from './all-instructors/all-instructors.component';
import { CottageDetailsComponent } from './cottage-details/cottage-details.component';
import { ProfileCottageComponent } from './profile-cottage/profile-cottage.component';
import { NewCottageComponent } from './new-cottage/new-cottage.component';
import { InstructorDetailsComponent } from './instructor-details/instructor-details.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegisterComponent,
    NavigationBarComponent,
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
    BoatDetailsComponent,
    AllInstructorsComponent,
    CottageDetailsComponent,
    ProfileCottageComponent,
    NewCottageComponent,
    InstructorDetailsComponent

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
    MatNativeDateModule
    
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
