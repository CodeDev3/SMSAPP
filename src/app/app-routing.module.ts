import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'singup',
    loadChildren: () => import('./singup/singup.module').then( m => m.SingupPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  },
  {
    path: 'display-data',
    loadChildren: () => import('./display-data/display-data.module').then( m => m.DisplayDataPageModule)
  },
  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then( m => m.EditProfilePageModule)
  },
  {
    path: 'my-teachers',
    loadChildren: () => import('./my-teachers/my-teachers.module').then( m => m.MyTeachersPageModule)
  },
  {
    path: 'timeperiod',
    loadChildren: () => import('./timeperiod/timeperiod.module').then( m => m.TimeperiodPageModule)
  },
  {
    path: 'my-classes',
    loadChildren: () => import('./my-classes/my-classes.module').then( m => m.MyClassesPageModule)
  },
  {
    path: 'attendance',
    loadChildren: () => import('./attendance/attendance.module').then( m => m.AttendancePageModule)
  },
  {
    path: 'teacher-attendance-details',
    loadChildren: () => import('./teacher-attendance-details/teacher-attendance-details.module').then( m => m.TeacherAttendanceDetailsPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
