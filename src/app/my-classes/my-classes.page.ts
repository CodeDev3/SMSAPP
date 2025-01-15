import { Component, OnInit } from '@angular/core';
import { StorageService } from '../service/storage.service';
import { GetAPIDataService } from '../service/get-apidata.service';
@Component({
  selector: 'app-my-classes',
  templateUrl: './my-classes.page.html',
  styleUrls: ['./my-classes.page.scss'],
})
export class MyClassesPage implements OnInit {
  date: any;
  userdata: any;
  classes: any = [];
  currentDate: any;
notAlotted: any;
  constructor(
    private storageService: StorageService,
    private apiService: GetAPIDataService
  ) {
    this.getData();
  }

  ngOnInit() {
    const date = new Date().toISOString();
    this.currentDate = date.split('T')[0];
  }
  async getData() {
    this.userdata = await this.storageService.getUserData();
    console.log(this.userdata);

    this.apiService
      .post('api/v1/checkAlottedClasses', {
        teacherId: this.userdata.id,
        date: this.currentDate,
      })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.classes = [];

          this.classes.push(...res.data.records);
          
        this.classes.length == 0
          ? (this.notAlotted = true)
          : (this.notAlotted = false); 
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  Time(t: any) {
    const time = new Date(t);
    let hour = '' + time.getHours();
    let minute = '' + time.getUTCMinutes();
    if (minute.length == 1) {
      minute = minute.padEnd(2, '0');
    }
    return [hour, minute].join(':');
  }

  Date(d: any) {
    const date = new Date(d);
    const month = '' + date.toLocaleString('default', { month: 'short' });
    const day = '' + date.getDate();
    const year = '' + date.getFullYear();
    return [day, month , year].join(' / ');
  }

  selectedDate(e:any){
    this.currentDate=e.detail.value;
   console.log(this.currentDate.split('T')[0]);
   this.getData();
  }
}
