import { Component, OnInit } from '@angular/core';
import { GetAPIDataService } from '../service/get-apidata.service';
import { NavController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/core/components';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.page.html',
  styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
  currentDate: any;
  records: any = [];
  totalRecords: any;
  isLoading: boolean = true;
  currentPage: any = 1;

  constructor(
    private apiService: GetAPIDataService,
    private navController: NavController
  ) {}

  ngOnInit() {
    const date = new Date().toISOString();
    this.currentDate = date.split('T')[0];
    this.getData();
  }

  async getData() {
    this.apiService
      .post('api/v1/getTeachersAttedance', {
        date: this.currentDate,
        page: this.currentPage,
      })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.totalRecords = res.data.total_records;
          this.records.push(...res.data.records);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  viewDetails(teacher: any) {
    this.navController.navigateForward('/teacher-attendance-details', {
      state: { teacher: teacher },
    });
  }

  getDate(e: any) {
    console.log(e.detail.value);
    this.currentDate = e.detail.value;
    this.currentPage = 1;
    this.records = [];
    this.getData();
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    if (this.records.length !== this.totalRecords) {
      this.currentPage++;
      this.getData();
    } else {
      ev.target.complete();
    }

    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }

  download() {
    console.log('clicked');
  }
}
