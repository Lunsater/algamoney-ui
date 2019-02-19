import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {

  pessoas = [
    {nome: 'Daenerys Targaryen', cidade: 'Essos', estado: 'GT', ativo: true},
    {nome: 'Jon Snow', cidade: 'Winterfell', estado: 'GT', ativo: true},
    {nome: 'Sansa Stark', cidade: 'Winterfell', estado: 'GT', ativo: true},
    {nome: 'Oberyn Martell', cidade: 'Dorne', estado: 'GT', ativo: false},
    {nome: 'Jaime Lannister', cidade: 'Kings Landing', estado: 'GT', ativo: true},
    {nome: 'Khal Drogo', cidade: 'Dothraki', estado: 'GT', ativo: false},
    {nome: 'Cersei Baratheon', cidade: 'Kings Landing', estado: 'GT', ativo: false}
  ];

  constructor() { }

  ngOnInit() {
  }

}
