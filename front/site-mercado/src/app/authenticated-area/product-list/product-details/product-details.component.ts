import { finalize } from 'rxjs/operators';
import { ProductService } from './../../../services/product.service';
import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/authenticated-area/interfaces/product';
import { ActivatedRoute } from '@angular/router';
import { pipe } from 'rxjs';

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
    private activatedRoute: ActivatedRoute
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
}
