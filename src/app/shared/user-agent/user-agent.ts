export class UserAgent {
  
  // get user agnet
  public getBrowser(): string {
    // valiable set
    const userAgent:string = navigator.userAgent;
    let browser:string;

    switch (true) {
      case /Trident\/6.0/.test(userAgent): // ie 10
        browser = 'ie';
        break;

      case /Trident\/7.0/.test(userAgent): // ie 11
        browser = 'ie';
        break;
    
      case /Edge/.test(userAgent):
        browser = 'edge';
        break;
    
      case /Chrome/.test(userAgent):
        browser = 'chrome';
        break;
    
      case /Safari/.test(userAgent):
        browser = 'safari';
        break;
    
      case /Firefox/.test(userAgent):
        browser = 'firefox';
        break;
    
      case /Opera/.test(userAgent):
        browser = 'opera';
        break;
    
      default:
        browser = 'etc'; // etc browser or ie 9,...  
    }

    return browser;
  }

  // get pc or mobile
  public getPcMobile(): string {
    // valiable set
    const platform:string = navigator.platform;
    const filter: string = "win16|win32|win64|mac|macintel";
    let device: string;

    if (filter.indexOf(platform.toLowerCase()) < 0) {
      device = 'mobile';
    } else {
      device = 'pc';
    }

    return device;
  }

}
