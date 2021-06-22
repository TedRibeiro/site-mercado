import { AuthenticationService } from './../services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-authenticated-area',
  templateUrl: './authenticated-area.component.html',
  styleUrls: ['./authenticated-area.component.scss']
})
export class AuthenticatedAreaComponent implements OnInit {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  signOut() {
    const dialog = this.dialog.open(
      ConfirmationDialogComponent,
      {
        data: {
          title: 'Sair',
          content: 'Tem certeza de que deseja sair da sua conta?'
        }
      }
    );

    // TODO: Alterar para switchMap
    dialog.afterClosed().subscribe((confirmed) => {
      if (confirmed) {
        this.authService.signOut()
        .subscribe((success) => {
          if (success) {
            this.router.navigateByUrl('');
          }
        })
      }
    })
  }

}
