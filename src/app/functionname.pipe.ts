import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'functionname'
})
export class FunctionnamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.split(" ").map(e => e.toUpperCase()).join("_");
  }

}
