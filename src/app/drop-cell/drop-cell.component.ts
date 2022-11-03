import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AppFunction } from '../interfaces';

@Component({
  selector: 'app-drop-cell',
  templateUrl: './drop-cell.component.html',
  styleUrls: ['./drop-cell.component.scss']
})
export class DropCellComponent implements OnInit {
  @Input() function: any;
  @Input() functionIndex = -1;
  @ViewChild('ref') ref: any;

  constructor() { }

  ngOnInit(): void {
  }

  dragover(event: any){
    event.preventDefault();
  }

  onElementDrop(event: any){
    // this.validated = false;
    let eventData = event.dataTransfer.getData('text/plain');
    if(event.target != this.ref?.nativeElement) return;
    if(eventData){
      let data = JSON.parse(eventData);
      if(data.type == "element"){
        event.target.innerText = data.id;
      }
      if(data.type == "function"){
        let functionIndex = event.target.dataset["functionIndex"];
        let argIndex = event.target.dataset["argIndex"];
        if(functionIndex && argIndex){
          this.function.fields[argIndex] = JSON.parse(eventData);
        }
      }
    }
  }

}
