import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { githubKey } from '../../../../config/github';

@Injectable()
export class GithubService {

  public apiUrl: string = 'https://api.github.com';
  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': githubKey.token
    })
  };

  constructor(
    public http: HttpClient
  ) { }

  // get github repo sort created 
  public getGithubRepo(order: string, dir: string) {
    return this.http.get(`${this.apiUrl}/users/${githubKey.id}/repos?sort=${order}&direction=${dir}`, this.httpOptions);
  }

}
