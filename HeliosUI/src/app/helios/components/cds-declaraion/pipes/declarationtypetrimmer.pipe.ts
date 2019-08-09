import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'declarationtypetrimmer'
})
export class DeclarationtypetrimmerPipe implements PipeTransform {

  transform(value: string, args?: any): any {
    return value.substring(0, 3);
  }

}
