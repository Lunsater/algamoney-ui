import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ErrorHandlerService } from './error-handler.service';
import { ToastModule } from 'primeng/components/toast/toast';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { LancamentoService } from '../lancamentos/lancamento.service';
import { PessoaService } from '../pessoas/pessoa.service';
import { MessageService, ConfirmationService } from 'primeng/components/common/api';

@NgModule({
  declarations: [
    NavbarComponent
  ],
  imports: [
    CommonModule,
    ToastModule,
    ConfirmDialogModule
  ],
  exports: [
    NavbarComponent,
    ToastModule,
    ConfirmDialogModule
  ],
  providers: [
    LancamentoService,
    PessoaService,
    MessageService,
    ConfirmationService,
    { provide: LOCALE_ID, useValue: 'pt-BR'},
    ErrorHandlerService
  ]
})
export class CoreModule { }
