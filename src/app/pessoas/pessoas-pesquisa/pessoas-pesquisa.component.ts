import { Component, OnInit } from '@angular/core';
import { PessoaFiltro, PessoaService } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/api';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  totalRegistros = 0;
  filtro = new PessoaFiltro();
  pessoas = [];

  constructor(private pessoaService: PessoaService) { }

  ngOnInit() {
  }

  pesquisar(pagina = 0) {
    this.filtro.pagina = pagina;

    this.pessoaService.pesquisar(this.filtro)
      .subscribe((data: any[]) => {
        this.pessoas = data['content'];
        this.totalRegistros = data['totalElements'];
      });
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

}
