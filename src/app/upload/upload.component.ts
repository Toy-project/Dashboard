import { Component, OnInit } from '@angular/core';

import { MemberService } from '../member/member.service';
import { Message } from '../shared/message/message';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  public createLoading: boolean = false;
  public loadingFixed: boolean = true;

  constructor(
    public memberService: MemberService,
    public message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
  }

}
