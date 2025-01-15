import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TimeperiodPage } from './timeperiod.page';

const routes: Routes = [
  {
    path: '',
    component: TimeperiodPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeperiodPageRoutingModule {}
