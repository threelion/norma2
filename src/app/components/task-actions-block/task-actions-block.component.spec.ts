import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskActionsBlockComponent } from './task-actions-block.component';

describe('TaskActionsBlockComponent', () => {
  let component: TaskActionsBlockComponent;
  let fixture: ComponentFixture<TaskActionsBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskActionsBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskActionsBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
