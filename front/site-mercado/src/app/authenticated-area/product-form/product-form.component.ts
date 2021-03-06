import { environment } from './../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../../services/product.service';
import { Product } from '../interfaces/product';
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
  formTitle = 'Novo Produto';
  uploadProgress!: number;

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
      name: ['', [Validators.required, Validators.maxLength(60)]],
      description: ['', [Validators.required, Validators.maxLength(300)]],
      price: ['', Validators.required],
      photoUrl: ['', Validators.required],
    });
  }

  async ngOnInit(): Promise<void> {
    if (this.isUpdate) {
      this.formTitle = 'Editar Produto';

      const product = await this.productService.get(this.productId).toPromise();
      this.productForm.patchValue(product);
    }
  }

  save() {
    if (this.productForm.valid) {
      const product: Product = this.productForm.value;
      if(this.isUpdate) {
        this._updateProduct(product);
        return;
      }
      this._insertProduct(product);
    }
  }

  private _insertProduct(product: Product) {
    this.productService.save(product).subscribe(
      (success) => {
        this.openModal('Produto adicionado com sucesso!');
        this.router.navigateByUrl('app/product-list');
      },
      (error) => {
        this.errorMsg = `Erro ao adicionar o produto`;
      }
    );
  }

  private _updateProduct(product: Product) {
    product.id = this.productId;

    this.productService.update(product).subscribe(
      (success) => {
        this.openModal('Produto editado com sucesso!');
        this.router.navigateByUrl('app/product-list');
      },
      (error) => {
        this.errorMsg = `Erro ao atualizar o produto`;
      }
    );
  }

  private openModal(message: string){
    this.snackBar.open(message, 'Ok', {
      horizontalPosition: 'right',
      verticalPosition: 'top',
      duration: 3000,
    });
  }

  goBack() {
    history.back();
  }

  onPhotoUploaded(fileName: string) {
    this.productForm.patchValue({ photoUrl: fileName });
  }

  resolveImgPath(relativePath: string) {
    if (!!relativePath) {
      return `${environment.baseUrl}/${relativePath.replace(/\\/g, '/')}`;
    }
    return '';
  }
}
