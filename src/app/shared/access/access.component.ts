import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-access',
  templateUrl: './access.component.html',
  styleUrls: ['./access.component.scss']
})
export class AccessComponent implements OnInit {

  @Input() private message: string;

  constructor() { }

  ngOnInit() {
  }

}
