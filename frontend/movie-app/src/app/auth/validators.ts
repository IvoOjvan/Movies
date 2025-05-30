import { AbstractControl, ValidatorFn } from '@angular/forms';

export function emailValidators(): ValidatorFn {
  return (control: AbstractControl): Record<string, boolean> | null => {
    const email = control.value;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return email && emailRegex.test(email) ? null : { invalidEmail: true };
  };
}

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): Record<string, boolean> | null => {
    const password = control.value;
    const containsLowerCase = /[a-z]/.test(password);
    const containsUpperCase = /[A-Z]/.test(password);
    const containsNumber = /[0-9]/.test(password);
    const isMinLength = password?.length >= 6;
    return password &&
      containsLowerCase &&
      containsUpperCase &&
      containsNumber &&
      isMinLength
      ? null
      : { invalidPassword: true };
  };
}
