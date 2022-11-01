import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'functiontotext'
})
export class FunctiontotextPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    let text = "";
    // for(let v of value){
    //   text += v.name.split(" ").map((e:string) => e.toUpperCase()).join("_");
    //   text += `(${v.fields?.map((f: any) => f.id) ?? ""})`;
    // }

    text = value.map((v: any) => `${v.name.split(" ").map((e:string) => e.toUpperCase()).join("_")}(${v.fields?.map((f: any) => f.id) ?? ""})`).join(" AND ")
    return text;
  }

}
