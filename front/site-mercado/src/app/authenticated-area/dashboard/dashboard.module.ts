import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { DashboardComponent } from './dashboard.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    MatIconModule,
    RouterModule
  ],
  exports: [DashboardComponent]
})
export class DashboardModule { }
