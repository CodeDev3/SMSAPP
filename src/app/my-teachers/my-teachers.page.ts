import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent } from '@ionic/angular';
import { GetAPIDataService } from '../service/get-apidata.service';
@Component({
  selector: 'app-my-teachers',
  templateUrl: './my-teachers.page.html',
  styleUrls: ['./my-teachers.page.scss'],
})
export class MyTeachersPage implements OnInit {

  teachers: any[] = [];
  totalRecords = 0;
  currentPage = 1;
  isLoading = false;
  constructor(private apiService: GetAPIDataService) {}

  ngOnInit() {
    this.apiService
      .post('api/v1/getAllTeachers', { page: this.currentPage })
      .subscribe({
        next: (res: any) => {
          if (res.status === 'success') {
            // this.teachers = res.data.records;
            this.teachers.push(...res.data.records);
            this.totalRecords = res.data.total_records;
            console.log(res.data);
          }
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }


  loading() {
    if (this.teachers.length < this.totalRecords) {
      this.isLoading = true;
    } else {
      this.isLoading = false;
    }
  }


  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    this.loading();
    if (this.isLoading) {
      this.currentPage++;
      this.apiService
        .post('api/v1/getAllTeachers', { page: this.currentPage })
        .subscribe({
          next: (res: any) => {
            if (res.status === 'success') {
              console.log(res.data);
              this.totalRecords = res.data.total_records;
              this.teachers.push(...res.data.records);
            }
          },
          error: (err: any) => {
            console.log(err);
          },
        });
    }else
    {
    ev.target.complete();
    }
    setTimeout(() => {
      ev.target.complete();
    }, 1000);
  }

}



