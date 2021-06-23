import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { SharedModule } from './../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { getPortuguesePaginatorIntl } from './portuguese-paginator-intl';
import { ResolveImageDirective } from '../directives/resolve-image.directive';



@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailsComponent,
    ResolveImageDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [ProductDetailsComponent],
  providers: [
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() }
  ],
})
export class ProductListModule { }
