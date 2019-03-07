import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/components/common/api';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {

  constructor(private messageService: MessageService) { }

  handle(errorResponse: any) {
    let msg: string;

    if (typeof errorResponse === 'string') {
      msg = errorResponse;
    } else {
      if (errorResponse.status >= 400 && errorResponse.status < 500) {
        msg = errorResponse.error[0].mensagemUsuario;
      } else {
        msg = 'Erro ao processar serviço remoto. Tente novamente.';
      }
      console.log('Ocorreu um erro', errorResponse);
    }

    this.messageService.add({severity: 'error', summary: 'Erro',
        detail: msg});
  }
}
