import { ProductList } from './../../interfaces/product';
import { ProductService } from './../../services/product.service';
import { Router } from '@angular/router';
import { ConfirmationDialogComponent } from './../../components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'price', 'action'];
  dataSource!: MatTableDataSource<Product>;
  products!: ProductList;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private productService: ProductService
  ) {
  }

  ngOnInit() {
    this.productService.list().subscribe((p) => {
      this.products = p;
      this.dataSource = new MatTableDataSource(this.products);
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  delete(id: number, productName: string) {
    const dialog = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        title: 'Deletar Produto',
        content: `Tem certeza de que deseja deletar '${productName}'?`,
      },
    });

    dialog.afterClosed().subscribe((success) => {
      if (success) {
        this.products = this.products.filter((u) => u.id !== id.toString());
        this.dataSource.data = this.products;
      }
    });
  }

  edit(id: number) {
    this.router.navigateByUrl(`app/edit/${id}`);
  }

  showDetails(id: number) {}
}
