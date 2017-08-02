import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star',
  templateUrl: './star.component.html',
  styles: []
})
export class StarComponent implements OnInit {
  @Input() numberOfStars = [];

  constructor() {
  }

  ngOnInit() {
  }

}
