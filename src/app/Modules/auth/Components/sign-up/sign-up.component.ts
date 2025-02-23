import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { passwordsMatchValidator } from './validators/sign-up.component.validator';
import { SignUpRequest } from '../../../../Services/models/requests';
import { AuthService } from '../../../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CommonModule, RouterModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent implements OnInit {
  fg!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.fg = this.fb.group(
      {
        userName: [null, [Validators.pattern('^(?!\\s*$).+')]],
        email: [
          null,
          [
            Validators.required,
            Validators.email,
            Validators.pattern('^(?!\\s*$).+'),
          ],
        ],
        password: [
          null,
          [Validators.required, Validators.pattern('^(?!\\s*$).+')],
        ],
        confirmPassword: [
          null,
          [Validators.required, Validators.pattern('^(?!\\s*$).+')],
        ],
      },
      { validators: passwordsMatchValidator }
    );
  }

  onSubmit(): void {
    if (this.fg.invalid) {
      this.fg.markAllAsTouched();
      return;
    }

    const request: SignUpRequest = {
      userName: this.fg.get('userName')?.value,
      email: this.fg.get('email')?.value,
      password: this.fg.get('password')?.value,
    };

    this.authService.signUp(request).subscribe({
      next: (resp) => {
        this.toastr
          .success('Sign up successful', 'Success')
          .onHidden.subscribe(() => {
            this.router.navigate(['']);
          });
      },
      error: (error) => {
        const errorsObj = error.error.errors;
        let message: string = '';
        for (const key in errorsObj) {
          if (errorsObj.hasOwnProperty(key)) {
            message += `${errorsObj[key].join(', ')}\n`;
          }
        }
        this.toastr.error(message, error.error.title);
      },
    });
  }
}
