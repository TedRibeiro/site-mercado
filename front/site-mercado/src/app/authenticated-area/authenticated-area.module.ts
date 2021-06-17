import { MatSidenavModule } from '@angular/material/sidenav';
import { ComponentsModule } from './../components/components.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthenticatedAreaComponent } from './authenticated-area.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: AuthenticatedAreaComponent,
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'new', component: ProductFormComponent },
      { path: 'edit/:productId', component: ProductFormComponent },
      { path: 'product-list', component: ProductListComponent },
    ],
  },
];

@NgModule({
  declarations: [
    AuthenticatedAreaComponent,
    ProductFormComponent,
    ProductListComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ComponentsModule,
    MatSidenavModule,
  ],
})
export class AuthenticatedAreaModule {}
