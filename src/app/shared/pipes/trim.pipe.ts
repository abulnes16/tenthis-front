import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(value: string): unknown {
    if (!value) {
      return '';
    }
    return value.replace(/\s*/g, '');
  }

}
