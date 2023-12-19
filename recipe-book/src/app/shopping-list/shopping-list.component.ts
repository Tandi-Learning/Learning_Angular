import { Component, OnInit } from '@angular/core';
import { Ingridient } from '../../app/shared';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'rb-shopping-list',
  templateUrl: './shopping-list.component.html',
  styles: []
})
export class ShoppingListComponent implements OnInit {
  items: Ingridient[] = [];
  selectedItem: Ingridient; // = null;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
    this.items = this.shoppingListService.getItem();
  }

  onSelectItem(item: Ingridient){
    this.selectedItem = item;
  }

  onCleared(value: Ingridient) {
    this.selectedItem = value;
  }
}
