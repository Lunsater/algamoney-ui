import { Component, OnInit } from '@angular/core';
import { PessoaService } from '../pessoa.service';
import { MessageService } from 'primeng/components/common/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { FormControl } from '@angular/forms';
import { Pessoa } from 'src/app/core/model';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {

  pessoa = new Pessoa();

  constructor(private pessoaService: PessoaService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute,
              private router: Router,
              private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Nova pessoa');
    const codigoPessoa = this.route.snapshot.params.codigo;

    if (codigoPessoa) {
      this.carregarPessoa(codigoPessoa);
    }
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }

  carregarPessoa(codigo: number) {
    this.pessoaService.buscarPorCodigo(codigo)
      .subscribe((data: any[]) => {
         this.pessoa = data as unknown as Pessoa;

         this.atualizarTituloEdicao();
      },
      (erro) => {this.errorHandler.handle(erro); });
  }

  nova(form: FormControl) {
    form.reset();

    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);

    this.router.navigate(['/pessoas/nova']);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  get editando() {
    return Boolean(this.pessoa.codigo);
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .subscribe((dados: any[]) => {
        this.atualizarTituloEdicao();

        this.messageService.add({severity: 'success', summary: 'Salvar',
          detail: 'Pessoa alterada com sucesso'});
      },
      (erro) => {this.errorHandler.handle(erro); });
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Salvar',
          detail: 'Pessoa adicionada com sucesso'});

        form.reset();
        this.pessoa = new Pessoa();
      },
      (erro) => {this.errorHandler.handle(erro); });
  }


}
