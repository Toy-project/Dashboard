import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingService {

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage
  ) { }

  // project upload file
  public uploadFile(fileName: string, file: any): Promise<any> {
    const uploadPath = `default/${fileName}.${file.type.split('/')[1]}`;
    return this.storage.upload(uploadPath, file).downloadURL().toPromise();
  }

  // set default image
  public updateDefaultImage(doc: string, value: any): Promise<any> {
    return this.afs.collection('setting').doc(doc).set(value);
  }

  // get default image
  public getDefaultImage(doc: string): Promise<any> {
    return this.afs.firestore.collection('setting').doc(doc).get();
  }

}
