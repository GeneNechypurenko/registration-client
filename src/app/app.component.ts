import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ApiService } from './services/api.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, OnDestroy {
  username: string | null = '';
  isLoggedIn$: Observable<boolean>;

  constructor(private router: Router, private apiService: ApiService) {
    this.isLoggedIn$ = this.apiService.isLoggedIn$;
  }

  ngOnInit() {
    this.username = this.apiService.getUserSession();
  }

  navigateTo(route: string) {
    this.router.navigate([route]);
  }

  logout() {
    this.apiService.clearUserSession();
    this.router.navigate(['/login']);
  }

  ngOnDestroy() { }
}
