import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyTeachersPageRoutingModule } from './my-teachers-routing.module';

import { MyTeachersPage } from './my-teachers.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyTeachersPageRoutingModule
  ],
  declarations: [MyTeachersPage]
})
export class MyTeachersPageModule {}
