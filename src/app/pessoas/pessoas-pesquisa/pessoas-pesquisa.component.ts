import { Component, OnInit, ViewChild } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { LazyLoadEvent, MessageService, ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];
  @ViewChild('tabela') grid;

  constructor(private pessoaService: PessoaService,
              private errorHandler: ErrorHandlerService,
              private messageService: MessageService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .subscribe((data: any[]) => {
        this.pessoas = data['content'];
        this.totalRegistros = data['totalElements'];
      },
      (erro) => {this.errorHandler.handle(erro); });
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
    this.pessoaService.excluir(lancamento.codigo)
      .subscribe(() => {
        this.grid.first = 0;
        this.pesquisar(0);

        this.messageService.add({severity: 'success', summary: 'Excluir',
          detail: 'Registro excluído com sucesso'});
      },
      (erro) => { this.errorHandler.handle(erro); });
  }

  alternarStatus(pessoa: any) {
    const novoStatus = !pessoa.ativo;
    this.pessoaService.alternarStatus(pessoa.codigo, novoStatus)
    .subscribe(() => {
      const acao = novoStatus ? 'ativada' : 'desativada';

      pessoa.ativo = novoStatus;
      this.messageService.add({severity: 'success', summary: 'Alterar',
      detail: `Pessoa ${acao} com sucesso`});
    },
    (erro) => { this.errorHandler.handle(erro); });
  }

}
