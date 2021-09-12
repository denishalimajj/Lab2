import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthService } from '../../services/auth.service'

@Component({
    selector: 'frontend-login',
    templateUrl: './login.component.html',
    styles: [],
})
export class LoginComponent implements OnInit {
    loginFormGroup!: FormGroup
    isSubmited = false

    constructor(private formBuilder: FormBuilder, private auth: AuthService) {}

    ngOnInit(): void {
        this._initLoginForm()
    }

    private _initLoginForm() {
        this.loginFormGroup = this.formBuilder.group({
            email: ['', [Validators.requiredTrue, Validators.email]],
            password: ['', Validators.requiredTrue],
        })
    }

    onLogin() {
        this.isSubmited = true

        if(this.loginFormGroup.invalid) return

        this.auth.login(
            this.loginForm.email.value,
            this.loginForm.password.value
        ).subscribe(user =>{
            
            console.log(user);
            
        })
    }

    get loginForm() {
        return this.loginFormGroup.controls
    }
}
