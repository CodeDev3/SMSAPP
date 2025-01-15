import { Component } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { GetAPIDataService } from './service/get-apidata.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  userRole: string = '';
  loginUserData: any;
  token: any;
  teacherPages: any = [
    { title: 'Home', url: '/user-profile', icon: 'home' },
    { title: 'My Classes', url: '/my-classes' },
    { title: 'My Account', url: '/my-account' },
    { title: 'Change Password', url: '/change-password' },
  ];

  principalPages: any = [
    { title: 'Home', url: '/user-profile', icon: 'home' },
    { title: 'My Teachers ', url: '/my-teachers' },
    { title: 'Time Period', url: '/timeperiod' },
    { title: 'Attendance', url: '/attendance' },
    { title: 'My Account', url: '/my-account' },
    { title: 'Change Password', url: '/change-password' },
  ];

  constructor(private apiService: GetAPIDataService, private router: Router) {
    this.initializeApp();
  }

  async initializeApp() {
    const { value } = await Preferences.get({ key: 'LoginUserData' });
    this.token = value ? JSON.parse(value).token : null;
    if (value) {
      this.userRole = value ? JSON.parse(value).userRole : null;
      console.log('this.userRole ' + this.userRole);
    }
    this.apiService.post('api/v1/validateToken', this.token).subscribe({
      next: async (res: any) => {
        if (res.status === 'success') {
          console.log('Token is valid.');
        }
      },
      error: (err: any) => {
        console.log(err.error.message);
        this.handleInvalidToken();
      },
    });
  }

  handleInvalidToken() {
    Preferences.remove({ key: 'LoginUserData' });
    this.router.navigate(['/login']);
  }
}
