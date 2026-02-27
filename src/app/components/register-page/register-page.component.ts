import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent {
  form: any = {
    username: null,
    firstName: null,
    lastName: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  onSubmit(): void {
    const { username, firstName, lastName, password } = this.form;

    this.authService.register(username, firstName, lastName, password).subscribe({
      next: (response: any) => {
        console.log('✅ SUCCESS - Response type:', typeof response);
        console.log('✅ SUCCESS - Response value:', response);
        console.log('✅ SUCCESS - Response keys:', Object.keys(response || {}));

        this.isSuccessful = true;
        this.isSignUpFailed = false;

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error: (err: any) => {
        console.log('❌ ERROR - Error object:', err);
        console.log('❌ ERROR - Error status:', err.status);
        console.log('❌ ERROR - Error message:', err.message);
        console.log('❌ ERROR - Error error:', err.error);

        this.errorMessage = 'Registration failed - but check database, user was created!';
        this.isSignUpFailed = true;
      }
    });
  }
}
