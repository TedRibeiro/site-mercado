import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PhotoPickerComponent } from './photo-picker/photo-picker.component';
import { MatIconModule } from '@angular/material/icon';
import { ProductFormComponent } from './product-form.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { CurrencyMaskConfig, CURRENCY_MASK_CONFIG, CurrencyMaskModule } from 'ng2-currency-mask';

const CustomCurrencyMaskConfig: CurrencyMaskConfig = {
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
    ProductFormComponent,
    PhotoPickerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    MatIconModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    CurrencyMaskModule,
    MatSnackBarModule
  ],
  exports: [
    ProductFormComponent
  ],
  providers: [
    { provide: CURRENCY_MASK_CONFIG, useValue: CustomCurrencyMaskConfig },
  ]
})
export class ProductFormModule { }
