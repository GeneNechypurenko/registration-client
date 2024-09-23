import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private apiService: ApiService, private router: Router) { }

  login() {
    const credentials = { email: this.email, password: this.password };
    this.apiService.loginUser(credentials).subscribe(
      response => {
        console.log(response.message);
        this.apiService.setUserSession(response.username);
        localStorage.setItem('userSession', response.userId);
        this.router.navigate(['/settings']);
      },
      error => {
        console.error('Login failed', error);
      }
    );
  }
}
