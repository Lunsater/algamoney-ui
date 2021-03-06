import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pessoa } from '../core/model';
import { environment } from 'src/environments/environment';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl: string;

  constructor(private http: HttpClient) {
    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
  }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();
    //const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    // return this.http.get(`${this.pessoasUrl}`, { headers, params });
    return this.http.get(`${this.pessoasUrl}`, { params });
  }

  listarTodos(): Observable<any> {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    // return this.http.get(`${this.pessoasUrl}`, { headers});
    return this.http.get(`${this.pessoasUrl}`);
  }

  excluir(codigo: number): Observable<any> {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    // return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers });
    return this.http.delete(`${this.pessoasUrl}/${codigo}`);
  }

  alternarStatus(codigo: number, ativo: boolean): Observable<any> {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com:admin'));
    headers = headers.append('Content-Type', 'application/json' );

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers });
  }

  adicionar(pessoa: Pessoa): Observable<any> {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com:admin'));
    headers = headers.append('Content-Type', 'application/json' );

    return this.http.post(`${this.pessoasUrl}`, JSON.stringify(pessoa), { headers });
  }

  atualizar(pessoa: Pessoa): Observable<any> {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com:admin'));
    headers = headers.append('Content-Type', 'application/json');

    return this.http.put(`${this.pessoasUrl}/${pessoa.codigo}`, JSON.stringify(pessoa), { headers });
  }

  buscarPorCodigo(codigo: number): Observable<any> {
    // const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    // return this.http.get(`${this.pessoasUrl}/${codigo}`, { headers });
    return this.http.get(`${this.pessoasUrl}/${codigo}`);
  }

}
