import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { NavController } from '@ionic/angular';
import { GetAPIDataService } from '../service/get-apidata.service';
import { StorageService } from '../service/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  posts: any[] = [];
  Error: any;
  loginForm: FormGroup;
  userData: any;
  loginUserData: any;

  constructor(
    private navCtrl: NavController,
    private apiService: GetAPIDataService,
    private storageService:StorageService
 
  ) {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });

    this.loadLoginUserData();
  }

  ngOnInit() {
  
  }

  async loadLoginUserData() {
    const { value } = await Preferences.get({ key: 'LoginUserData' });
    this.loginUserData = value ? JSON.parse(value) : null;
    const token = this.loginUserData?.token;
    if(token)
    {
    console.log('User Token' + token);
    }

    if (this.loginUserData !== null) {
       console.log(this.loginUserData);
      this.navCtrl.navigateForward('/user-profile');
    }
  }

  async onLogin(data: any) {

    await this.apiService.showLoader('Authenticating...');
    this.apiService.post('jwt-auth/v1/token', data).subscribe({
      next: async (res: any) => {
        this.userData = res.data;
        this.apiService.userRoleSubject.next(res.data.userRole);
        this.apiService.userLoginStatusSubject.next(res.data.status);
        if (res.data) {
          await this.storageService.setUserData(res.data)
          await this.apiService.hideLoader();
          await this.navCtrl.navigateForward('/user-profile');
          this.apiService.successToast('Login Successfully');
        }
        this.loginForm.reset(); 
      },
      error: async (err: any) => {
        console.log(err.error.message);
        await this.apiService.hideLoader();
        this.apiService.errorToast('Error: Invalid User Please Try Again');
      },
    });
  }

  
}
