import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, property: any, input: any): any {
    if (input) {
      const regex = new RegExp(input, 'i');
      return value.filter((val: any) => regex.test(val[property]));
    } else {
      return value;
    }

  }

}
