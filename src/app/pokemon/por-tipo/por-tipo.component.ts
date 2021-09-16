import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../services/pokemon.service';
import { PokemonResp } from '../interfaces/pokemon.interface';

@Component({
  selector: 'app-por-tipo',
  templateUrl: './por-tipo.component.html',
  styleUrls: ['./por-tipo.component.css']
})
export class PorTipoComponent implements OnInit {

  tipos: PokemonResp[] = [];
  
  constructor(
    private pService: PokemonService
  ) { }

  ngOnInit(): void {
    this.pService.getPokemonTypes().subscribe( resp => {this.tipos = resp, this.tipos.pop()} );
  }

  imagen( name: String) {
    return `../../../assets/icons_types/${name}.png`;
  }
}
