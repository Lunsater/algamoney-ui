import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';
import { LancamentoService, LancamentoFiltro } from '../lancamento.service';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new LancamentoFiltro();
  lancamentos = [];
  @ViewChild('tabela') grid;

  constructor(private lancamentoService: LancamentoService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtro)
      .subscribe((data: any[]) => {
        this.lancamentos = data['content'];
        this.totalRegistros = data['totalElements'];
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'Tem certeza que deseja excluir?',
      accept: () => {
          this.excluir(lancamento);
      }
  });
  }

  excluir(lancamento: any) {
    this.lancamentoService.excluir(lancamento.codigo)
      .subscribe(() => {
        this.grid.first = 0;
        this.pesquisar(0);
      });

    this.messageService.add({severity: 'success', summary: 'Excluir',
        detail: 'Registro excluído com sucesso'});
  }

  ngOnInit() { }

}
