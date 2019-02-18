import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [
    {tipo: 'RECEITA', descricao: 'Salário mensal', dataVencimento: '10/06/2018', dataPagamento: '',
    valor: 6500.00, pessoa: 'Daenerys Targaryen'},
    {tipo: 'RECEITA', descricao: 'Indenização', dataVencimento: '13/07/2018', dataPagamento: '12/07/2018',
    valor: 3125.52, pessoa: 'Daenerys Targaryen'},
    {tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: '18/07/2018', dataPagamento: '18/07/2018',
    valor: 1500.00, pessoa: 'Jon Snow'},
    {tipo: 'DESPESA', descricao: 'Medicamentos', dataVencimento: '01/08/2018', dataPagamento: '01/08/2018',
    valor: 522.17, pessoa: 'Cersei Baratheon'},
    {tipo: 'DESPESA', descricao: 'Compras', dataVencimento: '11/09/2018', dataPagamento: '11/09/2018',
    valor: 689.72, pessoa: 'Sansa Stark'},
    {tipo: 'DESPESA', descricao: 'Lanche', dataVencimento: '16/09/2018', dataPagamento: '16/09/2018',
    valor: 17.52, pessoa: 'Oberyn Martell'},
    {tipo: 'DESPESA', descricao: 'Viagem', dataVencimento: '21/10/2018', dataPagamento: '21/10/2018',
    valor: 2500.00, pessoa: 'Jaime Lannister'},
    {tipo: 'DESPESA', descricao: 'Uber', dataVencimento: '24/11/2018', dataPagamento: '',
    valor: 17.78, pessoa: 'Jon Snow'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
