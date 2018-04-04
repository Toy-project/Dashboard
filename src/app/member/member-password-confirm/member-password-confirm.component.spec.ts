import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberPasswordConfirmComponent } from './member-password-confirm.component';

describe('MemberPasswordConfirmComponent', () => {
  let component: MemberPasswordConfirmComponent;
  let fixture: ComponentFixture<MemberPasswordConfirmComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberPasswordConfirmComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberPasswordConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
