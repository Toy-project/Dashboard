import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberMypageComponent } from './member-mypage.component';

describe('MemberMypageComponent', () => {
  let component: MemberMypageComponent;
  let fixture: ComponentFixture<MemberMypageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberMypageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberMypageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
