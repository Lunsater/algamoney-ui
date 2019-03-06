import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';

export class LancamentoFiltro {
  descricao: string;
  dataVencimentoInicio: Date;
  dataVencimentoFim: Date;
  pagina = 0;
  itensPorPagina = 3;
}

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params = params.set('descricao', filtro.descricao);
    }

    const datePipe = new DatePipe('pt-BR');
    if (filtro.dataVencimentoInicio) {
      params = params.set('dataVencimentoDe', datePipe.transform(filtro.dataVencimentoInicio, 'yyyy-MM-dd'));
    }

    if (filtro.dataVencimentoFim) {
      params = params.set('dataVencimentoAte', datePipe.transform(filtro.dataVencimentoFim, 'yyyy-MM-dd'));
    }

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params });
  }

  excluir(codigo: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers });
  }

}
