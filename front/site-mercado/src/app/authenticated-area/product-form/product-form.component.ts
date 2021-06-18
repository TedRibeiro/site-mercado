import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from './../../interfaces/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  productForm!: FormGroup;
  errorMsg!: string;
  formTitle!: string;

  private productId!: string;
  private get isUpdate() {
    return !!this.productId;
  }

  constructor(
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) {
    this.productId = this.activatedRoute.snapshot.params.productId;
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required, Validators.maxLength(60)],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      price: ['', Validators.required],
      photoUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.formTitle = this.isUpdate ? 'Editar Produto' : 'Novo Produto';
  }

  save() {
    if (!this.productForm.valid) {
      const product: Product = this.productForm.value;

      this.productService.save(product).subscribe(
        (success) => {
          if (success) {
            this.snackBar.open('Produto adicionado com sucesso!', 'Ok', {
              horizontalPosition: 'right',
              verticalPosition: 'top',
              duration: 3000,
            });

            this.router.navigateByUrl('app/product-list');
          }
        },
        (error) => {
          this.errorMsg = `Erro ao adicionar o produto`;
        }
      );
    }
  }
}
