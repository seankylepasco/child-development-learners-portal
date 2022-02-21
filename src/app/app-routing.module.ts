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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
