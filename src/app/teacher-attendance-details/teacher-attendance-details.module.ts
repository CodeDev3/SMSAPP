import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TeacherAttendanceDetailsPageRoutingModule } from './teacher-attendance-details-routing.module';

import { TeacherAttendanceDetailsPage } from './teacher-attendance-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TeacherAttendanceDetailsPageRoutingModule
  ],
  declarations: [TeacherAttendanceDetailsPage]
})
export class TeacherAttendanceDetailsPageModule {}
