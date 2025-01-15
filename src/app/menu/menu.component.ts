import { Component, OnInit, Input } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { GetAPIDataService } from '../service/get-apidata.service';
import { firstValueFrom } from 'rxjs';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {

  @Input() userRole: string = ''; 
  @Input() teacherPages: any[] = [];
  @Input() principalPages: any[] = [];


  loginUserData: any;
  
  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private apiService:GetAPIDataService
  ) {

  }

  ngOnInit() {
    this.apiService.userRoleSubject.subscribe((role) => {
      this.userRole = role;
      console.log('User role updated:', role);
    });
  }

  ionViewWillEnter()
  {

  }



  menuClose() {
    this.menuCtrl.close();
  }

  async onMenuItemClick(page: string) {
    await this.menuCtrl.close();
    console.log(`Navigating to ${page}`);
  }

  async logout() {

    // this.apiService.post('api/v1/updateLoginStatus',{status:false}).subscribe({
    // next : async(res:any)=>
    // {
      
    //   console.log(res);
    // },error:async(err:any)=>
    // {
    //      console.log(err);
    // }
    // });

    
    const res: any = await firstValueFrom(this.apiService.post('api/v1/updateLoginStatus', { status: false }));
     this.apiService.userLoginStatusSubject.next(false);
    console.log(res);
    await Preferences.clear().then(() => {
      console.log('logout successfully');
      this.menuCtrl.close();
      this.router.navigate(['/login']);
    });
    
  }


}
