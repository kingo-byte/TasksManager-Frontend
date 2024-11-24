import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  signInForm!: FormGroup;
  
  constructor(private signInBuilder: FormBuilder, private router: Router){
    this.signInForm = this.signInBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required] 
    });
  }

  onSignInSubmit()
  {
     if(this.signInForm.valid){
       console.log(this.signInForm.value);

       //make your call to the backend
      //  this.commonService.login('test-token');
       this.router.navigate(['']);
     }  
     else{
      this.signInForm.markAllAsTouched();
     }
  }
}
