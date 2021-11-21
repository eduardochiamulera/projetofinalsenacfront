import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusConta'
})
export class StatusContaPipe implements PipeTransform {

  transform(status: string): string {
    switch(status){
      case 'EmAberto':
        default:
          return 'Em aberto';
        break;
      case 'Pago':
        return 'Pago';
      break;
      case 'BaixadoParcialmente':
        return 'Baixado Parcialmente';
      break;
    }
  }

}
