import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeURL = 'http://localhost:8080/tokens/revoke';

  constructor(
    private http: HttpClient,
    private auth: AuthService ) { }

    logout() {
      return this.http.delete(this.tokensRevokeURL, { withCredentials: true })
        .toPromise()
        .then(() => {
          this.auth.limparAccessToken();
        });
    }
}
