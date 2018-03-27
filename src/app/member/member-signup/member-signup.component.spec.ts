import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberSignupComponent } from './member-signup.component';

describe('MemberSignupComponent', () => {
  let component: MemberSignupComponent;
  let fixture: ComponentFixture<MemberSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
