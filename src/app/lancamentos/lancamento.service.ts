import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LancamentoService {

  lancamentosUrl = 'http://localhost:8080/lancamentos';

  constructor(private http: HttpClient) { }

  pesquisar(): Observable<any> {
    /*
    const headers = new HttpHeaders();
    headers.append('Authorization', 'Basic ' + btoa('admin@algamoney.com:admin'));
    */
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    return this.http.get(`${this.lancamentosUrl}?resumo`, { headers });
  }

}
