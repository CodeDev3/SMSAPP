import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayDataPage } from './display-data.page';

describe('DisplayDataPage', () => {
  let component: DisplayDataPage;
  let fixture: ComponentFixture<DisplayDataPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayDataPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
