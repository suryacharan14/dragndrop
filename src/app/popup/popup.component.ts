import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { BackendService } from '../backend.service';
import { AppElement, AppFunction } from '../interfaces';

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
  @ViewChild('body') body: ElementRef<HTMLDivElement> | any;
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
    this.validated = false;
    if(event.target.classList.contains("arg") || event.target != this.body.nativeElement) return;
    let func = JSON.parse(event.dataTransfer.getData("text/plain"));
    if(func.type != "function"){
      return;
    }
    if(this.function == null){
      this.function = [func];
    }else{
      this.function.push(func);
    }
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
        let functionIndex = event.target.dataset["functionIndex"]
        let argIndex = event.target.dataset["argIndex"]
        this.function[functionIndex].fields[argIndex] = {id: data.id};
      }
      if(data.type == "function"){
        let functionIndex = event.target.dataset["functionIndex"]
        let argIndex = event.target.dataset["argIndex"]
        if(functionIndex && argIndex){
          this.function[functionIndex].fields[argIndex] = JSON.parse(eventData);
        }
      }
    }
  }

  dragover(event: any){
    event.preventDefault();
  }

  validate(){
    if(this.ref.nativeElement.innerText){
      let validation = true;
      let text = this.ref.nativeElement.innerText
      text.split(" AND ").map((txt: string) => {
        validation = validation && this.checkArg(txt);
        // let args = txt.split("(")[1].split(")")[0]
        // if(!args){
        //   this.validated = true;
        //   return;
        // }
        // validation = validation && args.split(",").every((a: string) => (a.startsWith("\"") && a.endsWith("\"")) || this.backend.columns.find((c: AppElement) => c.id == a))
      })
      this.validated = validation;
    }
  }

  checkArg(txt: string): boolean{
    if(this.isFunction(txt)){
      if(this.isCorrectFunctionName(txt.split("(")[0])){
        let tst = txt.substring(txt.indexOf("(")+1, txt.length-1);
        if(!tst){
          return true;
        }
        return tst.split(",").every(t => this.checkArg(t))
      }
      return false;
    }
    return this.isColumn(txt);
  }

  isCorrectFunctionName(el: string){
    return /^[A-Z_]*$/.test(el);
  }

  isFunction(el: string){
    return el.includes("(") && el.endsWith(")");
  }

  isColumn(el: string){
    return !this.isFunction(el) && this.backend.columns.find((c: AppElement) => c.id == el) != null;
  }

  clearFunction(){
    this.ref.nativeElement.innerText = "";
    this.function = null;
    this.validated = false;
  }

  apply(){
    let text = this.ref.nativeElement.innerText
    // let i = 0;
    // for(let txt of text.split(" AND ")){
    //   let args = txt.split("(")[1].split(")")[0]
    //   if(args){
    //     this.function[i].fields = args.split(",").map((a: string) => ({id: a}))
    //   }
    //   i++;
    // };
    this.backend.addFunction(this.backend.funcIndex, this.function, text);
    this.backend.openDialog = false;
    this.clearFunction();
  }


  checkEdit(){
    if(this.backend.dialogType == "edit"){
      this.function = this.backend.table[this.backend.funcIndex].func;
      console.log(this.function);
      this.backend.dialogType = "";
    }
  }

  createArray(num: number){
    return Array(num).fill(0);
  }
}
