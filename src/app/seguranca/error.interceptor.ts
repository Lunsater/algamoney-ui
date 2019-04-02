import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
      private authService: AuthService,
      private router: Router ) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
              console.log(`Token velho: ${localStorage.getItem('token')}`);
              if (this.authService.isAccessTokenInvalido()) {
                this.authService.obterNovoAcessToken();

                console.log(`Token novo: ${localStorage.getItem('token')}`);
                  // Se o novo access_token gerado for inválido,
                  // significa que o refresh_token expirou,
                  // nesse caso ocorre o redirecionamento para página de login
                  /*
                  const token2 = localStorage.getItem('token');
                  if (this.authService.isAccessTokenInvalido) {
                    this.router.navigate(['/login']);
                  }
                  */
                  /*
                  const token = localStorage.getItem('token');

                  request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${token}`
                    }
                  });
                  return next.handle(request);
                  */
                }
            } else {
              const error = err.error.message || err.statusText;
              return throwError(error);
            }
        }));
    }
}
