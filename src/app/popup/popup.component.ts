import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  show: any;
  formGroup = new FormGroup({});
  constructor(public backend: BackendService) {
   }

  ngOnInit(): void {
    this.show = this.backend.openDialog;
  }

  closePopup(event: any){
    if(event.target.classList.contains('popup')){
      this.onClose("cancel");
    }
  }

  onClose(action: string){
    if(action == 'cancel'){
      this.backend.openDialog = false;
      this.backend.resetDialog();
      return;
    }
    if(this.formGroup.invalid && action == 'add'){
      alert("Please fill all fields");
      return;
    }

    let value: any = this.formGroup.value;
    value.name = this.backend.dialogObj.name;
    this.backend.confirmAddFunction(value);
    this.backend.openDialog = false;
    this.formGroup = new FormGroup({});
    console.log(this.backend.table);
  }

  getProperties(func: object){
    return Object.keys(func).filter(key => key != 'name' && key != 'type');
  }


}
