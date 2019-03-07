import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export class PessoaFiltro {
  nome: string;
  pagina = 0;
  itensPorPagina = 5;
}

@Injectable({
  providedIn: 'root'
})
export class PessoaService {

  pessoasUrl = 'http://localhost:8080/pessoas';

  constructor(private http: HttpClient) { }

  pesquisar(filtro: PessoaFiltro): Observable<any> {
    let params = new HttpParams();
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    params = params.set('page', filtro.pagina.toString());
    params = params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params = params.set('nome', filtro.nome);
    }

    return this.http.get(`${this.pessoasUrl}`, { headers, params });
  }

  listarTodos(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    return this.http.get(`${this.pessoasUrl}`, { headers});
  }

  excluir(codigo: number): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    return this.http.delete(`${this.pessoasUrl}/${codigo}`, { headers });
  }

  alternarStatus(codigo: number, ativo: boolean): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com:admin'));
    headers = headers.append('Content-Type', 'application/json' );

    return this.http.put(`${this.pessoasUrl}/${codigo}/ativo`, ativo, { headers });
  }

}
