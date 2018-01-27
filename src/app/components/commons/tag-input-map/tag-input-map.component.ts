import { Component, OnInit } from '@angular/core';
import { StreamSocketsService } from '../../../services/stream/sockets/stream.sockets.service';
import { CommonsService } from '../../../services/commons/functions/commons/commons.service';

@Component({
  selector: 'app-tag-input-map',
  templateUrl: './tag-input-map.component.html',
  styleUrls: ['./tag-input-map.component.css']
})
export class TagInputMapComponent implements OnInit {

  constructor(public _ss: StreamSocketsService, public _cs: CommonsService) {

  }

  ngOnInit() {}

  onStreamColumnClick(option: String, index: number) {
      const arr: String[] = [];
      if (this._ss.streamSelectedColumns.length) {
        for (let i = 0; i < this._ss.streamSelectedColumns.length; i++) {
          console.log(option, this._ss.streamSelectedColumns[i], index);
          if (this._ss.streamSelectedColumns[i] !== option) {
            arr.push(option);
            if (arr.length === this._ss.streamSelectedColumns.length) {
              this._ss.streamSelectedColumns[index] = option;
            }
          } else {
            break;
          }
        }
      } else {
        this._ss.streamSelectedColumns[index] = option;
      }
  }

  onStreamSelectedColumnClick(option: String, index: number) {
      for (let i = 0; i < this._ss.streamOptionColumns.length; i++) {
        if (this._ss.streamOptionColumns[i] === option) {
          this._ss.streamSelectedColumns[index] = undefined;
          break;
        }
      }
  }

  onAddAll() {
    this._ss.streamSelectedColumns = this._cs.clone(this._ss.streamOptionColumns);
    return false;
  }

  onSubtractAll() {
    this._ss.streamSelectedColumns = [];
    return false;
  }

}
