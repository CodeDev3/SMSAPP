import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SingupPageRoutingModule } from './singup-routing.module';

import { SingupPage } from './singup.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    SingupPageRoutingModule
  ],
  declarations: [SingupPage]
})
export class SingupPageModule {}
