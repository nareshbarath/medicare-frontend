import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  role: any = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    if (this.role != 'Admin' && this.role != 'User') this.role = 'Default';
    if (this.role == 'Default') {
      this.router.navigateByUrl('login');
    } else if (this.role == 'Admin') {
      this.router.navigateByUrl('sellers');
    } else if (this.role == 'User') {
      this.router.navigateByUrl('productslist');
    }
  }

  Logout() {
    localStorage.clear();
    sessionStorage.clear();
    this.ngOnInit();
    this.router.navigateByUrl('login');
  }
}
