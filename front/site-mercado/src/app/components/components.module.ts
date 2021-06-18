import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidenavComponent } from './sidenav/sidenav.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { PhotoPickerComponent } from './photo-picker/photo-picker.component';
import { ListItemComponent } from './list-item/list-item.component';


@NgModule({
  declarations: [
    HeaderComponent,
    SidenavComponent,
    PhotoPickerComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatMenuModule,
    MatListModule
  ],
  exports: [
    HeaderComponent,
    SidenavComponent,
    PhotoPickerComponent,
    ListItemComponent
  ]
})
export class ComponentsModule { }
