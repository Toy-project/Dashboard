import { AbstractControl, ValidatorFn } from '@angular/forms';

export class Compare {

  public comparePassword(password: string, passwordConfirm: string): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const passwd = control.get(password).value;
      const passwdConfirm = control.get(passwordConfirm).value;
      if (!passwd || !passwdConfirm) {
        return null;
      } else if (passwd !== passwdConfirm) {
        control.get(passwordConfirm).setErrors({compare: true});
      } else {
        return null;
      }
    }
  }

}
