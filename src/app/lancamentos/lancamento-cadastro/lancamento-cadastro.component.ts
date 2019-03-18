import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/categorias/categoria.service';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PessoaService } from 'src/app/pessoas/pessoa.service';
import { Lancamento } from 'src/app/core/model';
import { FormControl } from '@angular/forms';
import { LancamentoService } from '../lancamento.service';
import { MessageService } from 'primeng/components/common/api';
import { ActivatedRoute } from '@angular/router';

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
  lancamento = new Lancamento();

  constructor(private categoriaService: CategoriaService,
              private pessoaService: PessoaService,
              private lancamentoService: LancamentoService,
              private messageService: MessageService,
              private errorHandler: ErrorHandlerService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const codigoLancamento = this.route.snapshot.params['codigo'];

    if (codigoLancamento) {
      this.carregarLancamento(codigoLancamento);
    }
    this.carregarCategorias();
    this.carregarPessoas();
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarLancamento(form);
    } else {
      this.adicionarLancamento(form);
    }
  }

  get editando() {
    return Boolean(this.lancamento.codigo);
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
      .subscribe((dados: any[]) => {
        console.log(dados);
        // this.lancamento = dados as unknown as Lancamento;

        this.messageService.add({severity: 'success', summary: 'Salvar',
          detail: 'Lançamento alterado com sucesso'});
      },
      (erro) => {this.errorHandler.handle(erro); });
  }

  carregarLancamento(codigo: number) {
    this.lancamentoService.buscarPorCodigo(codigo)
      .subscribe((data: any[]) => {
        let lanc: Lancamento = data as unknown as Lancamento;

        this.lancamentoService.converterStringsParaDatas([lanc]);
        this.lancamento = lanc;
      },
      (erro) => {this.errorHandler.handle(erro); });
  }

  adicionarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
      .subscribe(() => {
        this.messageService.add({severity: 'success', summary: 'Salvar',
          detail: 'Lançamento adicionado com sucesso'});

        form.reset();
        this.lancamento = new Lancamento();
      },
      (erro) => {this.errorHandler.handle(erro); });
  }

  carregarCategorias() {
    return this.categoriaService.listarTodas()
      .subscribe((categoria: any[]) => {
        // console.log(typeof categoria, categoria);
        this.categorias = categoria.map(c => ({ label: c.nome, value: c.codigo}));
      },
      (erro) => {this.errorHandler.handle(erro); });
  }

  carregarPessoas() {
    return this.pessoaService.listarTodos()
      .subscribe((pessoa: any[]) => {
        // console.log(typeof pessoa, pessoa);
        this.pessoas = pessoa['content'].map(p => ({ label: p.nome, value: p.codigo}));
      },
      (erro) => {this.errorHandler.handle(erro); });
  }

}
