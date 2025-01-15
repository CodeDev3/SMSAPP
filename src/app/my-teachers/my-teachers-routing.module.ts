import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyTeachersPage } from './my-teachers.page';

const routes: Routes = [
  {
    path: '',
    component: MyTeachersPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyTeachersPageRoutingModule {}
