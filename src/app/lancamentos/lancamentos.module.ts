import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { LancamentoCadastroComponent } from './lancamento-cadastro/lancamento-cadastro.component';
import { LancamentosPesquisaComponent } from './lancamentos-pesquisa/lancamentos-pesquisa.component';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { CurrencyMaskModule } from 'ng2-currency-mask';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { TableModule } from 'primeng/components/table/table';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { SharedModule } from '../shared/shared.module';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { LancamentosRoutingModule } from './lancamentos-routing.module';


@NgModule({
  declarations: [
    LancamentoCadastroComponent,
    LancamentosPesquisaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SelectButtonModule,
    CalendarModule,
    InputTextModule,
    CurrencyMaskModule,
    DropdownModule,
    TableModule,
    TooltipModule,
    InputTextareaModule,
    SharedModule,
    LancamentosRoutingModule
  ],
  exports: []
})
export class LancamentosModule { }
