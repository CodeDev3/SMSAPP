import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TeacherAttendanceDetailsPage } from './teacher-attendance-details.page';

describe('TeacherAttendanceDetailsPage', () => {
  let component: TeacherAttendanceDetailsPage;
  let fixture: ComponentFixture<TeacherAttendanceDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherAttendanceDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
