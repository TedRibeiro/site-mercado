import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { finalize, switchMap } from 'rxjs/operators';
import { ProductService } from './../../../services/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/authenticated-area/interfaces/product';
import { ActivatedRoute, Router } from '@angular/router';
import { of, pipe } from 'rxjs';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  product!: Product;
  loading = true;
  errorMsg = '';

  private _productId!: string;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {
    this._productId = this.activatedRoute.snapshot.params.productId;
  }

  ngOnInit(): void {
    this.productService.get(this._productId)
    .pipe(finalize(() => this.loading = false))
    .subscribe(
      p => this.product = p,
      error => {
        this.errorMsg = "Ocorreu um erro ao recuperar o produto."
      });
  }

  goBack() {
    history.back();
  }

  edit() {
    this.router.navigateByUrl(`app/edit/${this._productId}`);
  }

  delete() {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Deletar Produto',
        content: `Tem certeza de que deseja deletar '${this.product.name}'?`,
      },
    });

    dialog.afterClosed()
    .pipe(switchMap((success) => {
      if (success) {
        return this.productService.delete(this._productId);
      }

      return of(false);
    }))
    .subscribe(
    (res) => {
      if (res !== false) {
        this.router.navigateByUrl(`app/product-list`);

        this.snackBar.open('Produto removido com sucesso!', 'Ok', {
          horizontalPosition: 'right',
          verticalPosition: 'top',
          duration: 3000,
        });
      }
    },
    error => {
      this.snackBar.open('Erro na remoção do produto', 'Ok', {
        horizontalPosition: 'right',
        verticalPosition: 'top',
        duration: 3000,
      });
    });
  }
}
