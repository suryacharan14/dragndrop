import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-feature',
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss']
})
export class FeatureComponent implements OnInit {
  @Input() feature: any = null;
  @Input() showRemove = false;
  @Output() removeFeature = new EventEmitter<number>();
  @Input() index: number | undefined;
  constructor(private backend: BackendService) {
   }

  ngOnInit(): void {
  }

  drag(event: any){
    event.dataTransfer.setData("text/plain", JSON.stringify(this.feature));
  }

  onRemove(){
    if(this.index != undefined){
      this.removeFeature.emit(this.index);
    }
  }

  get disabled(){
    return this.backend.contains(this.feature) && !this.backend.isMultiple;
  }

}
