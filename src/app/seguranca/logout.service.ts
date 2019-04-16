import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  tokensRevokeURL: string;

  constructor(
    private http: HttpClient,
    private auth: AuthService ) {
      this.tokensRevokeURL = `${environment.apiUrl}/tokens/revoke`;
    }

    logout() {
      return this.http.delete(this.tokensRevokeURL, { withCredentials: true })
        .toPromise()
        .then(() => {
          this.auth.limparAccessToken();
        });
    }
}
