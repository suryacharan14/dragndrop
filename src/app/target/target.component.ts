import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss']
})
export class TargetComponent implements OnInit {
  @Input() features: Observable<string[]> | undefined;
  @Output() addFeature = new EventEmitter<string>();
  @Output() removeFeature= new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  drop(event: any){
    event.preventDefault();
    this.addFeature.emit(event.dataTransfer.getData("text/plain"));
  }

  dragover(event: any){
    event.preventDefault();
  }

  remove(feature: string){
    this.removeFeature.emit(feature);
  }

}
