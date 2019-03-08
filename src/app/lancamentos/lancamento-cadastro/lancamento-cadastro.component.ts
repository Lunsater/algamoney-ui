import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {

  tipos = [
    { label: 'Receita', value: 'RECEITA' },
    { label: 'Despesa', value: 'DESPESA' }
  ];

  categorias = [];

  pessoas = [];

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private errorHandler: ErrorHandlerService) { }

  ngOnInit() {
    this.carregarCategorias();
    this.carregarPessoas();
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
    .subscribe((categoria: any[]) => {
      console.log(typeof categoria, categoria);
      this.categorias = categoria.map(c => ({ label: c.nome, value: c.codigo}));
    },
    (erro) => {this.errorHandler.handle(erro); });
  }

  carregarPessoas() {
    return this.pessoaService.listarTodos()
    .subscribe((pessoa: any[]) => {
      console.log(typeof pessoa, pessoa);
      this.pessoas = pessoa.content.map(p => ({ label: p.nome, value: p.codigo}));
    },
    (erro) => {this.errorHandler.handle(erro); });
  }

}
