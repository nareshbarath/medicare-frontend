import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth/auth-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  constructor(
    private router: Router,
    private authService: AuthServiceService
  ) {}

  submit(loginForm: any) {
    this.authService
      .loginAPI({
        email: loginForm.value.email,
        password: loginForm.value.password,
      })
      .subscribe(
        (res: any) => {
          localStorage.setItem('name', res.user.firstName);
          localStorage.setItem('role', res.user.role);
          localStorage.setItem('email', res.user.email);
          localStorage.setItem('token', res.token);
          if (res.user.role == 'Admin')
            this.router.navigateByUrl('sellers').then(() => location.reload());
            if (res.user.role == 'User')
            this.router.navigateByUrl('productslist').then(() => location.reload());
        },
        (err) => {
          Swal.fire('', err.error.message, 'warning');
        }
      );
  }

  register() {
    this.router.navigateByUrl('register');
  }
}
