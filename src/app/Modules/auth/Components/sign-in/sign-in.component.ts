import { CommonModule } from '@angular/common';
import { Component, computed } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';
import { SignInResponse } from '../../../../Services/models/responses';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signInForm!: FormGroup;
  isLoggedIn = computed(() => this.authService.isLoggedInSignal());
  constructor(
    private signInBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService
  ) {
    this.signInForm = this.signInBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    if (this.isLoggedIn()) {
      this.router.navigate(['main']);
    }
  }

  onSignInSubmit() {
    const request = {
      email: this.signInForm.get('email')!.value,
      password: this.signInForm.get('password')!.value,
    };

    if (this.signInForm.valid) {
      this.authService.signIn(request).subscribe({
        next: (response: SignInResponse) => {
          this.authService.setToken(
            response.accessToken,
            response.refreshToken
          );
          this.authService.isLoggedInSignal.set(true);
          this.router.navigate(['main']);
        },
        error: (error: HttpErrorResponse) => {
          this.toastr.error(JSON.stringify(error), 'Error Signing in');
        },
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
