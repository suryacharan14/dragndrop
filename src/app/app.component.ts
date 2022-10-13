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
    if(this.selectedFeatures.includes(feature) || !this.unselectedFeatures.includes(feature)) return;
    this.selectedFeatures.push(feature);
    this.unselectedFeatures = this.unselectedFeatures.filter(e => e !== feature);
    this.sort();
  }

  removeFeature(feature: string){
    if(this.unselectedFeatures.includes(feature) || !this.selectedFeatures.includes(feature)) return;
    this.unselectedFeatures.push(feature);
    this.selectedFeatures = this.selectedFeatures.filter(e => e !== feature);
    this.sort();
  }
}
