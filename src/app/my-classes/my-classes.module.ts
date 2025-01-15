import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyClassesPageRoutingModule } from './my-classes-routing.module';

import { MyClassesPage } from './my-classes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyClassesPageRoutingModule
  ],
  declarations: [MyClassesPage]
})
export class MyClassesPageModule {}
