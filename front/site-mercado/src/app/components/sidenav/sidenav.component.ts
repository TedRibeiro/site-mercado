import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Output() sidenavClose = new EventEmitter();

  sidenavItems: Array<SidenavItem> = [
    { routerLink: 'dashboard', icon: 'home', caption: 'Início' },
    { routerLink: 'product-list', icon: 'list', caption: 'Produtos' },
    { routerLink: 'new', icon: 'add_circle_outline', caption: 'Adicionar Produto' },
  ];

  constructor() { }

  ngOnInit(): void {
  }

  onSidenavClose() {
    this.sidenavClose.emit();
  }

}

interface SidenavItem {
  routerLink: string;
  icon: string;
  caption: string;
}
