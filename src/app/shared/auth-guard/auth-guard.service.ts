import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { MemberService } from '../../member/member.service';
import { Message } from '../message/message';

@Injectable()
export class AuthGuardService implements CanActivate, CanActivateChild {

  constructor(
    public router: Router,
    public snackBar: MatSnackBar,
    public memberService: MemberService,
    public message: Message
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable <boolean> | boolean {
    // path
    const path: string = state.url.split('/')[1];
    return this.authCheck(path);
  }

  canActivateChild() {
    return false;
  }

  public authCheck(path: string) {
    let bool: boolean = false;
    const user: object = this.memberService.afAuth.auth.currentUser;

    if (path === 'member') {
      bool = user ? true : false;
    } else if (path === 'admin') {
      bool = true;
    } else {
      bool = true;
    }

    if (bool) {
      return bool;
    } else {
      this.router.navigate(['/home']);
      return bool;
    }
  }

}
