import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from 'src/app/models/user';
import { SignupService } from 'src/app/services/signup.service';
import Swal from 'sweetalert2';
import { CustomValidator } from 'src/app/models/custom-validator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private signupService: SignupService) { }

  ngOnInit()
  {
    this.registerForm = new FormGroup({
      'email': new FormControl(null,
        [Validators.required, Validators.email],
        [CustomValidator.emailRepeatValidator(this.signupService)]),

      'pass': new FormControl(null,
        [Validators.required, Validators.maxLength(15)]),
      
      'passConfirm': new FormControl(null,
        [Validators.required, Validators.maxLength(15)])

    }, { validators: CustomValidator.passwordConfirmValidator() })
  }

  get email(){ return this.registerForm.get('email'); }
  get pass(){ return this.registerForm.get('pass'); }
  get passConfirm(){ return this.registerForm.get('passConfirm'); }

  onSubmit()
  {
    let user = new User();

    user.email = this.email.value;
    user.password = this.pass.value;

    this.signupService.signup(user)
      .subscribe(
        response => {
          Swal.fire({
            title: 'Usuario Creado Exitosamente',
            text: 'Bienvenido!',
            type: 'success'
          });
        },
        error => {
          Swal.fire({
            title: 'Oops!... Hubo un problema al registrarse.',
            text: 'Error: ' + error.status + ', ' + error.statusText,
            type: 'warning'
          });
        }
      );
  }



}
