import { SharedModule } from './../shared/shared.module';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedAreaComponent } from './authenticated-area.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PhotoPickerComponent } from './product-form/photo-picker/photo-picker.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { CurrencyMaskConfig, CurrencyMaskModule, CURRENCY_MASK_CONFIG } from 'ng2-currency-mask';
import { MatTableModule } from '@angular/material/table';
import { ProductDetailsComponent } from './product-list/product-details/product-details.component';
import { getPortuguesePaginatorIntl } from './portuguese-paginator-intl';
import { ResolveImageDirective } from './directives/resolve-image.directive';
import { ComponentsModule } from './components/components.module';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedAreaComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'new', component: ProductFormComponent },
      { path: 'edit/:productId', component: ProductFormComponent },
      { path: 'product-list', component: ProductListComponent },
      { path: 'product-list/:productId', component: ProductDetailsComponent },
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
];

export const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  decimal: ",",
  precision: 2,
  prefix: "R$ ",
  suffix: "",
  thousands: "."
};


@NgModule({
  declarations: [
    AuthenticatedAreaComponent,
    ProductFormComponent,
    ProductListComponent,
    DashboardComponent,
    ProductDetailsComponent,
    PhotoPickerComponent,
    ResolveImageDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    SharedModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatTableModule,
    MatProgressBarModule,
    MatPaginatorModule,
    MatTooltipModule,
    ReactiveFormsModule,
    CurrencyMaskModule
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
    { provide: MatPaginatorIntl, useValue: getPortuguesePaginatorIntl() }
  ],
})
export class AuthenticatedAreaModule {}
