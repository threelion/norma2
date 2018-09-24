import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskExecFindProposalsComponent } from './task-exec-find-proposals.component';

describe('TaskExecFindProposalsComponent', () => {
  let component: TaskExecFindProposalsComponent;
  let fixture: ComponentFixture<TaskExecFindProposalsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskExecFindProposalsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskExecFindProposalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
