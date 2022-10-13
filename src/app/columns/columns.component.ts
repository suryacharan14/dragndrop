import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {
  @Input() features: Observable<string[]> | undefined;
  @Output() removeFeature = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  drop(event: any){
    event.preventDefault();
    this.removeFeature.emit(event.dataTransfer.getData("text/plain"));
  }

  dragover(event: any){
    event.preventDefault();
  }

}
