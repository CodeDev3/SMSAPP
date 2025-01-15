import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

import { ToastController } from '@ionic/angular';
import { BehaviorSubject, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GetAPIDataService {
  API_URL = 'http://localhost/sms/wp-json/';
  isLoading: any;

  refreshProfileSubject: BehaviorSubject<string> = new BehaviorSubject('');
  userRoleSubject = new BehaviorSubject<string>('');
  userLoginStatusSubject = new BehaviorSubject<any>('');
  constructor(
    private http: HttpClient,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController
  ) {}

  post(url: any, data: any) {
    return this.http
      .post(this.API_URL + url, data)
      .pipe(map((response: any) => response));
  }

  async showLoader(msg: any) {
    this.isLoading = true;
    return await this.loadingCtrl
      .create({
        cssClass: 'custom-load',
        duration: 5000,
        message: msg,
      })
      .then((a) => {
        a.present().then(() => {
          console.log('presented');
          if (!this.isLoading) {
            a.dismiss().then(() => console.log('closed'));
          }
        });
      });
  }

  async hideLoader() {
    this.isLoading = false;
    return await this.loadingCtrl
      .dismiss()
      .then(() => console.log('dissmisses'));
  }

  async successToast(msg: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      color: 'dark',
      duration: 3000,
      position: 'bottom',
    });

    toast.present();
  }

  async errorToast(msg: any) {
    const toast = await this.toastCtrl.create({
      message: msg,
      color: 'danger',
      duration: 3000,
      position: 'bottom',
    });
    toast.present();
  }
}
