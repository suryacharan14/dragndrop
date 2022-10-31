import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-target',
  templateUrl: './target.component.html',
  styleUrls: ['./target.component.scss'],
})
export class TargetComponent implements OnInit {
  @Input() features: Observable<any[]> | undefined;
  @Output() addFeature = new EventEmitter<string>();
  @Output() removeFeature = new EventEmitter<number>();
  elements: Observable<any[]> | null = null;
  constructor(public backend: BackendService) {}
  formGroup = new FormGroup({});

  ngOnInit(): void {
    this.elements = this.backend.table$;
  }

  drop(event: any) {
    if (event.target.classList.contains('box') && event.dataTransfer.types.includes('text/plain')) {
      event.preventDefault();
      let data = JSON.parse(event.dataTransfer.getData('text/plain'));
      if (data.type == 'element') {
        this.backend.addToTable(data);
      }
    }
  }

  dragover(event: any) {
    event.preventDefault();
  }

  remove(feature: number) {
    this.backend.removeFromTable(feature);
  }

  // addFunction(event: [number, string]) {
  //   // console.log(event);
  //   let data = JSON.parse(event[1]);
  //   if (data.type == 'function') {
  //     let index = event[0];
  //     this.backend.addFunction(index, data);
  //   }
  // }

  removeFunction(index: number){
    this.backend.removeFunction(index);
  }

  toJsonString(obj: any) {
    return JSON.stringify(obj);
  }

  addFunction(index: number){
    this.backend.funcIndex = index;
    this.backend.openDialogAs("add")
  }

  editFunction(index: number){
    this.backend.funcIndex = index;
    this.backend.openDialogAs("edit")
  }

  onChange(event: any){
    console.log(event)
  }

}
