import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ColumnsComponent } from './columns/columns.component';
import { TargetComponent } from './target/target.component';
import { FeatureComponent } from './feature/feature.component';
import { DropTargetComponent } from './drop-target/drop-target.component';
import { PopupComponent } from './popup/popup.component';
import { CloudFieldComponent } from './cloud-field/cloud-field.component';

@NgModule({
  declarations: [
    AppComponent,
    ColumnsComponent,
    TargetComponent,
    FeatureComponent,
    DropTargetComponent,
    PopupComponent,
    CloudFieldComponent,
  ],
  imports: [BrowserModule, ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
