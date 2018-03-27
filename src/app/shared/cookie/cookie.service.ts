import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {

  constructor() { }

  // set cookie
  public setCookie(name: string, value: any, exp: number): void {
    const date = new Date();
    date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
    document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
  }

  // get cookie
  public getCookie(name: string): string {
    var value = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
    return value ? value[2] : null;
  }

  // delete cookie
  public deleteCookie(name: string): void {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
  }

}
