import { User } from "../src/models/user";

export function isUserValid(user: User): boolean {
  return (
    isEmailValid(user.email) &&
    isPasswordValid(user.password) &&
    user.firstname.replace(" ", "").length > 0 &&
    user.lastname.replace(" ", "").length > 0
  );
}

export function isEmailValid(email: string): boolean {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return email.length > 0 && emailRegex.test(email);
}

export function isPasswordValid(password: string): boolean {
  const containsLowerCase = /[a-z]/.test(password);
  const containsUpperCase = /[A-Z]/.test(password);
  const containsNumber = /[0-9]/.test(password);
  const isMinLength = password.length > 5;
  return (
    containsLowerCase && containsUpperCase && containsNumber && isMinLength
  );
}
