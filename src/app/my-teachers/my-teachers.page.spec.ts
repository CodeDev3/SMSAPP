import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyTeachersPage } from './my-teachers.page';

describe('MyTeachersPage', () => {
  let component: MyTeachersPage;
  let fixture: ComponentFixture<MyTeachersPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTeachersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
