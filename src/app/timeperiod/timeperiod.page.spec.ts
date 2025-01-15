import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeperiodPage } from './timeperiod.page';

describe('TimeperiodPage', () => {
  let component: TimeperiodPage;
  let fixture: ComponentFixture<TimeperiodPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeperiodPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
