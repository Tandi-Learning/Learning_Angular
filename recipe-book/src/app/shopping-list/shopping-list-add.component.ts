import { Component, OnInit, Input, OnChanges, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Ingridient } from "../../app/shared";
import { ShoppingListService } from "../../app/shopping-list";

@Component({
  selector: 'rb-shopping-list-add',
  templateUrl: './shopping-list-add.component.html',
  styles: []
})
export class ShoppingListAddComponent implements OnInit, OnChanges {

  @Input() item: Ingridient;
  @Output() cleared: EventEmitter<null> = new EventEmitter();
  isAdd: boolean = true;

  constructor(private shoppingListService: ShoppingListService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['item'].currentValue === null) {
      this.isAdd = true;
      this.item = {name: '', amount: 0};
      // this.item = {name: null, amount: null};
    } else {
      this.isAdd = false;
    }
  }

  onSubmit(ingridient: Ingridient) {
    let newIngridient: Ingridient = new Ingridient(ingridient.name, ingridient.amount);
    if (this.isAdd) {
      this.item = newIngridient
      this.shoppingListService.addItem(this.item);
    } else {
      this.shoppingListService.editItem(this.item, newIngridient);
      this.onClear();
    }
  }

  onDelete() {
    this.shoppingListService.deleteItem(this.item);
    this.onClear();
  }

  onClear() {
    this.isAdd = true
    this.cleared.emit(null);
  }
}
