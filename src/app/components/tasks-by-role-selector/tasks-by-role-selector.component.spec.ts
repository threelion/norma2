import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TasksByRoleSelectorComponent } from './tasks-by-role-selector.component';

describe('TasksByRoleSelectorComponent', () => {
  let component: TasksByRoleSelectorComponent;
  let fixture: ComponentFixture<TasksByRoleSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TasksByRoleSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TasksByRoleSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
