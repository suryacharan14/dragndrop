import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BackendService } from './backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dragndrop';
  // private unselectedFeatures: object[] = [
  //   // 'Database',
  //   // 'Notifications',
  //   // 'Messaging',
  //   // 'Files Upload',
  // ];
  // private selectedFeatures : object[] = [];
  isMultiple = false;
  showPopup = false;

  constructor(private backend: BackendService){}

  ngOnInit() {
    // this.sort();
    // this.backend.openDialog = this.openPopup;
    // this.backend.closeDialog = this.closePopup;
  }

  // sort(){
  //   this.unselectedFeatures = this.unselectedFeatures.sort();
  // }

  // get features(): Observable<object[]> {
  //   return of(this.unselectedFeatures);
  // }
  
  // get selected(): Observable<object[]>{
  //   return of(this.selectedFeatures);
  // }

  // addFeature(feature: string){
  //   let obj = JSON.parse(feature);
  //   if(this.selectedFeatures.includes(obj) && !this.isMultiple) return;
  //   this.selectedFeatures.push(obj);
  //   this.sort();
  // }

  // removeFeature(index: number){
  //   this.selectedFeatures.splice(index, 1);
  //   this.sort();
  // }

  changeIsMultiple(value: boolean){
    this.isMultiple = value;
  }

  openPopup(){
    this.showPopup = true;
  }

  closePopup(){
    this.showPopup = false;
  }
}
