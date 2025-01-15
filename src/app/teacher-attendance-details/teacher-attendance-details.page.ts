import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 
@Component({
  selector: 'app-teacher-attendance-details',
  templateUrl: './teacher-attendance-details.page.html',
  styleUrls: ['./teacher-attendance-details.page.scss'],
})
export class TeacherAttendanceDetailsPage implements OnInit {
  teacher: any;
  constructor(private route: Router) {}

  ngOnInit() {
    // Retrieve the teacher data passed from the AttendancePage
    const navigation = this.route.getCurrentNavigation();
    if (navigation?.extras?.state?.['teacher']) {
      this.teacher = navigation.extras.state?.['teacher']; // Store teacher details
      console.log(this.teacher);
    }
  }
}
