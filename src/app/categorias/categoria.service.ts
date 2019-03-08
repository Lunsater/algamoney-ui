import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl = 'http://localhost:8080/categorias';

  constructor(private http: HttpClient) { }

  listarTodas(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    return this.http.get(`${this.categoriaUrl}`, { headers});
  }
}
