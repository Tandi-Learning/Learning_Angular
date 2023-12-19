import { Injectable } from '@angular/core';
import { Ingridient } from '../../app/shared';

@Injectable()
export class ShoppingListService {
  private items: Ingridient[] = [];

  constructor() { }

  getItem(): Ingridient[] {
    return this.items;
  }

  addItems(items: Ingridient[]) {
    Array.prototype.push.apply(this.items, items);
  }

  addItem(item: Ingridient) {
    this.items.push(item);
  }

  editItem(oldItem: Ingridient, newItem: Ingridient) {
    this.items[this.items.indexOf(oldItem)] = newItem;
  }


  deleteItem(item: Ingridient) {
    this.items.splice(this.items.indexOf(item), 1);
  }
}
