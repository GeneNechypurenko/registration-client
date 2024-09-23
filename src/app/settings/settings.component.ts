import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  username: string = '';
  name: string = '';
  secondName: string = '';
  gender: string = '';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    const userId = this.apiService.getUserSessionId();
    if (userId) {
      this.apiService.getUserById(userId).subscribe(
        user => {
          this.email = user.email;
          this.username = user.username;
          this.name = user.name;
          this.secondName = user.secondName;
          this.gender = user.gender;
        },
        error => {
          console.error('Failed to load user data', error);
        }
      );
    }
  }

  updateUser() {
    const userId = this.apiService.getUserSessionId();
    if (userId) {
      const userData = {
        id: userId,
        email: this.email,
        username: this.username,
        name: this.name,
        secondName: this.secondName,
        gender: this.gender,
        password: this.password
      };

      this.apiService.updateUser(userId, userData).subscribe(
        () => {
          console.log('User updated successfully');
        },
        error => {
          console.error('Failed to update user', error);
        }
      );
    }
  }
}

