import { Injectable } from '@angular/core';

@Injectable()
export class NavigationService {

  public navStatus: boolean = false;

  constructor() {}

  public navToggle(): void {
    this.navStatus = !this.navStatus;
  }

}
