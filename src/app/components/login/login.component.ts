import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit()
  {
    this.loginForm = new FormGroup({
      'email': new FormControl(null,
        [Validators.required, Validators.email]),

      'pass': new FormControl(null,
        [Validators.required])

    });
  }

  get email() { return this.loginForm.get('email'); }
  get pass() { return this.loginForm.get('pass'); }

  onSubmit()
  {
    let user = new User();

    user.email = this.email.value;
    user.password = this.pass.value;

    this.authService.login(user)
      .subscribe(
        response => {
          if(this.authService.isLogged()) {
            let redirect = this.authService.redirectUrl ? this.router.parseUrl(this.authService.redirectUrl) : '/list';

          this.router.navigateByUrl(redirect);
          }
        },
        error => {
          Swal.fire({
            title: 'Email y/o contraseña incorrectos',
            text: 'error: ' + error.status + ', ' + error.statusText,
            type: 'warning'
          });
        }
      )
  }

}
