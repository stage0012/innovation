import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('token')){
      return true; // allow access to home page
    } else {
      this.router.navigate(['/login']); // redirect to login page
      return false; // prevent access to home page
    }
  }
}
