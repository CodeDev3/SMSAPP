import { Component, OnDestroy, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { GetAPIDataService } from '../service/get-apidata.service';
import { StorageService } from '../service/storage.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  loginUserData: any;
  profileImage: any;
  updateImage: any;
  d: any;
  loginUserRole: any;
  status :any ;
  userData :any;
  constructor(
    private router: Router,
    private apiService: GetAPIDataService,
    private storageService: StorageService
  ) {
    //   this.apiService.refreshProfileSubject.subscribe(
    //    (updatedProfileImage:any) => {
    //      if (updatedProfileImage) {
    //        this.profileImage = updatedProfileImage;
    //        console.log(updatedProfileImage);
    //      }
    //    }
    //  );
  }

  ngOnInit() {
    this.apiService.userLoginStatusSubject.subscribe((status) => {
      this.status=status;
        console.log(status);
    });
  }

  ionViewWillEnter() {
    this.loadLoginUserData();    
  }

  async loadLoginUserData() {
    const { value } = await Preferences.get({ key: 'LoginUserData' });
    this.loginUserData = value ? JSON.parse(value) : null;
    console.log(this.loginUserData);
    this.profileImage = this.loginUserData.profileImage;
    this.loginUserRole = this.loginUserData.userRole;
    if (!this.loginUserData) {
      this.router.navigate(['/login']);
      console.log('No Data Found');
    } else {
      console.log('User Already Logged in');
    }
  }

  async edit() {
    this.d = await this.storageService.getUserData();
    console.log(this.d);
    console.log('clicked');
    this.router.navigate(['/edit-profile']);
  }


  updateLoginStatus() {
    this.status = !this.status;
    console.log(this.status);
    this.apiService.post('api/v1/updateLoginStatus',{status:this.status}).subscribe({
      next:async (res:any)=>{
        console.log(res);
        this.userData= await this.storageService.getUserData();
         this.userData.status=res.data.status;
        await this.storageService.setUserData(this.userData);
      },error:(err:any)=>
      {
        console.log(err);
      }
    })
  }
}
