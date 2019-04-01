import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  categoriaUrl: string;;

  constructor(private http: HttpClient) {
    this.categoriaUrl = `${environment.apiUrl}/categorias`;
  }

  listarTodas(): Observable<any> {
    const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa('admin@algamoney.com:admin') });

    return this.http.get(`${this.categoriaUrl}`, { headers});
  }
}
