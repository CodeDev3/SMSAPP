import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MyClassesPage } from './my-classes.page';

describe('MyClassesPage', () => {
  let component: MyClassesPage;
  let fixture: ComponentFixture<MyClassesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MyClassesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
