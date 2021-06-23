import { ProductListModule } from './product-list/product-list.module';
import { ProductFormModule } from './product-form/product-form.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { SharedModule } from './../shared/shared.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedAreaComponent } from './authenticated-area.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductDetailsComponent } from './product-list/product-details/product-details.component';
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

@NgModule({
  declarations: [
    AuthenticatedAreaComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    SharedModule,
    MatSidenavModule,
    DashboardModule,
    ProductFormModule,
    ProductListModule
  ],
})
export class AuthenticatedAreaModule {}
