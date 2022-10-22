import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-drop-target',
  templateUrl: './drop-target.component.html',
  styleUrls: ['./drop-target.component.scss']
})
export class DropTargetComponent implements OnInit {
  @Output() onDrop = new EventEmitter<[number, string]>();
  @Input() index: number = -1;
  hovered = false;
  constructor() { }

  ngOnInit(): void {
  }

  drop(event: any){
    event.preventDefault();
    this.hovered = false;
    this.onDrop.emit([this.index, event.dataTransfer.getData("text/plain")]);
  }

  dragover(event: any){
    event.preventDefault();
    this.hovered = true;
  }

  dragend(event: any){
    this.hovered = false;
  }


}
