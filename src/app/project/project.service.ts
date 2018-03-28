import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs/Observable';

import { CookieService } from '../shared/cookie/cookie.service';

@Injectable()
export class ProjectService {

  constructor(
    public afs: AngularFirestore,
    public storage: AngularFireStorage,
    public cookieService: CookieService
  ) { }

  // project upload file
  public uploadFile(date: number, fileName: string, file: any): Promise<any> {
    const uploadPath = `project/${date}/${fileName}.${file.type.split('/')[1]}`;
    return this.storage.upload(uploadPath, file).downloadURL().toPromise();
  }

  // get project Sort limit list
  public getProjectSortLimit(field: string, limit: number) {
    return this.afs.firestore.collection('project').orderBy(field, 'desc').limit(limit);
  }

  // get each project
  public getProject(key: string): Observable<any> {
    return this.afs.collection('project').doc(key).valueChanges();
  }

  // create project
  public createProject(value: object): Promise<any> {
    return this.afs.collection('project').add(value);
  }

  // update project like
  public updateProjectLike(key: string): void {
    // ref
    const docRef = this.afs.firestore.collection('project').doc(key);
    // transaction
    this.afs.firestore.runTransaction((transaction) => {
      return transaction.get(docRef).then((projectDoc) => {
        // project exists
        if (projectDoc.exists) {
          // new like
          const newLike = projectDoc.data().like + 1;
          // update
          transaction.update(docRef, {
            like: newLike
          });
          return newLike;
        } else {
          // todo
        }
      })
    })
    .then(() => {
      this.cookieService.setCookie(`${key}Like`, true, 1);
    })
    .catch(() => {
      // todo
    })
  }

  // update project view
  public updateProjectView(key: string): void {
    // ref
    const docRef = this.afs.firestore.collection('project').doc(key);
    // transaction
    this.afs.firestore.runTransaction((transaction) => {
      return transaction.get(docRef).then((projectDoc) => {
        // project exists
        if (projectDoc.exists) {
          // new like
          const newView = projectDoc.data().view + 1;
          // update
          transaction.update(docRef, {
            view: newView
          });
          return newView;
        } else {
          // todo
        }
      })
    })
    .then(() => {
      this.cookieService.setCookie(`${key}View`, true, 1);
    })
    .catch(() => {
      // todo
    })
  }

  // delete project
  public deleteProject(key: string): Promise<any> {
    return this.afs.collection('project').doc(key).delete();
  }

  // delete project file
  public deleteProjectFile(date:number, fileName: string) {
    const deletePath = `project/${date}/${fileName}`;
    return this.storage.storage.ref(deletePath).delete();
  }

  // delete project file multi
  public deleteProjectFileMulti(project: any) {
    if (project.photo.length > 0) {
      // return promise
      return Promise.all(
        project.photo.map((photo) => {
          // filename
          const fileName = `photo-${photo.split('photo-')[1].split('?')[0]}`;
          // delte project file
          this.deleteProjectFile(project.createdAt, fileName)
          .then(() => {
            // todo
          })
        })
      )
    } else {
      return Observable.of().toPromise();
    }
  }

}
