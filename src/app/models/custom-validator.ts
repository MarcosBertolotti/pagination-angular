import { SignupService } from '../services/signup.service';
import { AsyncValidatorFn, AbstractControl, ValidatorFn, FormGroup } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export class CustomValidator {

    static emailRepeatValidator(signupService: SignupService): AsyncValidatorFn
    {
        return (emailControl: AbstractControl): Observable<{ [key: string]: boolean } | null> => {
            return signupService.isExistsEmail(emailControl.value)
                .pipe(
                    map(response => {
                        return null;
                    }),
                    catchError(error => {
                        return error.status == 409 ? of({ 'emailExists': true }) : null;
                    })
                );
        }
    }

    static passwordConfirmValidator(): ValidatorFn
    {
        return (registerForm: FormGroup): { [key: string]: boolean } | null => {

            const pass = registerForm.get('pass').value;
            const passConfirm = registerForm.get('passConfirm').value;

            return (pass !== passConfirm) ? { 'passwordConfirm': true } : null
        }
    }


}
