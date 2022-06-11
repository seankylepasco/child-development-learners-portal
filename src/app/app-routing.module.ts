import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AnnouncementComponent } from './announcement/announcement.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ActivitiesComponent } from './multimedia/activities/activities.component';
import { AlphabetComponent } from './multimedia/alphabet/alphabet.component';
import { NumbersComponent } from './multimedia/numbers/numbers.component';
import { RhymesComponent } from './multimedia/rhymes/rhymes.component';
import { StoriesComponent } from './multimedia/stories/stories.component';
import { TracingComponent } from './multimedia/tracing/tracing.component';
import { SignupComponent } from './signup/signup.component';
import { StudentComponent } from './student/student.component';
import { TeacherComponent } from './teacher/teacher.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AnnouncepostComponent } from './announcepost/announcepost.component';
import { ColoringComponent } from './multimedia/coloring/coloring.component';
import { ProfileComponent } from './student/profile/profile.component';
import { MasterlistComponent } from './masterlist/masterlist.component';
import { ActivityComponent } from './multimedia/activities/activity/activity.component';
import { EnrolleesComponent } from './enrollees/enrollees.component';
import { EditUsersComponent } from './admin/edit-users/edit-users.component';
import { AddAnnouncementComponent } from './admin/add-announcement/add-announcement.component';
import { SuggestionsComponent } from './admin/suggestions/suggestions.component';
import { AddActivityComponent } from './teacher/add-activity/add-activity.component';
import { ViewActivityComponent } from './teacher/view-activity/view-activity.component';
import { YearsComponent } from './admin/years/years.component';
import { ScoresComponent } from './multimedia/scores/scores.component';
import { SoeComponent } from './multimedia/soe/soe.component';
import { ReportsComponent } from './admin/reports/reports.component';
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
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { ArchivesComponent } from './teacher/archives/archives.component';
import { TeacherReportsComponent } from './teacher/teacher-reports/teacher-reports.component';

const routes: Routes = [
  {
    path: '',
    component: WelcomeComponent,
  },
  {
    path: 'welcome',
    component: WelcomeComponent,
  },
  {
    path: 'signup',
    component: SignupComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'student',
    component: StudentComponent,
  },
  {
    path: 'teacher',
    component: TeacherComponent,
  },
  {
    path: 'admin',
    component: AdminComponent,
  },
  {
    path: 'stories',
    component: StoriesComponent,
  },
  {
    path: 'activities',
    component: ActivitiesComponent,
  },
  {
    path: 'rhymes',
    component: RhymesComponent,
  },
  {
    path: 'numbers',
    component: NumbersComponent,
  },
  {
    path: 'alphabet',
    component: AlphabetComponent,
  },
  {
    path: 'announcement',
    component: AnnouncementComponent,
  },
  {
    path: 'tracing',
    component: TracingComponent,
  },
  {
    path: 'coloring',
    component: ColoringComponent,
  },
  {
    path: 'announcepost',
    component: AnnouncepostComponent,
  },
  {
    path: 'student-profile',
    component: ProfileComponent,
  },
  {
    path: 'masterlist',
    component: MasterlistComponent,
  },
  {
    path: 'activity',
    component: ActivityComponent,
  },
  {
    path: 'enrollees',
    component: EnrolleesComponent,
  },
  {
    path: 'edit-users',
    component: EditUsersComponent,
  },
  {
    path: 'add-announcement',
    component: AddAnnouncementComponent,
  },
  {
    path: 'suggestion',
    component: SuggestionsComponent,
  },
  {
    path: 'teacher-activity',
    component: AddActivityComponent,
  },
  {
    path: 'view-activity',
    component: ViewActivityComponent,
  },
  {
    path: 'years',
    component: YearsComponent,
  },
  {
    path: 'scores',
    component: ScoresComponent,
  },
  {
    path: 'soe',
    component: SoeComponent,
  },
  {
    path: 'reports',
    component: ReportsComponent,
  },
  {
    path: 'tracing1',
    component: Tracing1Component,
  },
  {
    path: 'tracing2',
    component: Tracing2Component,
  },
  {
    path: 'tracing3',
    component: Tracing3Component,
  },
  {
    path: 'tracing4',
    component: Tracing4Component,
  },
  {
    path: 'tracing5',
    component: Tracing5Component,
  },
  {
    path: 'tracing6',
    component: Tracing6Component,
  },
  {
    path: 'tracing7',
    component: Tracing7Component,
  },
  {
    path: 'tracing8',
    component: Tracing8Component,
  },
  {
    path: 'coloring1',
    component: Coloring1Component,
  },
  {
    path: 'coloring2',
    component: Coloring2Component,
  },
  {
    path: 'coloring3',
    component: Coloring3Component,
  },
  {
    path: 'coloring4',
    component: Coloring4Component,
  },
  {
    path: 'coloring5',
    component: Coloring5Component,
  },
  {
    path: 'coloring6',
    component: Coloring6Component,
  },
  {
    path: 'coloring7',
    component: Coloring7Component,
  },
  {
    path: 'coloring8',
    component: Coloring8Component,
  },

  {
    path: 'classes',
    component: ClassesComponent,
  },
  {
    path: 'year',
    component: YearComponent,
  },
  {
    path: 'privacy',
    component: PrivacyComponent,
  },
  {
    path: 'terms',
    component: TermsComponent,
  },
  {
    path: 'archive',
    component: ArchivesComponent,
  },
  {
    path: 'teacher-reports',
    component: TeacherReportsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
