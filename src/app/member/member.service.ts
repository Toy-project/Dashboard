import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

import { Message } from '../shared/message/message';

@Injectable()
export class MemberService {

  public user: any = {};
  public access: any = {level: 0, loading: true};

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public storage: AngularFireStorage,
    public message: Message
  ) { }

  // login
  public async login(email: string, password: string): Promise<any> {
    const user = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
    await this.updateDatabaseUserLogin(user.uid, new Date(user.metadata.lastSignInTime).getTime());
    this.loginConfirm();
  }

  // update user lastlogin
  public updateDatabaseUserLogin(key: string, date: number): Promise<any> {
    return this.afs.firestore.collection('member').doc(key).update({
      lastLoginAt: date
    });
  }

  // logout
  public async logout(): Promise<any> {
    await this.afAuth.auth.signOut();
    this.loginConfirm();
  }

  // login confirm
  public loginConfirm(): void {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user);
        this.user = Object.assign({logined: true}, user);
      } else {
        this.user = {logined: false};
      }
    });
  }

  // sign-up (create user)
  public async signUp(value): Promise<any> {
    const user = await this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
    await this.signUpDatabase(user);
    await this.emailVerified();
    this.loginConfirm();
  }

  // sign-up (create database user)
  public signUpDatabase(value: any): Promise<any> {
    return this.afs.firestore.collection('member').doc(value.uid).set({
      email: value.email,
      uid: value.uid,
      level: 1,
      createdAt: new Date(value.metadata.creationTime).getTime(),
      lastLoginAt: new Date(value.metadata.lastSignInTime).getTime()
    });
  }

  // sign-out (delete user)
  public async signOut(): Promise<any> {
    await this.signOutDatabase(this.user.uid);
    await this.deleteUserPhoto(this.user);
    this.afAuth.auth.currentUser.delete();
  }

  // sign-out database user (delete database user)
  public signOutDatabase(key: string): Promise<any> {
    return this.afs.firestore.collection('member').doc(key).delete();
  }

  // update user profile photo
  public updateUserPhoto(user: any, file: any): Promise<any> {
    const uploadPath = `member/${user.uid}/profile.${file.type.split('/')[1]}`;
    const upload = this.storage.upload(uploadPath, file);
    return upload.downloadURL().toPromise();
  }

  // delete user photo
  public deleteUserPhoto(user: any): Promise<any> {
    if (user.photoURL) {
      const photoURLArr = user.photoURL.split('.');
      const type = photoURLArr[photoURLArr.length - 1].split('?')[0];
      return this.storage.ref(`member/${user.uid}/profile.${type}`).delete().toPromise();
    } else {
      return Observable.of().toPromise();
    }
  }

  // update user profile
  public updateUserProfile(value: any): Promise<any> {
    return this.afAuth.auth.currentUser.updateProfile(value);
  }

  // update user password
  public updateUserPassword(value: any): Promise<any> {
    return this.afAuth.auth.currentUser.updatePassword(value);
  }

  // update user level
  public updateDatabaseUserLevel(value: any): Promise<any> {
    return this.afs.firestore.collection('member').doc(value.key).update({
      level: value.level
    });
  }

  // get database user
  public getDatabaseUser(key): any {
    return this.afs.firestore.collection('member').doc(key);
  }

  // get all database user
  public getDatabaseUserList(limit: number): any {
    return this.afs.firestore.collection('member').orderBy('createdAt', 'desc').limit(limit);
  }

  // get admin database user
  public getDatabaseAdmin(): Promise<any> {
    return this.afs.firestore.collection('member').where('level', '>=', 3).get();
  }

  // email verify
  public emailVerified(): Promise<any> {
    return this.afAuth.auth.currentUser.sendEmailVerification();
  }

  // auth error handler
  public authErrorHandler(err): string {
    console.log(err);
    // define message
    let msg: string = '';

    // set message
    switch (err.code) {
      case 'auth/invalid-email':
      case 'auth/user-not-found':
        msg = this.message.wrongEmail;
        break;

      case 'auth/wrong-password':
        msg = this.message.wrongPassword;
        break;

      case 'auth/network-request-failed':
        msg = this.message.networkError;
        break;

      case 'auth/email-already-in-use':
        msg = this.message.alreadyEmail;
        break;

      default:
        break;
    }

    // return message
    return msg;
  }

}
