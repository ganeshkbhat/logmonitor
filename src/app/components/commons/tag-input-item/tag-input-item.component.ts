import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tag-input-item',
  templateUrl: './tag-input-item.component.html',
  styleUrls: ['./tag-input-item.component.css'],
  host: {
    '[class.ng2-tag-input-item-selected]': 'selected'
  }
})
export class TagInputItemComponent implements OnInit {

  @Input() selected: boolean;
  @Input() text: string;
  @Input() index: number;
  @Output() tagRemoved: EventEmitter<number> = new EventEmitter();

  constructor() { }

  removeTag() {
    this.tagRemoved.emit(this.index);
  }

  ngOnInit(){

  }

}
