import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MessageService {

  constructor(
    private afs: AngularFirestore
  ) { }

  // create message 
  public createMessage(value: any): Promise<any> { 
    return this.afs.collection('message').add(value);
  }

  // get all message
  public getAllMessage(uid: string, limit: number) {
    return this.afs.firestore.collection('message').where('to', '==', uid).orderBy('createdAt', 'desc').limit(limit);
  }

  // get all message for admin (read: false)
  public getAllMessageNotRead(uid: string) {
    return this.afs.firestore.collection('message').where('to', '==', uid).where('read', '==', false);
  }

  // update message read
  public updateMessageRead(key: string): Promise<any> {
    return this.afs.collection('message').doc(key).update({
      read: true
    });
  }

  // delete message
  public deleteMessage(key: string): Promise<any> {
    return this.afs.collection('message').doc(key).delete();
  }

}
