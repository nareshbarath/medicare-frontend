import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user/user-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private router: Router,
    private userService: UserServiceService
  ) {}
  submit(registerForm: any) {
    console.log(registerForm.value);
    this.userService
      .registerAPI({
        firstName: registerForm.value.firstname,
        secondName: registerForm.value.firstname,
        phone: registerForm.value.phone,
        password: registerForm.value.password,
        email: registerForm.value.email,
        age: registerForm.value.age,
        DOB: registerForm.value.dob,
        role: 'User',
      })
      .subscribe(
        (res: any) => {
          this.router
            .navigateByUrl('login')
            .then(() =>
              Swal.fire('', 'User registered successfully', 'success')
            );
        },
        (err) => {
          Swal.fire('', err.error.message, 'warning');
        }
      );
  }

  login() {
    this.router.navigateByUrl('login');
  }
}
