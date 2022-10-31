import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'functiontotext'
})
export class FunctiontotextPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]): string {
    return `${value.name.split(" ").map((e:string) => e.toUpperCase()).join("_")}(${value?.fields?.map((f: any) => f.id) ?? ""})`;
  }

}
