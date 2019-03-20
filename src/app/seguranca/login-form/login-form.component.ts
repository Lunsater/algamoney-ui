import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  constructor(private auth: AuthService,
              private errorHandler: ErrorHandlerService,
              private router: Router) { }

  ngOnInit() {
  }

  login(usuario: string, senha: string) {
    this.auth.login(usuario, senha)
      .subscribe((response: any[]) => {
        console.log(response);
        this.auth.armazenarToken(response['access_token']);
        this.router.navigate(['/lancamentos']);
      },
    (erro) => {
      if (erro instanceof HttpErrorResponse && erro.status === 400) {
        if (erro.error.error === 'invalid_grant') {
          this.errorHandler.handle('Usuário ou senha inválidos!');
        } else {
          this.errorHandler.handle(erro);
        }
      } else {
        this.errorHandler.handle(erro);
      }
    });
  }

}
