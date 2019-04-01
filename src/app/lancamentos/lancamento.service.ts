import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Lancamento } from '../core/model';
import { environment } from 'src/environments/environment';

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

  lancamentosUrl: string;

  constructor(private http: HttpClient) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
  }

  pesquisar(filtro: LancamentoFiltro): Observable<any> {
    let params = new HttpParams();
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

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

    // return this.http.get(`${this.lancamentosUrl}?resumo`, { headers, params });
    return this.http.get(`${this.lancamentosUrl}?resumo`, { params });
  }

  excluir(codigo: number): Observable<any> {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    // return this.http.delete(`${this.lancamentosUrl}/${codigo}`, { headers });
    return this.http.delete(`${this.lancamentosUrl}/${codigo}`);
  }

  adicionar(lancamento: Lancamento): Observable<any> {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com:admin'));
    headers = headers.append('Content-Type', 'application/json' );

    return this.http.post(`${this.lancamentosUrl}`, JSON.stringify(lancamento), { headers });
  }

  atualizar(lanc: Lancamento): Observable<any> {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com:admin'));
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.lancamentosUrl}/${lanc.codigo}`, JSON.stringify(lanc), { headers });
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    // return this.http.get(`${this.lancamentosUrl}/${codigo}`, { headers });
    return this.http.get(`${this.lancamentosUrl}/${codigo}`);
  }

  converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lanc of lancamentos) {
      lanc.dataVencimento = new Date(lanc.dataVencimento);

      if (lanc.dataPagamento) {
        lanc.dataPagamento = new Date(lanc.dataPagamento);
      }
    }


  }
}
