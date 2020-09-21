import { Component, OnInit } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from "src/app/services/authentication.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {

    if(this.authenticationService.isLoggednIn()) this.router.navigateByUrl('')

    this.loginForm = this.formBuilder.group({
      email: ["", Validators.required],
      password: ["", Validators.required],
    });

    let user = this.authenticationService.currentUserValue;
    if (user) this.router.navigateByUrl("");

    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService.login(this.loginForm.value).subscribe((user : any) => {
      if (user.isAuthorized) {
        this.authenticationService.setToken(user); 
        this.router.navigateByUrl(this.returnUrl);
    } else {
        this.loading = false;
        this.alertService.error('Login Faild, Incorrect Email and Password')
    }
    })
  }

  public static matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null : { isMatching: false };
    };
  }
}


