import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordsMatchValidator(
  control: AbstractControl
): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (
    password &&
    confirmPassword &&
    password.trim() !== confirmPassword.trim()
  ) {
    return { passwordMismatch: true };
  }
  return null;
}
