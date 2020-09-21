import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Client App';
  currentUser: any;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        
    }
  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
        this.authenticationService.logout();
        this.router.navigate(['/auth/login']);
    }
}
