import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authenticated-area',
  templateUrl: './authenticated-area.component.html',
  styleUrls: ['./authenticated-area.component.scss']
})
export class AuthenticatedAreaComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    this.authService.signOut()
    .subscribe((success) => {
      if (success) {
        this.router.navigateByUrl('');
      }
    })
  }

}
