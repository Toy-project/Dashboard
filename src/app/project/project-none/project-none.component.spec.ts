import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNoneComponent } from './project-none.component';

describe('ProjectNoneComponent', () => {
  let component: ProjectNoneComponent;
  let fixture: ComponentFixture<ProjectNoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectNoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectNoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
