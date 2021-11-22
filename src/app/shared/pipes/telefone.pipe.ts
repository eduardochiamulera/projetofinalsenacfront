import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'telefonePipe'
})
export class TelefonePipe implements PipeTransform {

  transform(value: string): string {
     //Filter only numbers from the input
     let cleaned = ('' + value).replace(/\D/g, '');
      
     //Check if the input is of correct length
     let match = cleaned.match(/^(\d{2})(\d{2})(\d{4})(\d{4})$/);
   
     if (match) {
       return '+' + match[1] + ' (' + match[2] + ') ' + match[3] + '-' + match[4]
     };

     return ''
  }

}
