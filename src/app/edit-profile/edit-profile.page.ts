import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { PopoverController } from '@ionic/angular';
import { GetAPIDataService } from '../service/get-apidata.service';
import { NavController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../service/storage.service';
@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  editProfileForm: FormGroup;
  userDOB: any;
  Image: any;
  userInfo: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private popCtrl: PopoverController,
    private apiService: GetAPIDataService,
    private navCtrl: NavController,
    private storageService: StorageService
  ) {
    this.editProfileForm = this.fb.group({
      username: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: ['', Validators.required],
      mobileNumber: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{10}$')],
      ],
      // userRole: [''],
      profileImage: [''],
  
    });

    this.loadLoginUserData();
  }
  ngOnInit() {
    this.editProfileForm.get('username')?.disable();
    this.editProfileForm.get('email')?.disable();
  }

  async loadLoginUserData() {
    const { value } = await Preferences.get({ key: 'LoginUserData' });
    const loginUserData = value ? JSON.parse(value) : null;
    if (loginUserData) {
      this.userInfo = loginUserData;
      this.editProfileForm.patchValue(loginUserData);
      this.Image = this.editProfileForm.value.profileImage;
      console.log(loginUserData.dob);
      this.userDOB = loginUserData.dob;
    } else {
      this.router.navigate(['/login']);
      console.log('No Data Found');
    }
  }

  currentDate: string = new Date().toISOString().split('T')[0];

  onDatePickerBlur() {
    this.popCtrl.dismiss();
  }

  onDateChange(event: any) {
    if (event.detail.value) {
      const SelectedDate = new Date(event.detail.value);
      this.userDOB = SelectedDate.toISOString().split('T')[0];
    }
  }

  openInput() {
    const fileInput = document.getElementById('profileImage');
    fileInput?.click();
  }

  async onSubmit(data: any) {
    await this.apiService.showLoader('');
    console.log(data);
    // console.log(data.profileImage);
    await this.apiService.post('api/v1/updateProfile', data).subscribe({
      next: async (res: any) => {
        console.log(res.data);
        // this.apiService.refreshProfileSubject.next(res.data.profileImage);
        let userData = res.data;
        userData.token = this.userInfo.token;
        this.storageService.setUserData(userData);
        await this.apiService.hideLoader();
        await this.navCtrl.navigateForward('/user-profile');
        this.apiService.successToast(res.message);
      },
      error: (err: any) => {
        console.log(err);
        this.apiService.errorToast(err.message);
      },
    });
  }

  readFileURL(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.Image = e.target.result;
      console.log('File URL:', this.Image);
      this.editProfileForm.patchValue({ profileImage: this.Image });
    };
    reader.readAsDataURL(file);
  }

  // updateProfileImage(newImage: string) {
  //   this.userProfilePage.refreshProfileSubject.next(newImage);
  //   console.log('Profile image updated:', newImage);
  // }
}
