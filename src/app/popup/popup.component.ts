import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendService } from '../backend.service';
import { AppElement, AppFunction } from '../element';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit {
  show: any;
  formGroup = new FormGroup({});
  currentTab = "functions";
  function: any = null;
  validated = false;
  @ViewChild('ref') ref: ElementRef<HTMLDivElement> | any;
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
      // this.backend.resetDialog();
      this.function = undefined;
      this.currentTab = "functions";
      return;
    }
    // if(this.formGroup.invalid && action == 'add'){
    //   alert("Please fill all fields");
    //   return;
    // }

    // let value: any = this.formGroup.value;
    // value.name = this.backend.dialogObj.name;
    // this.backend.confirmAddFunction(value);
    // this.backend.openDialog = false;
    // this.formGroup = new FormGroup({});
  }

  getProperties(func: object){
    return Object.keys(func).filter(key => key != 'name' && key != 'type');
  }

  onFunctionDrop(event: any){
    // this.backend.addFunction(event[0], JSON.parse(event[1]))
    let func = JSON.parse(event[1]);
    if(func.type != "function"){
      return;
    }
    this.validated = false;
    this.function = func;
  }

  changeTab(tab: string){
    this.currentTab = tab;
  }

  onElementDrop(event: any){
    this.validated = false;
    let eventData = event.dataTransfer.getData('text/plain');
    if(eventData){
      let data = JSON.parse(eventData);
      if(data.type == "element"){
        event.target.innerText = data.id;
      }
    }
  }

  dragover(event: any){
    event.preventDefault();
  }

  validate(){
    if(this.ref.nativeElement.innerText){
      let text = this.ref.nativeElement.innerText
      let args = text.split("(")[1].split(")")[0]
      if(!args){
        this.validated = true;
        return;
      }
      let validation = args.split(",").every((a: string) => (a.startsWith("\"") && a.endsWith("\"")) || this.backend.columns.find((c: AppElement) => c.id == a))
      this.validated = validation;
    }
  }

  clearFunction(){
    this.ref.nativeElement.innerText = "";
    this.function = null;
    this.validated = false;
  }

  apply(){
    let text = this.ref.nativeElement.innerText
    let args = text.split("(")[1].split(")")[0]
    if(args){
      this.function.fields = args.split(",").map((a: string) => ({id: a}))
    }
    this.backend.addFunction(this.backend.funcIndex, this.function);
    this.backend.openDialog = false;
    this.clearFunction();
  }

  checkEdit(){
    if(this.backend.dialogType == "edit"){
      this.function = this.backend.table[this.backend.funcIndex].func;
      this.backend.dialogType = "";
    }
  }


}
