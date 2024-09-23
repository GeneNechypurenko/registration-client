import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://localhost:7045/api/account';
  private isLoggedInSubject = new BehaviorSubject<boolean>(this.getUserSession() !== null);
  isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(`${this.apiUrl}/users`);
  }

  registerUser(userData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  loginUser(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        if (response && response.username) {
          this.setUserSession(response.username);
          localStorage.setItem('userSession', String(response.userId));
        }
      })
    );
  }

  setUserSession(username: string): void {
    localStorage.setItem('username', username);
    this.isLoggedInSubject.next(true);
  }

  getUserSession(): string | null {
    return localStorage.getItem('username');
  }

  clearUserSession(): void {
    localStorage.removeItem('username');
    this.isLoggedInSubject.next(false);
  }

  getUserSessionId(): number | null {
    const userSession = localStorage.getItem('userSession');
    return userSession ? Number(userSession) : null;
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateUser(id: number, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, userData);
  }
}
