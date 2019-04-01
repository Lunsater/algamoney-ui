import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PessoaCadastroComponent } from './pessoa-cadastro/pessoa-cadastro.component';
import { PessoasPesquisaComponent } from './pessoas-pesquisa/pessoas-pesquisa.component';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TableModule } from 'primeng/components/table/table';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { ButtonModule } from 'primeng/components/button/button';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { SharedModule } from '../shared/shared.module';
import { PessoasRoutingModule } from './pessoas-routing.module';

@NgModule({
  declarations: [
    PessoaCadastroComponent,
    PessoasPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    InputTextModule,
    TableModule,
    ButtonModule,
    InputMaskModule,
    TooltipModule,
    SharedModule,
    PessoasRoutingModule
  ],
  exports: []
})
export class PessoasModule { }
