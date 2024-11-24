import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../Services/auth.service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm!: FormGroup;
  
  constructor(private signInBuilder: FormBuilder, private router: Router, private authService: AuthService) { 
    this.signInForm = this.signInBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required] 
    });
  }

    onSignInSubmit() {
      const request = { 
          email: this.signInForm.get('email')!.value,
          password: this.signInForm.get('password')!.value 
      };

      if (this.signInForm.valid) {
          this.authService
              .signIn(request)
              .subscribe((response: string) => {
                  this.authService.setToken(response);
                  this.authService.isLoggedInSignal.set(true);
                  this.router.navigate(['main']);
              });
      } else {
          this.signInForm.markAllAsTouched();
      }
  }
}
