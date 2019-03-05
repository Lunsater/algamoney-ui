import { Component, OnInit, Input } from '@angular/core';
import { LazyLoadEvent } from 'primeng/components/common/api';
import { LancamentoFiltro, LancamentoService } from '../lancamento.service';
import { LancamentosPesquisaComponent } from '../lancamentos-pesquisa/lancamentos-pesquisa.component';

@Component({
  selector: 'app-lancamentos-grid',
  templateUrl: './lancamentos-grid.component.html',
  styleUrls: ['./lancamentos-grid.component.css']
})
export class LancamentosGridComponent implements OnInit {

  @Input() lancamentos: [];
  @Input() filtro: LancamentoFiltro;
  @Input() totalRegistros: number;
  @Input() lancamentoService: LancamentoService;
  constructor() { }

  ngOnInit() {
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    const lancamentosPesquisaComponent = new LancamentosPesquisaComponent(this.lancamentoService);
    lancamentosPesquisaComponent.pesquisar(pagina);
  }

}
