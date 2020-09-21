import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MustMatch } from 'src/app/helpers/password.mustmatch';
import { IUser } from 'src/app/models/user';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService
    ) { 
    }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', Validators.required],
            mobile: ['', Validators.required],
            address: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            retypePass: ['', Validators.required]
            }, 
            {
                validator: MustMatch('password', 'retypePass')
            });
    }

    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        this.loading = true;

        this.authenticationService.reg(this.registerForm.value as IUser).subscribe((r: any) => {
            if(r.status){

                if(!this.authenticationService.currentUserValue) return this.router.navigateByUrl('/auth/login');

                this.registerForm.reset();
                this.registerForm.patchValue({
                        firstName: '',
                        lastName: '',
                        email: '',
                        mobile: '',
                        address: '',
                        password: '',
                        retypePass: ''
                    });

                this.alertService.success('user registration has been success')
            }
            this.submitted = false;
            this.loading = false;
        })
    }

}
