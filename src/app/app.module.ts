import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HomeComponent } from './home/home.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { AdminComponent } from './admin/admin.component';
import { HttpClientModule } from '@angular/common/http';
import { StoriesComponent } from './multimedia/stories/stories.component';
import { ActivitiesComponent } from './multimedia/activities/activities.component';
import { RhymesComponent } from './multimedia/rhymes/rhymes.component';
import { NumbersComponent } from './multimedia/numbers/numbers.component';
import { AlphabetComponent } from './multimedia/alphabet/alphabet.component';
import { TracingComponent } from './multimedia/tracing/tracing.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { MatInputModule } from '@angular/material/input';
import { AnnouncepostComponent } from './announcepost/announcepost.component';
import { ColoringComponent } from './multimedia/coloring/coloring.component';
import { environment } from '../environments/environment';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SettingsComponent } from './modals/settings/settings.component';
import { ActivityComponent } from './multimedia/activities/activity/activity.component';
import { ProfileComponent } from './student/profile/profile.component';
import { MasterlistComponent } from './masterlist/masterlist.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { LogoutComponent } from './modals/logout/logout.component';
import { EnrolleesComponent } from './enrollees/enrollees.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditUsersComponent } from './admin/edit-users/edit-users.component';
import { AddAnnouncementComponent } from './admin/add-announcement/add-announcement.component';
import { NewAnnouncementComponent } from './modals/new-announcement/new-announcement.component';
import { SuggestionsComponent } from './admin/suggestions/suggestions.component';
import { AddActivityComponent } from './teacher/add-activity/add-activity.component';
import { ViewActivityComponent } from './teacher/view-activity/view-activity.component';
import { ScoreActivityComponent } from './modals/score-activity/score-activity.component';
import { ViewAnnouncementComponent } from './modals/view-announcement/view-announcement.component';
import { SuccessComponent } from './modals/success/success.component';
import { DeleteComponent } from './modals/delete/delete.component';
import { ChangePasswordComponent } from './modals/change-password/change-password.component';
import { YearsComponent } from './admin/years/years.component';
import { AddYearComponent } from './modals/add-year/add-year.component';
import { ViewYearComponent } from './modals/view-year/view-year.component';
import { AddModuleComponent } from './modals/add-module/add-module.component';
import { CreateAnnouncementComponent } from './modals/create-announcement/create-announcement.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    StudentComponent,
    TeacherComponent,
    AdminComponent,
    StoriesComponent,
    ActivitiesComponent,
    RhymesComponent,
    NumbersComponent,
    AlphabetComponent,
    TracingComponent,
    AnnouncementComponent,
    AnnouncepostComponent,
    ColoringComponent,
    SettingsComponent,
    ActivityComponent,
    ProfileComponent,
    MasterlistComponent,
    LogoutComponent,
    EnrolleesComponent,
    EditUsersComponent,
    AddAnnouncementComponent,
    NewAnnouncementComponent,
    SuggestionsComponent,
    AddActivityComponent,
    ViewActivityComponent,
    ScoreActivityComponent,
    ViewAnnouncementComponent,
    SuccessComponent,
    DeleteComponent,
    ChangePasswordComponent,
    YearsComponent,
    AddYearComponent,
    ViewYearComponent,
    AddModuleComponent,
    CreateAnnouncementComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatInputModule,
    NgxPaginationModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    NgbModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
