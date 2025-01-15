import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyClassesPage } from './my-classes.page';

const routes: Routes = [
  {
    path: '',
    component: MyClassesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyClassesPageRoutingModule {}
