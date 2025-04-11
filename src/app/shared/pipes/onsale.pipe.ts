import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'onsale',
  standalone: true
})
export class OnsalePipe implements PipeTransform {

  transform(title: String): string {
    return `on sale :  ${title}` ;
  }

}
