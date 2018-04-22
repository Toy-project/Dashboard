import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { CookieService } from '../../shared/cookie/cookie.service';
import { UserAgent } from '../../shared/user-agent/user-agent';

@Injectable()
export class AdminVisitService {

  constructor(
    public afs: AngularFirestore,
    public cookieService : CookieService,
    public userAgent: UserAgent,
    public datePipe: DatePipe
  ) { }

  // set or update visit
  public createAndUpdateVisit(date: Date): any {
    // useragent & date
    const device = this.userAgent.getPcMobile();
    const browser = this.userAgent.getBrowser();
    const dateFormat = this.datePipe.transform(date, 'yyyy-MM-dd');
    const ref = this.afs.firestore.collection('visit').doc(dateFormat);

    // transaction
    this.afs.firestore.runTransaction((transaction) => {
      return transaction.get(ref).then((data) => {
        if (!this.cookieService.getCookie('visit')) {
          if (data.exists) {
            // if visit exists
            let newVisit = {};
            // value set
            newVisit['visit'] = data.data()['visit'] + 1;
            newVisit[device] = data.data()[device] + 1;
            newVisit[browser] = data.data()[browser] + 1;
            // update
            transaction.update(ref, newVisit);
          } else {
            // if not
            // value set
            let newVisit = {
              visit: 1,
              pc: 0,
              mobile: 0,
              ie: 0,
              edge: 0,
              chrome: 0,
              safari: 0,
              firefox: 0,
              opera: 0,
              etc: 0,
              createdAt: new Date(dateFormat).getTime()
            };
            newVisit[device] = 1;
            newVisit[browser] = 1;
            // set
            transaction.set(ref, newVisit);
          }
        } else {
          // todo
        }
      })
    })
    .then(() => {
      if (!this.cookieService.getCookie('visit')) {
        // set cookie
        this.cookieService.setCookie('visit', true, 1);
      } else {
        // todo
      }
    })
    .catch((err) => {
      // todo
    });
  }

  // get visit list
  public getAllVisitList(): any {
    return this.afs.firestore.collection('visit').orderBy('createdAt', 'desc');
  }

}
