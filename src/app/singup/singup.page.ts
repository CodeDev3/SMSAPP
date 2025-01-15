import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { PopoverController } from '@ionic/angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetAPIDataService } from '../service/get-apidata.service';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.page.html',
  styleUrls: ['./singup.page.scss'],
})
export class SingupPage implements OnInit {
  signup: any[] = [];
  signupForm: FormGroup;
  userDOB: any;
  userData: any[] = [];
  successResponse: any = '';
  errorResponse: any = '';
  currentDate: any;

  constructor(
    public popoverController: PopoverController,
    private apiService: GetAPIDataService,
    private toastCtrl: ToastController,
    private router: Router
  ) {
    this.signupForm = new FormGroup({
      userFullName: new FormControl('', Validators.required),
      userEmail: new FormControl('', [Validators.required, Validators.email]),
      userName: new FormControl('', Validators.required),
      userPassword: new FormControl('', Validators.required),
      class: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      userDOB: new FormControl(''),
      userMob: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
    });
  }

  ngOnInit() {
    this.currentDate = new Date().toISOString().split('T')[0];
    console.log('current date : ' + this.currentDate);
    this.loadSingupData();
  }

  async loadSingupData() {
    const storedData = await Preferences.get({ key: 'UserData' });
    if (storedData.value) {
      const singupData = JSON.parse(storedData.value);
      console.log(singupData);
      if (Array.isArray(this.signup)) {
        this.signup.push(...singupData);
      }
    }
  }

  async onSubmit(data: any) {
    await this.apiService.showLoader('Please Wait..');
    console.log(data);
    this.userData = data;

    // if (Array.isArray(this.signup)) {
    //   this.signup.push(data);
    // }
    //   console.log('Updated signup array:', this.signup);

    // await Preferences.set({
    //   key: 'UserData',
    //   value: JSON.stringify(this.signup),
    // });

    this.apiService.post('api/v1/signup', data).subscribe({
      next: async (res: any) => {
        await this.apiService.hideLoader();
        await this.router.navigate(['/login']);
        this.successToast(res);
        this.signupForm.reset();
        console.log('User registered successfully:', res);
      },
      error: async (err: any) => {
        await this.apiService.hideLoader();
        if (err.error && err.error.message) {
          this.errorToast(err.error.message);
        } else {
          this.errorToast('An unexpected error occurred');
        }
        console.error('Error registering user:', err);
      },
    });
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

  async onDateChange(event: any) {
    console.log('Selected Date:', event.detail.value);
    if (event.detail.value) {
      const SelectedDate = new Date(event.detail.value);
      this.userDOB = SelectedDate.toISOString().split('T')[0];
    }
  }

  async onDatePickerBlur() {
    await this.popoverController.dismiss();
  }
}
