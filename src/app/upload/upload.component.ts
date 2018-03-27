import { Component, OnInit } from '@angular/core';

import { MemberService } from '../member/member.service';
import { Message } from '../shared/message/message';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  private createLoading: boolean = false;
  private loadingFixed: boolean = true;

  constructor(
    private memberService: MemberService,
    private message: Message
  ) { }

  ngOnInit() {
    this.memberService.loginConfirm();
  }

}
