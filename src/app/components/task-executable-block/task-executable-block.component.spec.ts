import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskExecutableBlockComponent } from './task-executable-block.component';

describe('TaskExecutableBlockComponent', () => {
  let component: TaskExecutableBlockComponent;
  let fixture: ComponentFixture<TaskExecutableBlockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskExecutableBlockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskExecutableBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
