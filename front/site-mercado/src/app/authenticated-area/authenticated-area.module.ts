import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedAreaComponent } from './authenticated-area.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  { path: '', component: AuthenticatedAreaComponent }
]

@NgModule({
  declarations: [
    AuthenticatedAreaComponent,
    ProductFormComponent,
    ProductListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AuthenticatedAreaModule { }
