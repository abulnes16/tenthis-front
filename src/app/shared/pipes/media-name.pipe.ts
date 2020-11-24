import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mediaName'
})
export class MediaNamePipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    const values = value.split(/-|\./g);
    return `${values[0]}.${values.pop()}`;
  }

}
