import { ProductQueryParameters } from './../interfaces/product-query';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProductList } from '../interfaces/product';
import { ProductService } from './../../services/product.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from './../components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/authenticated-area/interfaces/product';
import { switchMap, finalize, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { of } from 'rxjs';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'action'];
  dataSource!: MatTableDataSource<Product>;
  products!: ProductList;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  loading = false;
  hasError = false;

  pageIndex: number = 0;
  pageSize: number = 10;
  length!: number;

  searchControl = new FormControl();

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private productService: ProductService,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit() {
    this.configureSearchField();
    setTimeout(() => this.getProducts());
  }

  configureSearchField() {
    this.searchControl
      .valueChanges
      .pipe(
        debounceTime(400),
        distinctUntilChanged())
        .subscribe(() => this.getProducts());
  }

  delete(id: string, productName: string) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Deletar Produto',
        content: `Tem certeza de que deseja deletar '${productName}'?`,
      },
    });

    dialog.afterClosed()
    .pipe(switchMap((success) => {
      if (success) {
        return this.productService.delete(id);
      }

      return of(false);
    }))
    .subscribe(
    (res) => {
      if (res !== false) {
        this.dataSource.data = this.dataSource.data.filter(d => d.id !== id);

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

  edit(id: number) {
    this.router.navigateByUrl(`app/edit/${id}`);
  }

  getProducts() {
    this.loading = true;
    this.hasError = false;

    this.productService.getPaged(this.queryParams)
    .pipe(finalize(() => { this.loading = false; }))
    .subscribe(
      res => {
        console.log(res.data);
        this.dataSource = new MatTableDataSource<any>(res.data);
        const [{ pageIndex, pageSize, length }] = [ res.pagingData ];
        this.length = length;
        this.pageIndex = pageIndex;
        this.pageSize = pageSize
      },
      error => {
        this.dataSource = new MatTableDataSource<any>();
        this.hasError = true;
      }
    );
  }

  get queryParams(): ProductQueryParameters {
    return {
      pageNumber: this.paginator.pageIndex,
      pageSize: this.paginator.pageSize,
      searchTerm: this.searchControl.value?.trim(),
      sortActive: this.sort.active,
      sortDirection: this.sort.direction
    };
  }
}
