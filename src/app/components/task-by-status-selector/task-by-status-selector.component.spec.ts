import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskByStatusSelectorComponent } from './task-by-status-selector.component';

describe('TaskByStatusSelectorComponent', () => {
  let component: TaskByStatusSelectorComponent;
  let fixture: ComponentFixture<TaskByStatusSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskByStatusSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskByStatusSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
