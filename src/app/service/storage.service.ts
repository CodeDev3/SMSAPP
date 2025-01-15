import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
@Injectable({
  providedIn: 'root',
})
export class StorageService {
  userData:any;
  constructor() {}

  async getToken() {
    try{
         const { value } = await Preferences.get({ key: 'LoginUserData' });
         let token = null;
         if (value) {
               token = value ? JSON.parse(value).token :null;
               return token;
         }
    }catch(err)
    {
      console.log(err);
    }
  }

  async setUserData(userData: any) {
    await Preferences.set({
      key: 'LoginUserData',
      value: JSON.stringify(userData),
    });
  }

    async getUserData()
  {
        const {value} = await Preferences.get({
        key: 'LoginUserData',
        });
        this.userData = value ? JSON.parse(value):'';
        return this.userData;
  }
}
