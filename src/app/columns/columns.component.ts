import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-columns',
  templateUrl: './columns.component.html',
  styleUrls: ['./columns.component.scss']
})
export class ColumnsComponent implements OnInit {
  @Input() features: Observable<any[]> | undefined;
  currentTab = "elements";
  isMultiple = false;
  columns: any[] = [];
  functions: any[] = [];
  constructor(private backend: BackendService) {
    this.columns = backend.columns;
    this.functions = backend.functions;
   }

  ngOnInit(): void {
  }

  drop(event: any){
    event.preventDefault();
  }

  dragover(event: any){
    event.preventDefault();
  }

  changeMultiple(){
    this.isMultiple =  this.backend.changeIsMultiple();
  }

  changeTab(tab: string){
    this.currentTab = tab;
  }

  toJsonString(obj: Object){
    return JSON.stringify(obj);
  }

}
