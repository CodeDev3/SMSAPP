import { Component, ViewChild ,OnInit} from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PopoverController } from '@ionic/angular';
import { GetAPIDataService } from '../service/get-apidata.service';
import { ModalController } from '@ionic/angular';
import { InfiniteScrollCustomEvent } from '@ionic/core/components';
@Component({
  selector: 'app-timeperiod',
  templateUrl: './timeperiod.page.html',
  styleUrls: ['./timeperiod.page.scss'],
})
export class TimeperiodPage implements OnInit {
  timeperiodForm: FormGroup;
  @ViewChild(IonModal) modal!: IonModal;
  startTime: any;
  start: any;
  end: any;
  mindate: any;
  totalRecords = 0;
  currentPage = 1;
  isLoading = true;
  endTime: any;
  dateSchedule: any;
  dateValue: any;
  teachers: { id: number; fullName: string }[] = [];
  message = 'My Model';
  name: string = '';
  selectedClass: any;
  selectedSubject: any;
  isDisabled: boolean = true;
  alottedPeriods: {
    id: number;
    teacherId: number;
    class: string;
    subject: string;
    date: any;
    start_time: any;
    end_time: any;
    teacherName: any;
  }[] = [];
  constructor(
    private popCtrl: PopoverController,
    private apiService: GetAPIDataService,
    private modalCtrl: ModalController
  ) {
    this.timeperiodForm = new FormGroup({
      class: new FormControl('', Validators.required),
      subject: new FormControl('', Validators.required),
      teacherId: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      startTime: new FormControl('', Validators.required),
      endTime: new FormControl('', Validators.required),
    });
    this.timeperiodForm.get('date')?.disable();
    this.timeperiodForm.get('startTime')?.disable();
    this.timeperiodForm.get('endTime')?.disable();
    this.timeperiodForm.get('teacherId')?.disable();
  }

  ngOnInit() {
    this.getData();
    this.mindate=new Date().toISOString().split('T')[0];
  }

  getData() {
    this.apiService
      .post('api/v1/periodDetails', { currentPage: this.currentPage })
      .subscribe({
        next: (res: any) => {
          this.alottedPeriods.push(...res.data.records);
          this.totalRecords = res.data.total_records;
          console.log(res.data);
        },
        error: (err: any) => {
          console.log(err);
        },
      });
  }

  onIonInfinite(ev: InfiniteScrollCustomEvent) {
    if (this.alottedPeriods.length == this.totalRecords) {
      this.isLoading = false;
    }
    if (this.isLoading) {
      this.currentPage++;
      this.getData();
    } else {
      ev.target.complete();
    }

    setTimeout(() => {
      ev.target.complete();
    }, 500);
  }

  openModal() {
    this.modal.present();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }

  onClassChange(event: any) {
    console.log(event.detail.value);
    this.selectedClass = event.detail.value;
  }

  onSubjectChange(event: any) {
    console.log(event.detail.value);
    this.selectedSubject = event.detail.value;
    if (this.selectedSubject && this.selectedClass) {
      this.apiService
        .post('api/v1/subjectTeachers', {
          class: this.selectedClass,
          subject: this.selectedSubject,
        })
        .subscribe({
          next: (res: any) => {
            console.log(res);
            if (res.status == 'success') {
              this.isDisabled = false;
              this.teachers = res.data;
              this.timeperiodForm.get('teacherId')?.enable();
              this.timeperiodForm.get('date')?.enable();
              this.timeperiodForm.get('startTime')?.enable();
              this.timeperiodForm.get('endTime')?.enable();

            } else {
              this.apiService.errorToast(res.message);
              this.timeperiodForm.get('teacherId')?.disable();
              this.timeperiodForm.get('date')?.disable();
              this.timeperiodForm.get('startTime')?.disable();
              this.timeperiodForm.get('endTime')?.disable();
              this.teachers = [];
            }
          },
          error: (err: any) => {
            console.log(err);
            this.selectedClass = '';
            this.selectedSubject = '';
          },
        });
    }
  }

  DatePicked(event: any) {
    const d = new Date(event.detail.value).toISOString().split('T')[0];
    this.dateSchedule = d;
    console.log(d);
  }

  onStartTimeChange(event: any) {
    const starttime = new Date(event.detail.value);
    this.start = starttime;
    const hour = starttime.getHours();
    const minute = starttime.getMinutes();
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
    console.log(formattedTime);
    console.log(event.detail.value);
    this.startTime = formattedTime;
    if (this.end) {
      if (Date.parse(this.start) >= Date.parse(this.end)) {
        this.endTime = '';
        this.end = '';
      }
    }

    this.apiService
      .post('api/v1/checkAlottedPeriod', {
        class: this.selectedClass,
        start_time: event.detail.value,
        date: this.dateSchedule,
      })
      .subscribe({
        next: (res: any) => {
          console.log('Period not alloted', res);
          if (res.status == 'error') {
            this.apiService.errorToast(res.message);
            this.startTime = '';
            this.start = '';
          }
        },
        error: (err: any) => {
          console.log(err.error.message);
          this.apiService.errorToast(err.error.message);
          this.startTime = '';
          this.start = '';
        },
      });
  }

  onEndTimeChange(event: any) {
    const endtime = new Date(event.detail.value);
    this.end = endtime;
    const hour = endtime.getHours();
    const minute = endtime.getMinutes();
    const formattedTime = `${hour.toString().padStart(2, '0')}:${minute
      .toString()
      .padStart(2, '0')}`;
    console.log(formattedTime);
    this.endTime = formattedTime;
    console.log(event.detail.value);

    if (this.end && this.start) {
      if (Date.parse(this.start) >= Date.parse(this.end)) {
        this.endTime = '';
        this.end = '';
      }
    }
  }

  async onSubmit(data: any) {
    this.currentPage = 1;
    this.getData();
    this.isLoading = true;
    this.alottedPeriods = [];
    await this.apiService.showLoader('Please wait...');
    this.apiService.post('api/v1/alotTimePeriod', data).subscribe({
      next: async (res: any) => {
        console.log(res);
        if (res.status == 'success') {
          this.apiService.successToast(
            'Period Time Schedule Added Successfully'
          );
          await this.apiService.hideLoader();
          this.modalCtrl.dismiss();
          this.timeperiodForm.reset();
          this.startTime = '';
          this.endTime = '';
          this.dateSchedule = '';
          this.isDisabled = true;
        }
      },
      error: async (err: any) => {
        await this.apiService.hideLoader();
        console.log(err);
        this.apiService.errorToast(err.error.message);
      },
    });
    console.log(data);
  }
}