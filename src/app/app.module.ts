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
import { ScoresComponent } from './multimedia/scores/scores.component';
import { SoeComponent } from './multimedia/soe/soe.component';
import { ReportsComponent } from './admin/reports/reports.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { Tracing1Component } from './multimedia/tracing/tracing1/tracing1.component';
import { Tracing2Component } from './multimedia/tracing/tracing2/tracing2.component';
import { Tracing3Component } from './multimedia/tracing/tracing3/tracing3.component';
import { Tracing4Component } from './multimedia/tracing/tracing4/tracing4.component';
import { Tracing5Component } from './multimedia/tracing/tracing5/tracing5.component';
import { Tracing6Component } from './multimedia/tracing/tracing6/tracing6.component';
import { Tracing7Component } from './multimedia/tracing/tracing7/tracing7.component';
import { Tracing8Component } from './multimedia/tracing/tracing8/tracing8.component';
import { Coloring1Component } from './multimedia/coloring/coloring1/coloring1.component';
import { Coloring2Component } from './multimedia/coloring/coloring2/coloring2.component';
import { Coloring3Component } from './multimedia/coloring/coloring3/coloring3.component';
import { Coloring4Component } from './multimedia/coloring/coloring4/coloring4.component';
import { Coloring5Component } from './multimedia/coloring/coloring5/coloring5.component';
import { Coloring6Component } from './multimedia/coloring/coloring6/coloring6.component';
import { Coloring7Component } from './multimedia/coloring/coloring7/coloring7.component';
import { Coloring8Component } from './multimedia/coloring/coloring8/coloring8.component';
import { ClassesComponent } from './teacher/classes/classes.component';
import { YearComponent } from './teacher/classes/year/year.component';
import { LoginfailComponent } from './modals/loginfail/loginfail.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { ForgotComponent } from './modals/forgot/forgot.component';
import { NoemailComponent } from './modals/noemail/noemail.component';
import { TermsComponent } from './terms/terms.component';
import { ArchivesComponent } from './teacher/archives/archives.component';
import { TeacherReportsComponent } from './teacher/teacher-reports/teacher-reports.component';
import { CreditsComponent } from './credits/credits.component';


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
    ScoresComponent,
    SoeComponent,
    ReportsComponent,
    Tracing1Component,
    Tracing2Component,
    Tracing3Component,
    Tracing4Component,
    Tracing5Component,
    Tracing6Component,
    Tracing7Component,
    Tracing8Component,
    Coloring1Component,
    Coloring2Component,
    Coloring3Component,
    Coloring4Component,
    Coloring5Component,
    Coloring6Component,
    Coloring7Component,
    Coloring8Component,
    ClassesComponent,
    YearComponent,
    LoginfailComponent,
    PrivacyComponent,
    ForgotComponent,
    NoemailComponent,
    TermsComponent,
    ArchivesComponent,
    TeacherReportsComponent,
    CreditsComponent,


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
  providers: [
    DatePipe,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
