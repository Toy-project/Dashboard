import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MemberService {

  public user: any = {};
  public access: any = {level: 0, loading: true};

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public storage: AngularFireStorage
  ) { }

  // login
  public login(email: string, password: string): Promise<any> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  // login confirm
  public loginConfirm(): void {
    // key index
    const keyIndex = this.getAuthUserKeyIndex();
    if (keyIndex > -1) {
      // set user
      this.user = JSON.parse(localStorage.getItem(localStorage.key(keyIndex)));
      this.user.logined = true;
      // get level
      this.getDatabaseUser(this.user.uid).onSnapshot((res) => {
        this.access.level = res.data().level;
        this.access.loading = false;
      });
    } else {
      this.user = {};
      this.access = {level: 0, loading: false};
    }
  }

  // logout
  public logout(): Promise<any> {
    return this.afAuth.auth.signOut();
  }

  // logout delete localstorage
  public deleteLocalstorage(): void {
    localStorage.clear();
  }

  // sign-up (create user)
  public signUp(value): Promise<any> {
    return this.afAuth.auth.createUserWithEmailAndPassword(value.email, value.password);
  }

  // sign-up (create database user)
  public signUpDatabase(value: any): Promise<any> {
    return this.afs.firestore.collection('member').doc(value.uid).set({
      email: value.email,
      uid: value.uid,
      level: 1,
      createdAt: value.createdAt,
      lastLoginAt: value.lastLoginAt
    });
  }

  // sign-out (delete user)
  public signOut(): Promise<any> {
    return this.afAuth.auth.currentUser.delete();
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

  // update user lastlogin
  public updateDatabaseUserLogin(key: string, date: number): Promise<any> {
    return this.afs.firestore.collection('member').doc(key).update({
      lastLoginAt: date
    });
  }

  // get current user
  public currentUser(): object {
    return this.afAuth.auth.currentUser;
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

  // get auth user data
  public getAuthUserKeyIndex(): number {
    let key: number = -1;
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i).search('firebase:authUser') > -1) {
        key = i;
        break;
      } else {
        continue;
      }
    }
    return key;
  }

}
