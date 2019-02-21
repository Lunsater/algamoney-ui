import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {

  lancamentos = [
    {tipo: 'RECEITA', descricao: 'Salário mensal', dataVencimento: new Date(2018, 6, 10),
      dataPagamento: null, valor: 6500.00, pessoa: 'Daenerys Targaryen'},
    {tipo: 'RECEITA', descricao: 'Indenização', dataVencimento: new Date(2018, 7, 13),
      dataPagamento: new Date(2018, 7, 12), valor: 3125.52, pessoa: 'Daenerys Targaryen'},
    {tipo: 'DESPESA', descricao: 'Aluguel', dataVencimento: new Date(2018, 7, 18),
      dataPagamento: new Date(2018, 7, 18), valor: 1500.00, pessoa: 'Jon Snow'},
    {tipo: 'DESPESA', descricao: 'Medicamentos', dataVencimento: new Date(2018, 8, 1),
      dataPagamento: new Date(2018, 8, 1), valor: 522.17, pessoa: 'Cersei Baratheon'},
    {tipo: 'DESPESA', descricao: 'Compras', dataVencimento: new Date(2018, 9, 11),
      dataPagamento: new Date(2018, 9, 11), valor: 689.72, pessoa: 'Sansa Stark'},
    {tipo: 'DESPESA', descricao: 'Lanche', dataVencimento: new Date(2018, 9, 16),
      dataPagamento: new Date(2018, 9, 16), valor: 17.52, pessoa: 'Oberyn Martell'},
    {tipo: 'DESPESA', descricao: 'Viagem', dataVencimento: new Date(2018, 10, 21),
      dataPagamento: new Date(2018, 10, 21), valor: 2500.00, pessoa: 'Jaime Lannister'},
    {tipo: 'DESPESA', descricao: 'Uber', dataVencimento: new Date(2018, 11, 24),
      dataPagamento: null, valor: 17.78, pessoa: 'Jon Snow'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
