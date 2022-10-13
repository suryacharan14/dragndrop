import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  @Input() feature: string = "";
  @Input() showRemove = false;
  @Output() removeFeature = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  drag(event: any){
    event.dataTransfer.setData("text/plain", this.feature);
  }

  onRemove(){
    this.removeFeature.emit(this.feature);
  }

}
