import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'dragndrop';
  private unselectedFeatures = [
    'Database',
    'Notifications',
    'Messaging',
    'Files Upload',
  ];
  private selectedFeatures : string[] = [];
  isMultiple = false;

  ngOnInit() {
    this.sort();
  }

  sort(){
    this.unselectedFeatures = this.unselectedFeatures.sort();
  }

  get features(): Observable<string[]> {
    return of(this.unselectedFeatures);
  }
  
  get selected(): Observable<string[]>{
    return of(this.selectedFeatures);
  }

  addFeature(feature: string){
    if(this.selectedFeatures.includes(feature) && !this.isMultiple) return;
    this.selectedFeatures.push(feature);
    this.sort();
  }

  removeFeature(index: number){
    this.selectedFeatures.splice(index, 1);
    this.sort();
  }

  changeIsMultiple(value: boolean){
    this.isMultiple = value;
  }
}
