import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  name: string = '';
  secondName: string = '';
  gender: string = '';

  constructor(private apiService: ApiService) { }

  register() {
    const userData = {
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword,
      username: this.username,
      name: this.name,
      secondName: this.secondName,
      gender: this.gender
    };

    this.apiService.registerUser(userData).subscribe(
      (response) => {
        console.log('Registration successful', response);
        alert(`${this.username} registered!`);
      },
      (error) => {
        console.error('Registration failed', error);
        alert('Something gone wrong! An error acquired during registration!')
      }
    );
  }
}
