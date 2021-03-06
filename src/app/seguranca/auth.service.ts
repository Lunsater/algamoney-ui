import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
    this.carregarToken();
    this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
  }

  login(usuario: string, senha: string): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true });
  }

  armazenarToken(token: string) {
    this.jwtPayload = this.jwtHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
      if (this.temPermissao(role)) {
        return true;
      }
    }
  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jwtHelper.isTokenExpired(token);
  }

  obterNovoAcessToken(): Observable<any> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');

    return this.http.post(this.oauthTokenUrl, body.toString(),
      { headers, withCredentials: true });
  }

/*
  obterNovoAcessToken(): Promise<void> {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bEBy');
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');

    let body = new URLSearchParams();
    body.set('grant_type', 'refresh_token');

    return this.http.post(this.oauthTokenUrl, body.toString(),
      { headers, withCredentials: true })
    .toPromise()
    .then(response => {
      this.armazenarToken(response['access_token']);

      console.log('Novo access token criado!');

      return Promise.resolve(null);
    })
    .catch(response => {
      console.error('Erro ao renovar token.', response);
      return Promise.resolve(null);
    });
}
*/

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

}
