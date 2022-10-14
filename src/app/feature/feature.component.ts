import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  @Input() feature: string = "";
  @Input() showRemove = false;
  @Output() removeFeature = new EventEmitter<number>();
  @Input() index: number | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  drag(event: any){
    event.dataTransfer.setData("text/plain", this.feature);
  }

  onRemove(){
    if(this.index != undefined){
      this.removeFeature.emit(this.index);
    }
  }

}
